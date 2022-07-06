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

        /// <summary>Show user given the ID</summary>
        /// <response code="404">User with given ID does not exists</response>
        [HttpGet("{userId:Guid}")]
        public UserDto Get(Guid userId)
        {
            var res = db.Users.Where(u => u.Id.Equals(userId))
                .Select(UserToDto)
                .FirstOrDefault();
            if (res == null) throw new HttpNotFound($"User with ID: {userId} not found");
            return res;
        }

        /// <summary>Show all users</summary>
        /// <param name="take">Maximum users to return</param>
        /// <param name="skip">Skip number of users</param>
        /// <response code="400">Negative take, skip values</response>
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
