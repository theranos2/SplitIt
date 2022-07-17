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

        /// <summary>Get Group</summary>
        /// <remarks>Use this route to get a group. Supply the group guid.</remarks>
        /// <response code="404">Not found. When the supplied group guid is not found.</response>
        /// <response code="403">Permission denied. Only group members can make see group details.</response>
        [HttpGet("{groupId:Guid}")]
        public GroupDto Get(Guid groupId)
        {

            Group group = db.Groups.Where(x => x.Id == groupId).FirstOrDefault();
            
            if(group == null)
                throw new HttpNotFound($"Cannot find group: {groupId}");
                
            Guid curUserId = IdentityTools.GetUser(db, HttpContext.User.Identity).Id;

            // check if group member is requesting the group
            bool found =  group.Members.Any(x => x.Id == curUserId);

            // check ownership
            if(group.Owner.Id != curUserId && !found)
                throw new HttpForbiddenRequest($"Permission Denied. Cannot view group that you are not apart of.");

            return group.ConvertToDto();
        }

        [ApiExplorerSettings(IgnoreApi = true)]
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
            User owner = IdentityTools.GetUser(db, HttpContext.User.Identity);
            members.Add(owner);

            return new Group{
                Id = Guid.Empty,
                Owner = owner,
                Members = members.GroupBy(x => x.Id).Select(x => x.FirstOrDefault()).ToList(), // delete duplicates if any trading bigah oh for code readability
            };
        }

        /// <summary>Create a Group</summary>
        /// <remarks>Use this route to create a group. Supply member guids to create group. See the GroupDto</remarks>
        /// <response code="404">Not found. When the supplied user guid is not found.</response>
        [HttpPost]
        public GroupDto Create(GroupDto groupDto)
        {
            Group newGroup = MakeGroup(groupDto);
            db.Groups.Add(newGroup);
            db.SaveChanges();

            return newGroup.ConvertToDto();
        }

        /// <summary>Edit a Group</summary>
        /// <remarks>Use this route to edit a group. You must be the group owner to edit (remove/add) users. To edit group simply supply the new list of member guids. Example: To add a user to a group simply APPEND that user guid to the member guid list and call this route using that parameter. Keyword "append", if not append, your new group will be user that user.</remarks>
        /// <response code="403">Permission denied. Only the owner of the group can make changes to the group.</response>
        /// <response code="404">Not found. When the supplied user guid is not found.</response>
        [HttpPut("{groupId:Guid}")]
        public GroupDto Edit(Guid groupId, GroupDto groupDto)
        {
            Group group = db.Groups.Where(x => x.Id == groupId).FirstOrDefault();

            if(group == null)
                throw new HttpNotFound($"Cannot find group: {groupId}");

            Guid curUserId = IdentityTools.GetUser(db, HttpContext.User.Identity).Id;
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
