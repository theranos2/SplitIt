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
        private readonly UserController userController;

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
            userController = new UserController(new DatabaseContext(_ctxOpts));
        }

        private DatabaseContext CreateDbContext() => new DatabaseContext(_ctxOpts);
        private void Dispose() => _conn.Dispose();

        [Fact]
        public void CreateUserInvalid()
        {
            Assert.Throws<HttpBadRequest>(() => userController.Create(new User { }));
        }

        [Fact]
        public void CreateUser()
        {
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
            Assert.Throws<HttpNotFound>(() => userController.Get(Guid.Empty));
            Assert.Throws<HttpNotFound>(() => userController.Get(Guid.NewGuid()));
        }
    }
}
