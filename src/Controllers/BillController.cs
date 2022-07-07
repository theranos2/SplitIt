using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using split_it.Models;

namespace split_it.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillController : ControllerBase
    {
        DatabaseContext db;

        public BillController(DatabaseContext _db)
        {
            db = _db;
        }


        [HttpGet]
        public Guid OG()
        {
            return new Guid();
        }

        [HttpGet("{bill_id:Guid}")]
        public Bill Get(Guid bill_id)
        {
            return db.Bills.Where(x => x.Id == bill_id).FirstOrDefault();
        }

        [HttpPost]
        public Bill Create(Bill bill)
        {
            bill.Created = DateTime.Now;
            bill.Id = Guid.Empty; // make invalid guid, that so database auto gen. also stops attackers from crafting custom guid
            bill.Owner = GetCurrentUser(); // get the predefined user

            if (bill.Title == null)
                bill.Title = "";

            if (bill.Shares == null)
                bill.Shares = new List<Share>();


            bill.Total = 0.0;
            foreach (Share share in bill.Shares)
            {
                // share input validation
                //if (share.Amount < 0.05)
                //// we need to handle exception in sprint 2 or later
                //// currently no exception handler hence no strings return
                //throw new Exception("Error");

                //if (share.Description == null)
                //share.Description = "";

                //share.Payer = TODO. this is dangerous. We need DTO.
                //share.Payer = db.Users.Where(x => x.Email == share.Payer.Email).FirstOrDefault();
                share.Payer = db.Users.Where(x => x.Email == share.Payer.Email).FirstOrDefault();

                share.hasAccepted = false;
                share.hasPaid = false;

                if (share.Payer == GetCurrentUser())
                {
                    share.hasPaid = true;
                    share.hasAccepted = true;
                }

                //bill.Total += share.Amount;
            }

            // persist to the database
            db.Bills.Add(bill);
            db.SaveChanges();

            return bill;
        }

        [HttpGet("getmany")]
        public IEnumerable<Bill> GetMany(BillFilter filter)
        {
            IQueryable<Bill> query = db.Bills.AsQueryable<Bill>();

            if (filter.BillOwner != Guid.Empty)
                query = query.Where(x => x.Owner.Id == filter.BillOwner);

            if (filter.BillMembers != null)
                query = query.Where(x => x.Shares.Any(x => filter.BillMembers.Contains(x.Id)));


            return query.Where(x =>
                    new DateTimeOffset(x.Created).ToUnixTimeSeconds() <= filter.EndTime &&
                    new DateTimeOffset(x.Created).ToUnixTimeSeconds() >= filter.StartTime &&
                    x.Total <= filter.EndAmount &&
                    x.Total >= filter.StartAmount &&
                    x.Title.ToLower().Contains(filter.Title.ToLower()) &&
                    x.isSettled == filter.isSettled).Skip(filter.Offset).Take(filter.Limit);
        }

        [HttpPost("accept/{bill_id:Guid}")]
        public string Accept(Guid bill_id)
        {
            Bill bill = db.Bills.Where(x => x.Id == bill_id).FirstOrDefault();

            if (bill == null)
                return "Failed: Cannot find";

            // determine who user is 
            // problem because we havent got auth working
            User curUser = GetCurrentUser();

            bool accepted = false;
            foreach (Share share in bill.Shares)
                if (share.Payer == curUser)
                    share.hasAccepted = true;

            if (!accepted)
                return "Failed: Cannot find";

            return "Successful";
        }

        [HttpPost("reject/{bill_id:Guid}")]
        public string Reject(Guid bill_id)
        {
            Bill bill = db.Bills.Where(x => x.Id == bill_id).FirstOrDefault();

            if (bill == null)
                return "Failed: Cannot find";

            // determine who user is 
            // problem because we havent got auth working
            User curUser = GetCurrentUser();

            bool rejected = false;
            foreach (Share share in bill.Shares)
                if (share.Payer == curUser)
                {
                    if (share.hasAccepted)
                        return "Failed: Cannot reject when you have accepted already";
                    else
                        // redundant
                        share.hasAccepted = false;
                    // TODO notifcation goes here
                }

            if (!rejected)
                return "Failed: Cannot find";

            return "Successful";
        }

        [HttpDelete("{bill_id:Guid}")]
        public string Delete(Guid bill_id)
        {
            Bill bill = db.Bills.Where(x => x.Id == bill_id).FirstOrDefault();

            if (bill == null)
                return "Failed: Cannot find";

            db.Bills.Remove(bill);
            db.SaveChanges();

            return "Zuckzezz";
        }

        [HttpPut("{bill_id:Guid}")]
        public Bill Edit(Guid bill_id, Bill bill)
        {
            // TODO EDIT AND POST(Create) SHOULD BE COUSINS else spag code
            Bill myBill = db.Bills.Where(x => x.Id == bill_id).FirstOrDefault();

            if (myBill == null)
                return null;

            myBill.isSettled = bill.isSettled;
            myBill.Shares = bill.Shares; // TODO get pwned son! CVE: 10
            myBill.Title = bill.Title;
            myBill.Total = bill.Total;

            db.SaveChanges();
            return myBill;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public User GetCurrentUser()
        {
            // Stub function to return an existing user for now
            // Will actually return current user when authentication is added
            if (db.Users.Where(x => x.FirstName == "Jack").FirstOrDefault() == null)
            {
                db.Users.Add(new User
                {
                    Email = "hello@example.com",
                    FirstName = "Jack",
                    LastName = "Sack"
                });

                db.Users.Add(new User
                {
                    Email = "hello2@example.com",
                    FirstName = "Sack",
                    LastName = "Jack"
                });

                db.SaveChanges();
            }

            return db.Users.Where(x => x.FirstName == "Jack").FirstOrDefault();
        }


        [HttpGet("/create")]
        public Bill Creet()
        {
            // Create dummy users
            User bob = new User
            {
                Email = "bob@dylan.com",
                FirstName = "bob",
                LastName = "dylan",
                MfaEnabled = false,
                Password = "kekekekeke"
            };

            User lamar = new User
            {
                Email = "kendrick@lamar.com",
                FirstName = "kendrick",
                LastName = "lamar",
                MfaEnabled = false,
                Password = "kekekekeke"
            };

            //var bob = db.Users.Take(1).Skip(0).FirstOrDefault();
            //var lamar = db.Users.Take(1).Skip(1).FirstOrDefault();

            db.Users.Add(bob);
            db.Users.Add(lamar);
            db.SaveChanges();

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
        [HttpGet("/getlots")]
        public IEnumerable<Bill> Getslosts()
        {
            //arggggg!
            return db.Bills.Include(bill => bill.Owner)
                .Include(bill => bill.Shares)
                .ThenInclude(share => share.Payer)
                .Include(d => d.Shares)
                .ThenInclude(share => share.Payer).ToList();
        }
    }
}
