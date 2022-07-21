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
            },
            new Notification // Notify User 1, User 0 added them to group
            {
                Id = Guid.NewGuid(),
                User = UserSeeder.Data[1],
                Domain = "group",
                ResourceId = GroupSeeder.Data[0].Id,
                Message = $"{GroupSeeder.Data[0].Owner.FirstName} added you to group '{GroupSeeder.Data[0].Name}'",
                CreatedAt = DateTime.Now,
            },
            new Notification // Notify User 2, User 0 added them to group
            {
                Id = Guid.NewGuid(),
                User = UserSeeder.Data[2],
                Domain = "group",
                ResourceId = GroupSeeder.Data[0].Id,
                Message = $"{GroupSeeder.Data[0].Owner.FirstName} added you to group '{GroupSeeder.Data[0].Name}'",
                CreatedAt = DateTime.Now,
            },
            new Notification // Notify User 2, User 1 added them to group
            {
                Id = Guid.NewGuid(),
                User = UserSeeder.Data[2],
                Domain = "group",
                ResourceId = GroupSeeder.Data[1].Id,
                Message = $"{GroupSeeder.Data[1].Owner.FirstName} added you to group '{GroupSeeder.Data[1].Name}'",
                CreatedAt = DateTime.Now,
            },
            new Notification // Notify User 3, User 1 added them to group
            {
                Id = Guid.NewGuid(),
                User = UserSeeder.Data[3],
                Domain = "group",
                ResourceId = GroupSeeder.Data[1].Id,
                Message = $"{GroupSeeder.Data[1].Owner.FirstName} added you to group '{GroupSeeder.Data[1].Name}'",
                CreatedAt = DateTime.Now,
            },
            new Notification // Notify User 4, User 1 added them to group
            {
                Id = Guid.NewGuid(),
                User = UserSeeder.Data[4],
                Domain = "group",
                ResourceId = GroupSeeder.Data[1].Id,
                Message = $"{GroupSeeder.Data[1].Owner.FirstName} added you to group '{GroupSeeder.Data[1].Name}'",
                CreatedAt = DateTime.Now,
            },
        };

        public static void Seed(DatabaseContext ctx)
        {
            ctx.Notifications.AddRange(Data);
            ctx.SaveChanges();
        }
    }
}
