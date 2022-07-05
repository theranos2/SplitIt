using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using split_it.Authentication;
using split_it.Exceptions.Http;
using split_it.Models;
using Crypto = BCrypt.Net.BCrypt;

namespace split_it.Controllers
{
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        DatabaseContext db;
        public AccountController(DatabaseContext _db)
        {
            db = _db;
        }

        private string MakeToken(Guid userId, DateTime expiry)
        {
            return CookiesDb.IssueCookie(new MyCookie
            {
                IssueDate = DateTime.Now,
                ExpiryDate = expiry,
                LastSeen = DateTime.Now,
                MfaCode = "1", // TODO: implement this lol
                hasPassedMfa = false,
                UserId = userId
            });
        }

        /// <summary>Register new user</summary>
        /// <response code="400">Email already in use</response>
        [AllowAnonymous]
        [HttpPost("/register")]
        public TokenDto Register([FromBody] RegisterDto input)
        {
            if (db.Users.Where(x => input.Email == x.Email).FirstOrDefault() != null)
            {
                throw new HttpBadRequest("Email already in use");
            }

            var newUser = new User
            {
                Id = Guid.Empty,
                Email = input.Email,
                Password = Crypto.HashPassword(input.Password),
                FirstName = input.FirstName,
                LastName = input.LastName,
            };
            db.Users.Add(newUser);
            db.SaveChanges();
            var user = db.Users.Where(x => input.Email.Equals(x.Email)).FirstOrDefault();
            return new TokenDto { Token = MakeToken(user.Id, DateTime.Now.AddHours(12)) };
        }

        /// <summary>Login using credentials</summary>
        /// <response code="400">Incorrect email or password</response>
        [AllowAnonymous]
        [HttpPost("/login")]
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

            // issue pre-cookie
            // pre-cookie is used to identify when submitting mfa
            string token;
            if (user.MfaEnabled)
            {
                // TODO:
                // Send MFA to phone or email here
                // Just write MFA code to console
                token = MakeToken(user.Id, DateTime.Now.AddMinutes(10));
            }
            else
            {
                token = MakeToken(user.Id, DateTime.Now.AddHours(12));
            }

            return new TokenDto { Token = token };
        }

        [AllowAnonymous]
        [HttpPost("/mfa/{mfaString}")]
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

            return new TokenDto { Token = cookie.ToString() };
        }

        [HttpPost("/logout")]
        public ActionResult Logout()
        {
            CookiesDb.RemoveCookie(HttpContext.User.Identity.Name); // identity.name is actually cookieStr
            return Ok(new { Message = "Success!" });
        }
    }
}
