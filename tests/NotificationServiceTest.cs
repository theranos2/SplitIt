using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using split_it;
using split_it.Controllers;
using split_it.Exceptions.Http;
using split_it.Models;
using split_it.Services;
using Xunit;

namespace tests
{
    public class NotificationsServiceTest
    {
        private readonly DbConnection _conn;
        private readonly DbContextOptions<DatabaseContext> _ctxOpts;
        private readonly NotificationService service;
        private readonly List<Guid> userIds = new List<Guid>();
        private readonly List<Guid> notifIds = new List<Guid>();

        public NotificationsServiceTest()
        {
            // From:
            // https://docs.microsoft.com/en-us/ef/core/testing/testing-without-the-database#sqlite-in-memory
            _conn = new SqliteConnection("Filename=:memory:");
            _conn.Open();
            _ctxOpts = new DbContextOptionsBuilder<DatabaseContext>()
                .UseSqlite(_conn)
                .EnableSensitiveDataLogging()
                .Options;
            var names = new List<string> { "ken", "lachlan", "xibo", "adam", "razin" };
            using var ctx = new DatabaseContext(_ctxOpts);
            ctx.Database.EnsureCreated();
            var accController = new AccountController(ctx);
            foreach (string name in names)
            {
                accController.Register(
                    new RegisterDto
                    {
                        Email = $"{name}@hotmail.com",
                        Password = $"{name}{name}",
                        FirstName = $"{name}",
                        LastName = $"{name}",
                    }
                );
            }
            var _svc = new NotificationService(ctx);
            foreach (User u in ctx.Users.ToList())
            {
                var n = _svc.Add(new Notification
                {
                    UserId = Guid.Parse(u.Id.ToString()),
                    ResourceId = Guid.NewGuid(),
                    Message = "Test",
                    Domain = "Test"
                });
                notifIds.Add(Guid.Parse(n.Id.ToString()));
                userIds.Add(Guid.Parse(u.Id.ToString()));
            }
            service = new NotificationService(new DatabaseContext(_ctxOpts));
        }

        private DatabaseContext CreateDbContext() => new DatabaseContext(_ctxOpts);
        private void Dispose() => _conn.Dispose();

        [Fact]
        public void CreateNotificationValid()
        {
            var userId = userIds[0];
            var n = service.Add(new Notification
            {
                UserId = userId,
                Domain = "domain",
                Message = "message",
                ResourceId = Guid.NewGuid()
            });
            Assert.NotNull(n);
            Assert.Equal(userId, n.UserId);
        }

        [Fact]
        public void CreateNotificationInvalid()
        {
            Assert.Throws<HttpBadRequest>(() =>
                service.Add(new Notification
                {
                    Id = Guid.NewGuid()
                })
            );
        }

        [Fact]
        public void CreateNotificationInvalidUser()
        {
            Assert.Throws<HttpBadRequest>(() =>
                service.Add(new Notification
                {
                    Id = Guid.Empty,
                    UserId = Guid.NewGuid()
                })
            );
        }

        [Fact]
        public void GetNotificationValid()
        {
            var n = service.Get(userIds[0], NotificationSort.DATE_DESC, 10, 0);
            Assert.Equal(notifIds[0], n[0].Id);
        }

        [Fact]
        public void GetNotificationValidSortPaginate()
        {
            var userId = userIds[0];
            var n = service.Add(new Notification
            {
                UserId = userId,
                Domain = "domain",
                Message = "message",
                ResourceId = Guid.NewGuid()
            });
            var asc = service.Get(userId, NotificationSort.DATE_ASC, 10, 0);
            var desc = service.Get(userId, NotificationSort.DATE_DESC, 10, 0);
            Assert.Equal(asc.Last().Id, desc.First().Id);

            var take = service.Get(userId, NotificationSort.DATE_DESC, 1, 0);
            Assert.Single(take);

            var skip = service.Get(userId, NotificationSort.DATE_DESC, 10, 1);
            Assert.Single(skip);

            Assert.Equal(desc[0].Id, take[0].Id);
            Assert.Equal(desc[1].Id, skip[0].Id);
        }

        [Fact]
        public void GetIdNotFound()
        {
            Assert.Throws<HttpNotFound>(() => service.GetById(userIds[0], Guid.NewGuid()));
            Assert.Throws<HttpNotFound>(() => service.GetById(userIds[1], notifIds[0]));
        }

        [Fact]
        public void GetIdValid()
        {
            Assert.NotNull(service.GetById(userIds[0], notifIds[0]));
        }

        [Fact]
        public void DeleteNotification()
        {
            var n = service.Get(userIds[0], NotificationSort.DATE_DESC, 10, 0);
            Assert.Single(n);
            service.Remove(userIds[0], notifIds[0]);
            Assert.Empty(service.Get(userIds[0], NotificationSort.DATE_DESC, 10, 0));
        }

        [Fact]
        public void DeleteNotFoundNotification()
        {
            Assert.Throws<HttpNotFound>(() => service.Remove(userIds[0], Guid.NewGuid()));
        }
    }
}
