using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using split_it.Authentication;
using split_it.Exceptions.Http;
using split_it.Models;

namespace split_it.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupController : ControllerBase
    {
        DatabaseContext db;

        public GroupController(DatabaseContext _db)
        {
            db = _db;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        private User GetCurrentUser()
        {
            // Uncomment for production
            //var cookie = CookiesDb.Get(HttpContext.User.Identity.Name);
            //if(cookie == null)
                //throw new HttpBadRequest($"Bad cookie");

            //return db.Users.Where(x => x.Id == cookie.UserId).FirstOrDefault();

            // FOR DEBUG only
            return db.Users.Where(x => x.Email == "bob@dylan.com").FirstOrDefault();
            //return db.Users.Where(x => x.Email == "kendrick@lamar.com").FirstOrDefault();
        }

        [HttpGet("{groupId:Guid}")]
        public GroupDto Get(Guid groupId)
        {

            Group group = db.Groups.Where(x => x.Id == groupId).FirstOrDefault();
            
            if(group == null)
                throw new HttpNotFound($"Cannot find group: {groupId}");
                
            Guid curUserId = GetCurrentUser().Id;

            // check if group member is requesting the group
            bool found =  group.Members.Any(x => x.Id == curUserId);

            // check ownership
            if(group.Owner.Id != curUserId && !found)
                throw new HttpForbiddenRequest($"Permission Denied. Cannot view group that you are not apart of.");

            return group.ConvertToDto();
        }

        private Group MakeGroup(GroupDto groupDto)
        {
            List<User> members = new List<User>();
            // check members 
            foreach (var memberId in groupDto.MemberIds)
            {
                User member = db.Users.Where(x => x.Id == memberId).FirstOrDefault();
                if(member == null)
                    throw new HttpNotFound($"Cannot find user: {memberId}");
                
                members.Add(member);
            }

            // add owner into the group
            User owner = GetCurrentUser();
            members.Add(owner);

            return new Group{
                Id = Guid.Empty,
                Owner = owner,
                Members = members.GroupBy(x => x.Id).Select(x => x.FirstOrDefault()).ToList(), // delete duplicates if any
            };
        }

        [HttpPut("{groupId:Guid}")]
        public GroupDto Create(Guid groupId, GroupDto groupDto)
        {
            Group newGroup = MakeGroup(groupDto);
            db.Groups.Add(newGroup);
            db.SaveChanges();

            return newGroup.ConvertToDto();
        }

        [HttpPut("{groupId:Guid}")]
        public GroupDto Edit(Guid groupId, GroupDto groupDto)
        {
            Group group = db.Groups.Where(x => x.Id == groupId).FirstOrDefault();

            if(group == null)
                throw new HttpNotFound($"Cannot find group: {groupId}");

            Guid curUserId = GetCurrentUser().Id;
            if(curUserId != group.Owner.Id)
                throw new HttpForbiddenRequest($"Permission Denied. Cannot edit group that you are not the owner of.");

            Group updatedGroup = MakeGroup(groupDto);
            
            // update original group in database
            group.Members = updatedGroup.Members;
            
            db.SaveChanges();

            return group.ConvertToDto();
        }
    }
}
