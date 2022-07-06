// Database.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace split_it
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Bill> Bills { get; set; }

        public static DbContextOptions<DatabaseContext> DefaultDatabaseOptions = new DbContextOptionsBuilder<DatabaseContext>()
            .UseSqlite("Data Source=database.db")
            .Options;

        public DatabaseContext() : this(DatabaseContext.DefaultDatabaseOptions)
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // uncomment when we need to enforce unique email field
            builder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite("Data Source=database.db");
            }
        }
    }

    public class Bill
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public User Owner { get; set; }
        public double Total { get; set; }
        public string Title { get; set; }
        public ICollection<Share> Shares { get; set; }
        public bool isSettled { get; set; }
    }

    public class Share
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public bool hasPaid { get; set; }
        public bool hasAccepted { get; set; }

        public User Payer { get; set; }
        public double Amount { get; set; }
        public string Description { get; set; }
    }

    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public bool MfaEnabled { get; set; } = false;

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }
            var userObj = (User)obj;

            return
                userObj.Id.Equals(Id)
                && userObj.Email.Equals(Email)
                && userObj.FirstName.Equals(FirstName)
                && userObj.LastName.Equals(LastName)
                && userObj.Password.Equals(Password)
                && userObj.MfaEnabled.Equals(MfaEnabled);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Email, FirstName, LastName, Password, MfaEnabled);
        }
    }
}
