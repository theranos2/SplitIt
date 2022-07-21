using System;
using System.IO;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using split_it;

namespace seeder
{
    class Program
    {
        static void Main(string[] args)
        {
            var path = Path.GetFullPath("../src/database.db");
            Console.WriteLine($"path={path}");
            using var conn = new SqliteConnection($"Data Source={path.ToString()}");
            conn.Open();
            var ctxOpts = new DbContextOptionsBuilder<DatabaseContext>()
                .UseSqlite(conn)
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .Options;
            using var ctx = new DatabaseContext(ctxOpts);
            ctx.Database.EnsureCreated();
            UserSeeder.Seed(ctx);
            BillSeeder.Seed(ctx);
            GroupSeeder.Seed(ctx);
            NotificationSeeder.Seed(ctx);
            ctx.SaveChanges();
        }
    }
}
