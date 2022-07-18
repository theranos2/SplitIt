using System;
using System.IO;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using split_it;

namespace seeder
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbFileName = "database.db";
            Console.WriteLine("Creating context");
            var path = Path.GetFullPath($"../src/{dbFileName}");
            Console.WriteLine($"path={path}");
            using var conn = new SqliteConnection($"Data Source={path.ToString()}");
            conn.Open();
            var ctxOpts = new DbContextOptionsBuilder<DatabaseContext>()
                .UseSqlite(conn)
                .Options;
            using var ctx = new DatabaseContext(ctxOpts);
            ctx.Database.EnsureCreated();
            UserSeeder.Seed(ctx);
            ctx.SaveChanges();
        }
    }
}
