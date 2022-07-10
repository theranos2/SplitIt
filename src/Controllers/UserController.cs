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
    [Route("api/[controller]")]
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
        /// <param name="filter">Filter user searching</param>
        /// <param name="sortBy">Sort results</param>
        /// <response code="400">Negative take, skip values</response>
        [HttpGet]
        public List<UserDto> GetMany(
            [FromQuery] UserSort sortBy = UserSort.FIRSTNAME_ASC,
            [FromQuery] UserFilter filter = null,
            [FromQuery(Name = "take")] int take = 10,
            [FromQuery(Name = "skip")] int skip = 0
        )
        {
            if (take < 0 || skip < 0)
                throw new HttpBadRequest("Query parameters must be non-negative");

            var qb = db.Users.AsQueryable();
            if (!String.IsNullOrEmpty(filter?.Email))
            {
                qb = qb.Where(u => u.Email.ToLower().Contains(filter.Email));
            }
            if (!String.IsNullOrEmpty(filter?.FirstName))
            {
                qb = qb.Where(u => u.FirstName.Contains(filter.FirstName));
            }
            if (!String.IsNullOrEmpty(filter?.LastName))
            {
                qb = qb.Where(u => u.LastName.Contains(filter.LastName));
            }

            switch (sortBy)
            {
                case UserSort.EMAIL_ASC:
                    qb = qb.OrderBy(u => u.Email);
                    break;
                case UserSort.EMAIL_DESC:
                    qb = qb.OrderByDescending(u => u.Email);
                    break;
                case UserSort.FIRSTNAME_ASC:
                    qb = qb.OrderBy(u => u.FirstName);
                    break;
                case UserSort.FIRSTNAME_DESC:
                    qb = qb.OrderByDescending(u => u.FirstName);
                    break;
                case UserSort.LASTNAME_ASC:
                    qb = qb.OrderBy(u => u.LastName);
                    break;
                case UserSort.LASTNAME_DESC:
                    qb = qb.OrderByDescending(u => u.LastName);
                    break;
            }

            return qb.Take(take).Skip(skip)
                .Select(UserToDto)
                .ToList();
        }
    }
}
