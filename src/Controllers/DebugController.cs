using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using split_it.Authentication;
using split_it.Exceptions.Http;
using split_it.Models;

namespace split_it.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DegubController : ControllerBase
    {
        DatabaseContext db;

        public DegubController(DatabaseContext _db)
        {
            db = _db;
        }

        ////////////////////////
        ////DEBUGING METHODS////
        ////////////////////////

        [HttpGet("/create")]
        public Bill Creet()
        {
            var bob = db.Users.Where(x => x.Email == "bob@dylan.com").FirstOrDefault();
            var lamar = db.Users.Where(x => x.Email == "kendrick@lamar.com").FirstOrDefault();

            if (bob == null)
            {
                // Create dummy users
                User bobby = new User
                {
                    Email = "bob@dylan.com",
                    FirstName = "bob",
                    LastName = "dylan",
                    MfaEnabled = false,
                    Password = "kekekekeke"
                };
                db.Users.Add(bobby);
                db.SaveChanges();
            }

            if (lamar == null)
            {
                User kenny = new User
                {
                    Email = "kendrick@lamar.com",
                    FirstName = "kendrick",
                    LastName = "lamar",
                    MfaEnabled = false,
                    Password = "kekekekeke"
                };
                db.Users.Add(kenny);
                db.SaveChanges();
            }

            bob = db.Users.Where(x => x.Email == "bob@dylan.com").FirstOrDefault();
            lamar = db.Users.Where(x => x.Email == "kendrick@lamar.com").FirstOrDefault();

            // Create bill
            List<Share> shares = new List<Share>()
            {
                Share.create_share(bob, new List<Item>{
                    new Item{
                        Name = "Pizza",
                        Price = 10.99
                    },
                    new Item{
                        Name = "Hotpie",
                        Price = 2.99
                    }
                }),

                Share.create_share(lamar, new List<Item>{
                    new Item{
                        Name = "Pizza",
                        Price = 10.99
                    },
                    new Item{
                        Name = "Hotpie",
                        Price = 2.99
                    }
                }),
            };

            Bill bill = Bill.create_bill(bob, shares, "Bobs Bill");
            db.Bills.Add(bill);

            db.SaveChanges();

            return bill;

        }

        // Example how to return nested objects
        [HttpGet("/bills")]
        public IEnumerable<Bill> Getslosts()
        {
            return db.Bills
                .Include(bill => bill.Owner)
                .Include(bill => bill.Shares)
                .ThenInclude(share => share.Payer)
                .Include(d => d.Shares)
                .ThenInclude(share => share.Items).ToList();
        }

        [HttpGet("/users")]
        public IEnumerable<User> GetUsers()
        {
            return db.Users.ToList();
        }

    }
}
