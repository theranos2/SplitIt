using System;
using System.Data.Common;
using Xunit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.Sqlite;
using split_it;
using split_it.Controllers;
using split_it.Exceptions.Http;

namespace tests
{
    public class UserControllerTest
    {
        private readonly DbConnection _conn;
        private readonly DbContextOptions<DatabaseContext> _ctxOpts;

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
        }

        private DatabaseContext CreateDbContext() => new DatabaseContext(_ctxOpts);
        private void Dispose() => _conn.Dispose();

        [Fact]
        public void CreateUserInvalid()
        {
            using var ctx = CreateDbContext();
            var userController = new UserController(ctx);

            Assert.Throws<HttpBadRequest>(() => userController.Create(new User { }));
        }

        [Fact]
        public void CreateUser()
        {
            using var ctx = CreateDbContext();
            var userController = new UserController(ctx);

            var user = new User
            {
                FirstName = "Bob",
                LastName = "Dylan",
                Email = "bob@dylan.com",
            };
            var createdUser = userController.Create(user);
            user.Id = Guid.Parse(createdUser.Id.ToString());
            Assert.Equal(user, createdUser);
        }

        [Fact]
        public void FindUserNotFound()
        {
            using var ctx = CreateDbContext();
            var userController = new UserController(ctx);

            Assert.Throws<HttpNotFound>(() => userController.Get(Guid.Empty));
            Assert.Throws<HttpNotFound>(() => userController.Get(Guid.NewGuid()));
        }
    }
}
