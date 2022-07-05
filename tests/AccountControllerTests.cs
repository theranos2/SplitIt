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
    public class AccountControllerTest
    {
        private readonly DbConnection _conn;
        private readonly DbContextOptions<DatabaseContext> _ctxOpts;
        private readonly AccountController accountController;

        public AccountControllerTest()
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
            accountController = new AccountController(new DatabaseContext(_ctxOpts));
        }

        private DatabaseContext CreateDbContext() => new DatabaseContext(_ctxOpts);
        private void Dispose() => _conn.Dispose();

        [Fact]
        public void CreateUser()
        {
            var input = new RegisterDto
            {
                Email = "hello@gmail.com",
                Password = "123456789",
                FirstName = "John",
                LastName = "Smith",
            };
            var token = accountController.Register(input).Token;
            Assert.NotNull(token);
            Assert.False(token.Equals(""));
        }

        [Fact]
        public void CreateSameUser()
        {
            var input = new RegisterDto
            {
                Email = "hello@gmail.com",
                Password = "123456789",
                FirstName = "John",
                LastName = "Smith",
            };
            accountController.Register(input);
            input.Password = "0xb16d1cc5";
            input.FirstName = "Firstname";
            input.LastName = "Lastname";
            Assert.Throws<HttpBadRequest>(() => accountController.Register(input));
        }

        [Fact]
        public void LoginValidUser()
        {
            var email = "yeet@yeet.com";
            var password = "supersecretpassword";
            accountController.Register(new RegisterDto
            {
                Email = email,
                Password = password,
                FirstName = "ASAP",
                LastName = "Rocky",
            });
            var token = accountController.Login(new LoginDto
            {
                Email = email,
                Password = password,
            }).Token;
            Assert.NotNull(token);
            Assert.False(token.Equals(""));
        }

        [Fact]
        public void LoginNonExistentUser()
        {
            var input = new LoginDto
            {
                Email = "hello@gmail.com",
                Password = "812MatteBlackLookin'LikeCharcoal",
            };
            Assert.Throws<HttpBadRequest>(() => accountController.Login(input));
        }
    }
}
