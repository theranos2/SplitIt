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
        public AccountController(DatabaseContext _db)
        {
            db = _db;
        }

        private string MakeToken(Guid userId, DateTime expiry, string secret = "", bool mfa = true)
        {
            return CookiesDb.IssueCookie(new MyCookie
            {
                IssueDate = DateTime.Now,
                ExpiryDate = expiry,
                LastSeen = DateTime.Now,
                MfaCode = secret,
                hasPassedMfa = mfa,
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

            string domainName = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}";
            string mailBody = @$"Hi {newUser.FirstName} Split It! Account has been Created.
            <a href='{domainName}/confirm/{tokenDto.Token}KEK{secret}'>Click Here</a> to confim your account.";
            MailService.SendMail(newUser.Email, mailBody, "Split It New Account");

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
            if (mfaString == cookie.MfaCode)
                cookie.hasPassedMfa = true;
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

            if (cookie.MfaCode != splitted[1])
                throw new HttpBadRequest("Invalid secret");

            cookie.hasPassedMfa = true;

            var user = db.Users.Where(x => x.Id == cookie.UserId).FirstOrDefault();
            user.MfaEnabled = true;

            return Redirect("~/"); // redirect to page root
        }

        [HttpPost("logout")]
        public ActionResult Logout()
        {
            CookiesDb.RemoveCookie(HttpContext.User.Identity.Name); // identity.name is actually cookieStr
            return Ok(new { Message = "Success!" });
        }
    }
}
