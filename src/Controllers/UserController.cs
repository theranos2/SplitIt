using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using split_it.Exceptions.Http;
using split_it.Models;

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

        private UserDto UserToDto(User u)
        {
            return new UserDto
            {
                Id = u.Id,
                Email = u.Email,
                FirstName = u.FirstName,
                LastName = u.LastName,
                MfaEnabled = u.MfaEnabled,
            };
        }

        [HttpGet("{user_id:Guid}")]
        public UserDto Get(Guid user_id)
        {
            var res = db.Users.Where(u => u.Id.Equals(user_id))
                .Select(UserToDto)
                .FirstOrDefault();
            if (res == null) throw new HttpNotFound($"User with ID: {user_id} not found");
            return res;
        }

        [HttpGet]
        public List<UserDto> GetMany(
            [FromQuery(Name = "take")] int take = 10,
            [FromQuery(Name = "skip")] int skip = 0
        )
        {
            if (take < 0 || skip < 0)
                throw new HttpBadRequest("Query parameters must be non-negative");
            return db.Users.Take(take).Skip(skip)
                .Select(UserToDto)
                .ToList();
        }
    }
}
