using System;
using System.Collections.Generic;
using split_it;
using split_it.Models;

namespace seeder
{
    public class NotificationSeeder
    {
        public static List<Notification> Data = new List<Notification>
        {
            new Notification
            {
                Id = Guid.NewGuid(),
                User = UserSeeder.Data[1],
                Domain = "bill",
                ResourceId = BillSeeder.Data[0].Id,
                Message = $"{UserSeeder.Data[0].FirstName} added you to a bill",
                CreatedAt = DateTime.Now,
            }
        };

        public static void Seed(DatabaseContext ctx)
        {
            ctx.Notifications.AddRange(Data);
            ctx.SaveChanges();
        }
    }
}
