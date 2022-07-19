using System;
using System.Collections.Generic;
using System.Data.Common;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using split_it;
using split_it.Controllers;
using split_it.Exceptions.Http;
using split_it.Models;
using Xunit;

namespace tests
{
    public class UserControllerTest
    {
        private readonly DbConnection _conn;
        private readonly DbContextOptions<DatabaseContext> _ctxOpts;
        private readonly UserController userController;
        private readonly List<string> names = new List<string> { "ken", "lachlan", "xibo", "adam", "razin" };

        public UserControllerTest()
        {
            // From:
            // https://docs.microsoft.com/en-us/ef/core/testing/testing-without-the-database#sqlite-in-memory
            _conn = new SqliteConnection("Filename=:memory:");
            _conn.Open();
            _ctxOpts = new DbContextOptionsBuilder<DatabaseContext>()
                .UseSqlite(_conn)
                .Options;
            using var ctx = new DatabaseContext(_ctxOpts);
            ctx.Database.EnsureCreated();

            // Seed data with some users
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

            userController = new UserController(new DatabaseContext(_ctxOpts));
        }

        private DatabaseContext CreateDbContext() => new DatabaseContext(_ctxOpts);
        private void Dispose() => _conn.Dispose();

        [Fact]
        public void FindUserNotFound()
        {
            Assert.Throws<HttpNotFound>(() => userController.Get(Guid.Empty));
            Assert.Throws<HttpNotFound>(() => userController.Get(Guid.NewGuid()));
        }

        [Fact]
        public void GetAllUsers()
        {
            var users = userController.GetMany();
            Assert.True(users.TrueForAll(u => names.Exists(n => u.FirstName == n)));
        }

        [Theory]
        [InlineData(10, -1)]
        [InlineData(-1, 10)]
        [InlineData(-1, -1)]
        public void GetAllUsersBadParam(int take, int skip)
        {
            Assert.Throws<HttpBadRequest>(() => userController.GetMany(take: take, skip: skip));
        }

        [Fact]
        public void FindOneUser()
        {
            var user = userController.GetMany(take: 1)[0];
            var sameUser = userController.Get(user.Id);
            Assert.Equal(user.Id, sameUser.Id);
            Assert.Equal(user.FirstName, sameUser.FirstName);
            Assert.Equal(user.LastName, sameUser.LastName);
        }

        [Theory]
        [InlineData(3, 3, 2)]
        [InlineData(1, 100, 4)] // since we have 5 users
        [InlineData(0, 10, 5)] // since we have 5 users
        public void UserTakeSkip(int expected, int take, int skip)
        {
            var users = userController.GetMany(take: take, skip: skip);
            Assert.Equal(expected, users.Count);
        }

        [Fact]
        public void UserFilter()
        {
            var users = userController.GetMany(filter: new UserFilter
            {
                FirstName = "ken"
            });
            Assert.Single(users);
            Assert.Equal("ken", users[0].FirstName);
        }

        [Theory]
        [InlineData(UserSort.EMAIL_ASC, UserSort.EMAIL_DESC)]
        [InlineData(UserSort.FIRSTNAME_ASC, UserSort.FIRSTNAME_DESC)]
        [InlineData(UserSort.LASTNAME_ASC, UserSort.LASTNAME_DESC)]
        public void UserSorting(UserSort asc, UserSort desc)
        {
            var sortedAsc = userController.GetMany(sortBy: asc);
            var sortedDesc = userController.GetMany(sortBy: desc);
            Assert.Equal(sortedAsc[0].Id, sortedDesc[4].Id);
        }
    }
}
