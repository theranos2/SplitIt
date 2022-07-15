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
    public class BillController : ControllerBase
    {
        DatabaseContext db;

        public BillController(DatabaseContext _db)
        {
            db = _db;
        }

        // returns 204 if not found
        [HttpGet("{bill_id:Guid}")]
        public BillDto Get(Guid bill_id)
        {
            Bill bill = db.Bills.Where(x => x.Id == bill_id)
                .Include(bill => bill.Owner)
                .Include(bill => bill.Shares)
                .ThenInclude(share => share.Payer)
                .Include(share => share.Shares)
                .ThenInclude(share => share.Items).FirstOrDefault();

            if (bill == null)
                throw new HttpNotFound("Cannot find bill.");

            Guid curUserId = GetCurrentUser().Id;
            // check if bill member is requesting the bill
            bool found = bill.Shares.Any(x => x.Payer.Id == curUserId);

            // check ownership
            if (bill.Owner.Id != curUserId && !found)
                throw new HttpBadRequest($"Permission Denied. Cannot view bill that you are not apart of.");

            return bill.ConvertToDto();
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        private List<Share> ConvertToShares(ICollection<ShareDto> shares)
        {
            List<Share> newShares = new List<Share>();
            foreach (var shareDto in shares)
            {
                if (shareDto == null)
                    throw new HttpBadRequest("A share cannot be null");

                //shareDto.Id = Guid.Empty; // deprecated
                shareDto.hasPaid = false;  // done by paying / calling a paying route
                shareDto.hasAccepted = false; // done by calling a route
                shareDto.Total = 0.0;

                User payer = db.Users.Where(x => x.Id == shareDto.PayerId).FirstOrDefault();
                if (payer == null)
                    throw new HttpBadRequest($"Cannot find payer: {shareDto.PayerId}");

                // items cannot be empty
                if (shareDto.Items == null || shareDto.Items.Count <= 0)
                    throw new HttpBadRequest("Missing item from share. Must include at least one item per share.");

                // check items
                List<Item> newItems = new List<Item>();
                foreach (var item in shareDto.Items)
                {
                    if (item.Name == null)
                        item.Name = "";

                    item.Name = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(item.Name.Trim().ToLower());
                    shareDto.Total += item.Price; // summing up the share

                    // convert itemDto to item
                    newItems.Add(new Item
                    {
                        Id = Guid.Empty,
                        Name = item.Name,
                        Price = item.Price
                    });
                }

                newShares.Add(
                    new Share
                    {
                        //Id = shareDto.Id,
                        hasAccepted = shareDto.hasAccepted,
                        hasPaid = shareDto.hasAccepted,
                        Payer = payer,
                        Items = newItems,
                        // round to upper 5 cents
                        // 0.33 -> 0.35
                        // 1.00 -> 1.00
                        Total = Math.Round(Math.Ceiling(newItems.Sum(x => x.Price) / 0.01) * 0.01, 2)
                    }
                );
            }

            return newShares;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        private User GetCurrentUser()
        {
            // Uncomment for production
            //var cookie = CookiesDb.Get(HttpContext.User.Identity.Name);
            //if(cookie == null)
            //throw new HttpBadRequest($"Bad cookie");

            //return db.Users.Where(x => x.Id == cookie.UserId).FirstOrDefault();

            // FOR DEBUG only
            return db.Users.Where(x => x.Email == "bob@dylan.com").FirstOrDefault();
            //return db.Users.Where(x => x.Email == "kendrick@lamar.com").FirstOrDefault();
        }

        [HttpPost]
        public BillDto Create(BillDto billDto)
        {
            User curUser = GetCurrentUser();

            // create new bill
            Bill newBill = new Bill
            {
                Created = DateTime.Now,
                Id = Guid.Empty,
                isSettled = false,
                OverallItems = null,
                Owner = curUser, // current user
                Shares = ConvertToShares(billDto.Shares),
                Title = billDto.Title,
            };

            newBill.Total = Math.Round(newBill.Shares.Sum(x => x.Total), 2);

            db.Bills.Add(newBill);
            db.SaveChanges();

            return newBill.ConvertToDto();
        }

        [HttpPut("{bill_id:Guid}")]
        public BillDto Edit(Guid bill_id, BillDto billDto)
        {
            Bill bill = db.Bills
                .Include(bill => bill.Owner)
                .Include(bill => bill.Shares)
                .ThenInclude(share => share.Payer)
                .Include(d => d.Shares)
                .ThenInclude(share => share.Items).FirstOrDefault();

            if (bill == null)
                throw new HttpBadRequest($"Cannot find payer: {bill_id}");

            User curUser = GetCurrentUser();

            if (bill.Owner.Id != curUser.Id)
                throw new HttpBadRequest($"Permission Denied. Cannot edit bill that is not yours.");

            bill.Title = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(billDto.Title.Trim().ToLower());
            //bill.OverallItems = billDto.OverallItems; //TODO

            // delete old shares
            var oldShares = bill.Shares;
            foreach (var s in oldShares)
            {
                db.Items.RemoveRange(s.Items);
                db.Shares.Remove(s);
            }

            bill.Shares = ConvertToShares(billDto.Shares);
            bill.Total = Math.Round(bill.Shares.Sum(x => x.Total), 2);
            bill.isSettled = bill.Shares.All(x => x.hasPaid) ? true : false;
            db.SaveChanges();

            // todo needs a mapper? or nah?
            return bill.ConvertToDto();
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
            return "TODO";
        }

        [HttpPost("reject/{bill_id:Guid}")]
        public string Reject(Guid bill_id)
        {
            return "TODO";
        }

        [HttpDelete("{bill_id:Guid}")]
        public string Delete(Guid bill_id)
        {
            return "TODO";
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
