using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using split_it.Authentication;
using split_it.Exceptions.Http;
using split_it.Models;

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

        // authtorized user only can visit this route
        // since the while controller is wrapped in [Authorize] we dont need to wrap this function in authorize
        // if we want it to not be authorize, use attribute [AllowAnonymous]  like the below
        // EXAMPLE ONLY
        [HttpGet("/useronly")]
        public string UserOnly()
        {
            return "here is my secret";
        }

        // EXAMPLE ONLY
        [AllowAnonymous]
        [HttpGet("/adduser")]
        public User AddUser()
        {
            var user = db.Users.Where(x => "kendrick@lamar.com" == x.Email).FirstOrDefault();
            if (user == null)
            {
                User newUser = new User
                {
                    Email = "kendrick@lamar.com",
                    FirstName = "kendrick",
                    LastName = "lamar"
                };

                db.Users.Add(newUser);
                db.SaveChanges();
                return newUser;
            }
            return user;

        }

        [AllowAnonymous]
        [HttpPost("/login")]
        public ActionResult Login(LoginDto login)
        {
            var user = db.Users.Where(x => login.Email == x.Email).FirstOrDefault();
            if (user == null)
                throw new HttpBadRequest("Email or password is incorrect");

            // TODO
            // check password here when implement password

            // issue pre-cookie
            // pre-cookie is used to identify when submitting mfa
            string token = CookiesDb.IssueCookie(new MyCookie
            {
                IssueDate = DateTime.Now,
                ExpiryDate = DateTime.Now.AddMinutes(10),
                LastSeen = DateTime.Now,
                MfaCode = "1", // TODO implement this lol
                hasPassedMfa = false,
                UserId = user.Id
            });


            // TODO
            // Send MFA to phone or email here

            return Ok(new { Token = token });
        }

        [AllowAnonymous]
        [HttpPost("/mfa/{mfa_string}")]
        public User Mfa(string mfa_string)
        {
            if (!Request.Headers.ContainsKey("Token"))
                throw new HttpBadRequest("Invalid Token");

            string cookieString = Request.Headers["Token"];
            MyCookie cookie = CookiesDb.Get(cookieString);

            if (cookie == null)
                throw new HttpBadRequest("Invalid Token");

            // check mfa
            if (mfa_string == cookie.MfaCode)
                cookie.hasPassedMfa = true;
            else
                throw new HttpBadRequest("Incorrect Mfa Code");

            cookie.ExpiryDate = cookie.IssueDate.AddHours(12); // increase expiration date



            // TODO: Wrap this in DTO
            return db.Users.Where(x => x.Id == cookie.UserId).FirstOrDefault();
        }

        [HttpPost("/logout")]
        public ActionResult Logout()
        {
            CookiesDb.RemoveCookie(HttpContext.User.Identity.Name); // identity.name is actually cookieStr
            return Ok(new { Message = "Success!" });
        }
    }
}
