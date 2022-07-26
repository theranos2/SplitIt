using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using split_it.Models;

namespace split_it
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Share> Shares { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<FileAttachment> Files { get; set; }

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

    public class FileAttachment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Filename { get; set; }
        public string Extension { get; set; }
    }

    public enum Status
    {
        Pending,
        Accepted,
        Rejected,
        Paid
    }

    public class Bill
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public User Owner { get; set; }

        /// <summary>Inferred from Sum of total shares</summary>
        [NotMapped]
        public double Total
        {
            get
            {
                return this.Shares.Sum(share => share.Total);
            }
        }

        public string Title { get; set; }
        public List<FileAttachment> Attachments { get; set; }
        public ICollection<Share> Shares { get; set; }
        public bool IsSettled { get; set; } = false;
    }

    public class Item
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
    }

    public class Share
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        /// <summary>Defaults to pending</summary>
        public Status Status { get; set; } = Status.Pending;

        /// <summary>Inferred from sum of items</summary>
        /// <remarks>
        /// round to upper 5 cents<br/>
        /// 0.33 -> 0.35<br/>
        /// 1.00 -> 1.00<br/>
        /// </remarks>
        [NotMapped]
        public double Total
        {
            get
            {
                return Math.Round(Math.Ceiling(this.Items.Sum(i => i.Price) / 0.01) * 0.01, 2);
            }
        }

        public User Payer { get; set; }
        public ICollection<Item> Items { get; set; }
    }

    public class Group
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public User Owner { get; set; }
        public ICollection<User> Members { get; set; }
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
