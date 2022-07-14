using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using split_it.Authentication;
using split_it.Exceptions.Http;
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

        /// <response code="404">Notification Id not found</response>
        [HttpGet("{NotificationId:Guid}")]
        public Notification GetById(
            Guid NotificationId,
            [FromHeader(Name = "Token")] string Token
        )
        {
            Guid UserId = CookiesDb.Get(Token).UserId;
            return service.GetById(UserId, NotificationId)
                ?? throw new HttpNotFound($"Notification (ID: {NotificationId}) not found");
        }

        /// <response code="403">When NotificationId does not belong to the authenticated user</response>
        /// <summary>Mark Notification as seen aka delete it</summary>
        [HttpDelete("{NotificationId:Guid}")]
        public void Seen(
            Guid NotificationId,
            [FromHeader(Name = "Token")] string Token
        )
        {
            Guid UserId = CookiesDb.Get(Token).UserId;
            var n = service.GetById(UserId, NotificationId);
            if (n == null) throw new HttpForbidden();
            service.Remove(n.Id);
        }
    }
}
