using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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
            n.Id = Guid.Empty;
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
            int take = 10,
            int skip = 0
        )
        {
            return db.Users
                .Include(u => u.Notifications)
                .Where(u => u.Id == UserId)
                .FirstOrDefault()
                .Notifications
                .Skip(skip)
                .Take(take)
                .ToList();
        }

        public Notification GetById(Guid UserId, Guid NotificationId)
        {
            return db.Users
                .Include(u => u.Notifications)
                .Where(u => u.Id == UserId)
                .FirstOrDefault()
                ?.Notifications
                .Where(n => n.Id == NotificationId)
                ?.FirstOrDefault();
        }
    }
}
