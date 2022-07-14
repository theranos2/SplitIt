using System;
using System.Collections.Generic;
using System.Linq;
using split_it.Exceptions.Http;
using split_it.Models;

namespace split_it.Services
{
    public class NotificationService
    {
        DatabaseContext db;
        public NotificationService(DatabaseContext _db)
        {
            db = _db;
        }

        public Notification Add(Notification n)
        {
            if (n.Id != Guid.Empty)
                throw new HttpBadRequest("Do not supply ID");
            if (string.IsNullOrEmpty(n.Domain))
                throw new HttpBadRequest("Domain must not be empty");
            if (string.IsNullOrEmpty(n.Message))
                throw new HttpBadRequest("Message must not be empty");
            if (n.ResourceId == Guid.Empty)
                throw new HttpBadRequest("ResourceId must not be empty");

            var user = db.Users.Where(u => u.Id == n.UserId).FirstOrDefault();
            if (user == null)
                throw new HttpBadRequest("User does not exists");

            n.CreatedAt = DateTime.Now;

            db.Notifications.Add(n).Reload();
            db.SaveChanges();
            return n;
        }

        public void Remove(Guid Id)
        {
            db.Notifications.Remove(new Notification { Id = Id });
            db.SaveChanges();
        }

        public List<Notification> Get(
            Guid UserId,
            NotificationSort sortBy,
            int take,
            int skip
        )
        {
            if (take < 0 || skip < 0)
                throw new HttpBadRequest("Take and Skip values must be positive");
            var qb = db.Notifications
                .AsQueryable()
                .Where(n => n.UserId == UserId);
            if (sortBy == NotificationSort.DATE_ASC)
                qb = qb.OrderBy(n => n.CreatedAt);
            else if (sortBy == NotificationSort.DATE_DESC)
                qb = qb.OrderByDescending(n => n.CreatedAt);
            return qb
                .Skip(skip)
                .Take(take)
                .ToList();
        }

        public Notification GetById(Guid UserId, Guid NotificationId)
        {
            var n = db.Notifications
                .Where(n => n.Id == NotificationId)
                .Where(n => n.UserId == UserId)
                .FirstOrDefault();
            if (n == null)
                throw new HttpNotFound("Notification not found");
            return n;
        }
    }
}
