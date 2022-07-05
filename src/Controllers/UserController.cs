using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using split_it.Exceptions.Http;

namespace split_it.Controllers
{
    [ApiController]
    [Authorize]
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
    }
}
