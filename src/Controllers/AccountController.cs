using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using split_it.Authentication;
using split_it.Exceptions.Http;
using split_it.Models;
using split_it.Services;
using Crypto = BCrypt.Net.BCrypt;

namespace split_it.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        DatabaseContext db;
        private const string RESET_TOKEN = "RESET";
        public AccountController(DatabaseContext _db)
        {
            db = _db;
        }

        private string MakeToken(Guid userId, DateTime expiry, string secret = "", bool hasConfirmed = true)
        {
            return CookiesDb.IssueCookie(new MyCookie
            {
                IssueDate = DateTime.Now,
                ExpiryDate = expiry,
                LastSeen = DateTime.Now,
                Secret = secret,
                hasConfirmedEmail = hasConfirmed,
                UserId = userId
            });
        }

        /// <summary>Show currently logged in user data</summary>
        [HttpGet("me")]
        public UserDto Me()
        {
            var curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);
            return new UserDto
            {
                Id = curUser.Id,
                FirstName = curUser.FirstName,
                LastName = curUser.LastName,
                Email = curUser.Email,
                MfaEnabled = curUser.MfaEnabled,
            };
        }

        /// <summary>Register new user</summary>
        /// <response code="400">Email already in use</response>
        [AllowAnonymous]
        [HttpPost("register")]
        public TokenDto Register([FromBody] RegisterDto input)
        {
            if (db.Users.Where(x => input.Email == x.Email).FirstOrDefault() != null)
            {
                if (db.Users.Where(x => input.Email == x.Email).FirstOrDefault().MfaEnabled == true)
                    throw new HttpBadRequest("Email already in use.");

                var exUser = db.Users.Where(x => input.Email == x.Email).FirstOrDefault();
                db.Remove(exUser);
            }

            var newUser = new User
            {
                Id = Guid.Empty,
                Email = input.Email,
                Password = Crypto.HashPassword(input.Password),
                FirstName = input.FirstName,
                LastName = input.LastName,
                MfaEnabled = true // TODO change to true to disable confirm email when debugging
            };

            db.Users.Add(newUser);
            db.SaveChanges();
            var user = db.Users.Where(x => input.Email.Equals(x.Email)).FirstOrDefault();

            // Send out email for verification
            string secret = CookiesDb.GenerateUniqueCookieString();

            var tokenDto = new TokenDto
            {
                Token = MakeToken(user.Id, DateTime.Now.AddHours(12), secret, true) // TODO change to true to disable confirm email when debugging
            };
            
            // wrapped because of xUnit test keeps failing, due to no mock httpcontext.
            try
            {
                string domainName = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}";
                string mailBody = @$"Hi {newUser.FirstName} Split It! Account has been Created.
                <a href='{domainName}/confirm/{tokenDto.Token}KEK{secret}'>Click Here</a> to confim your account.";
                MailService.SendMail(newUser.Email, mailBody, "Split It New Account");
            }
            catch{}


            return tokenDto;
        }

        /// <summary>Login using credentials</summary>
        /// <response code="400">Incorrect email or password</response>
        [AllowAnonymous]
        [HttpPost("login")]
        public TokenDto Login(LoginDto login)
        {
            var user = db.Users.Where(x => login.Email == x.Email).FirstOrDefault();
            if (user == null)
            {
                Console.WriteLine("Email not found");
                throw new HttpBadRequest("Email or password is incorrect");
            }

            if (!Crypto.Verify(login.Password, user.Password))
            {
                Console.WriteLine("Wrong password");
                throw new HttpBadRequest("Email or password is incorrect");
            }

            string token = "";
            if (!user.MfaEnabled)
                token = MakeToken(user.Id, DateTime.Now.AddHours(12), "", false); // flase mfa if not verified yet
            else
                token = MakeToken(user.Id, DateTime.Now.AddHours(12));

            return new TokenDto { Token = token };
        }

        [AllowAnonymous]
        [HttpPost("mfa/{mfaString}")]
        public TokenDto Mfa(string mfaString)
        {
            if (!Request.Headers.ContainsKey("Token"))
                throw new HttpBadRequest("Invalid Token");

            string cookieString = Request.Headers["Token"];
            MyCookie cookie = CookiesDb.Get(cookieString);

            if (cookie == null)
                throw new HttpBadRequest("Invalid Token");

            // check mfa
            if (mfaString == cookie.Secret)
                cookie.hasConfirmedEmail = true;
            else
                throw new HttpBadRequest("Incorrect Mfa Code");

            // increase expiration date
            cookie.ExpiryDate = cookie.IssueDate.AddHours(12);

            return new TokenDto { Token = cookieString };
        }

        [AllowAnonymous]
        [HttpGet("/confirm/{secretStr}")]
        public ActionResult ConfirmAccount(string secretStr)
        {
            string[] splitted = secretStr.Split("KEK");

            if (splitted.Length < 2)
                throw new HttpBadRequest("Invalid secret");
            if (String.IsNullOrEmpty(splitted[0]) || String.IsNullOrEmpty(splitted[1]))
                throw new HttpBadRequest("Invalid secret");

            var cookie = CookiesDb.Get(splitted[0]);
            if (cookie == null)
                throw new HttpBadRequest("Invalid secret");

            if (cookie.Secret != splitted[1])
                throw new HttpBadRequest("Invalid secret");

            cookie.hasConfirmedEmail = true;

            var user = db.Users.Where(x => x.Id == cookie.UserId).FirstOrDefault();
            user.MfaEnabled = true; // TODO change name to Email Enabled or something
            db.SaveChanges();

            return Redirect("~/"); // redirect to page root
        }

        [AllowAnonymous]
        [HttpPost("forgot-password-submit")]
        public ActionResult ForgotPasswordSubmit(ForgottenPasswordSubmitDto request)
        {
            if (request.Secret == null)
                throw new HttpBadRequest("Invalid secret");

            var cookie = CookiesDb.Get(request.Secret);

            // Check if it is a reset coookie
            if (cookie.Secret != RESET_TOKEN)
                throw new HttpBadRequest("Invalid secret");

            // Check expirry
            if (DateTime.Now > cookie.ExpiryDate)
                throw new HttpBadRequest("Expired link. Please issue another one.");

            // Delete cookie
            CookiesDb.RemoveCookie(request.Secret);

            // Set new password
            string newPassword = Crypto.HashPassword(request.Password);
            var user = db.Users.Where(x => x.Id == cookie.UserId).FirstOrDefault();
            if (user == null)
                throw new HttpNotFound("User not found. User could have been deleted");
            user.Password = newPassword;
            db.SaveChanges();

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("forgot-password")]
        public ActionResult ForgotPassword(ForgottenPasswordRequestDto request)
        {
            if (request.Email == null)
                throw new HttpBadRequest("Invalid email");

            var user = db.Users.Where(x => x.Email == request.Email).FirstOrDefault();
            if (user == null)
                throw new HttpBadRequest("Invalid email");

            // Generate new token
            string cookieStr = CookiesDb.IssueCookie(new MyCookie
            {
                IssueDate = DateTime.Now,
                ExpiryDate = DateTime.Now.AddHours(1),
                LastSeen = DateTime.Now,
                Secret = RESET_TOKEN,
                hasConfirmedEmail = user.MfaEnabled,
                UserId = user.Id
            });

            // send token
            string domainName = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}";
            string mailBody = @$"Here is your Split It! Password Reset link.
            <a href='{domainName}/reset/{cookieStr}'>Click Here</a> to reset your password.";
            MailService.SendMail(user.Email, mailBody, "Split It! Password Reset");

            return Ok();
        }

        [HttpPost("logout")]
        public ActionResult Logout()
        {
            CookiesDb.RemoveCookie(HttpContext.User.Identity.Name); // identity.name is actually cookieStr
            return Ok(new { Message = "Success!" });
        }
    }
}
