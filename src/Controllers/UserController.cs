using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace split_it.Controllers
{
    [ApiController]
    [Route("/api/user")]

    public class UserController : ControllerBase
    {
        [HttpGet("{user_id:Guid}")]
        public User Get(Guid user_id)
        {
            var db = new DatabaseContext();
            return db.Users.Where(u => u.Id.Equals(user_id)).FirstOrDefault();
        }

        [HttpPost]
        public User Create(User user)
        {
            if (
                    user.Email == null || user.Email.Equals("")
                    || user.FirstName == null || user.FirstName.Equals("")
                    || user.LastName == null || user.LastName.Equals("")
                )
            {
                // TODO: write middleware to return {"message": <msg>} + statusCode in header
                return null;
            }
            user.Id = Guid.NewGuid();
            var db = new DatabaseContext();
            db.Users.Add(user);
            db.SaveChanges();
            return user;
        }
    }
}
