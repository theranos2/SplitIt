using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using split_it.Authentication;
using split_it.Models;
using split_it.Services;

namespace split_it.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly NotificationService service;
        public NotificationsController(NotificationService service)
        {
            this.service = service;
        }

        /// <response code="400">Take skip value invalid</response>
        [HttpGet]
        public List<Notification> GetMany(
            [FromHeader(Name = "Token")] string Token,
            [FromQuery(Name = "sortBy")] NotificationSort sortBy = NotificationSort.DATE_DESC,
            [FromQuery(Name = "take")] int take = 10,
            [FromQuery(Name = "skip")] int skip = 0
        )
        {
            Guid UserId = CookiesDb.Get(Token).UserId;
            return service.Get(UserId, sortBy, take, skip);
        }

        /// <response code="404">Zero notifications deleted</response>
        /// <summary>Delete many notification at once</summary>
        [HttpDelete]
        public void SeenMany(
            List<Guid> NotificationIds,
            [FromHeader(Name = "Token")] string Token
        )
        {
            Guid UserId = CookiesDb.Get(Token).UserId;
            service.RemoveBatch(UserId, NotificationIds);
        }

        /// <response code="404">Notification Id not found</response>
        [HttpGet("{NotificationId:Guid}")]
        public Notification GetById(
            Guid NotificationId,
            [FromHeader(Name = "Token")] string Token
        )
        {
            Guid UserId = CookiesDb.Get(Token).UserId;
            return service.GetById(UserId, NotificationId);
        }

        /// <response code="404">When NotificationId and UserId is not found</response>
        /// <summary>Mark Notification as seen aka delete it</summary>
        [HttpDelete("{NotificationId:Guid}")]
        public void Seen(
            Guid NotificationId,
            [FromHeader(Name = "Token")] string Token
        )
        {
            Guid UserId = CookiesDb.Get(Token).UserId;
            service.Remove(UserId, NotificationId);
        }
    }
}
