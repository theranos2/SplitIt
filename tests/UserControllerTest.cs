using System;
using System.Data.Common;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using split_it;
using split_it.Controllers;
using split_it.Exceptions.Http;
using Xunit;

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
        public void FindUserNotFound()
        {
            Assert.Throws<HttpNotFound>(() => userController.Get(Guid.Empty));
            Assert.Throws<HttpNotFound>(() => userController.Get(Guid.NewGuid()));
        }
    }
}
