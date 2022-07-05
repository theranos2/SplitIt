using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using split_it.Exceptions.Http;

namespace split_it.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        DatabaseContext db;
        public UserController(DatabaseContext _db)
        {
            db = _db;
        }

        [HttpGet("{user_id:Guid}")]
        public User Get(Guid user_id)
        {
            var res = db.Users.Where(u => u.Id.Equals(user_id)).FirstOrDefault();
            if (res == null) throw new HttpNotFound($"User with ID: {user_id} not found");
            return res;
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
                throw new HttpBadRequest("Email, FirstName and LastName must not be empty");
            }
            user.Id = Guid.Empty;
            db.Users.Add(user);
            db.SaveChanges();
            return user;
        }
    }
}
