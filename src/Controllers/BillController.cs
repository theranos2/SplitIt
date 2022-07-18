using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
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

        [ApiExplorerSettings(IgnoreApi = true)]
        private List<Share> ConvertToShares(ICollection<ShareDto> shares)
        {
            List<Share> newShares = new List<Share>();
            foreach (var shareDto in shares)
            {
                if (shareDto == null)
                    throw new HttpBadRequest("A share cannot be null");

                //TODO
                // owner can modify, owner can specify if they have paid or not.!
                //shareDto.hasPaid = false;  // done by paying / calling a paying route
                //shareDto.hasRejected = false; // everytime the owner updates or edit the bill it will resend to those who have rejected 
                shareDto.Total = 0.0;

                User payer = db.Users.Where(x => x.Id == shareDto.PayerId).FirstOrDefault();
                if (payer == null)
                    throw new HttpNotFound($"Cannot find payer: {shareDto.PayerId}");

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
                        hasRejected = shareDto.hasRejected,
                        hasPaid = shareDto.hasPaid,
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

        /// <summary>Get Bill</summary>
        /// <remarks>Use this route to get a bill. Pass in bill guid</remarks>
        /// <response code="403">Permission denied. Only the members of the bill can view the bill.</response>
        /// <response code="404">Not found. When the supplied bill guid is not found.</response>
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
                throw new HttpNotFound($"Cannot find bill: {bill_id}");


            Guid curUserId = IdentityTools.GetUser(db, HttpContext.User.Identity).Id; // check if bill member is requesting the bill
            bool found = bill.Shares.Any(x => x.Payer.Id == curUserId);

            // check ownership
            if (bill.Owner.Id != curUserId && !found)
                throw new HttpForbiddenRequest($"Permission Denied. Cannot view bill that you are not apart of.");

            return bill.ConvertToDto();
        }

        /// <summary>Create Bill</summary>
        /// <remarks>Use this route to create a bill.</remarks>
        /// <response code="404">Not found. When the supplied user guid is not found.</response>
        /// <response code="400">Bad request. When not supply share or item</response>
        [HttpPost]
        public BillDto Create(BillDto billDto)
        {
            User curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);

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

        /// <summary>Create Bill Simple</summary>
        /// <remarks>Use this route to create a bill.</remarks>
        /// <response code="404">Not found. When the supplied user guid is not found.</response>
        [HttpPost("simple")]
        public BillDto CreateSimple(BillSimpleDtoIn billDto)
        {
            User curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);

            billDto.UserIds.Add(curUser.Id); // add owner too
            billDto.UserIds = billDto.UserIds.Distinct().ToList(); // remove duplicates
            foreach (var userId in billDto.UserIds)
            {
                User user = db.Users.Where(x => x.Id == userId).FirstOrDefault();
                if (user == null)
                    throw new HttpNotFound($"Cannot find user: {user.Id}");
            }

            // equal share  
            double eachAmount = billDto.Amount / billDto.UserIds.Count();
            // round see share round in bill create
            eachAmount = Math.Round(Math.Ceiling(eachAmount / 0.01) * 0.01, 2);

            List<Share> shares = new List<Share>();
            foreach (var userId in billDto.UserIds)
            {
                shares.Add(
                    new Share
                    {
                        hasPaid = (userId == curUser.Id) ? true : false,
                        hasRejected = false,
                        Id = Guid.Empty,
                        Items = new List<Item> {
                            new Item{
                                Id = Guid.Empty,
                                Name = "",
                                Price = eachAmount
                            }
                        },
                        Payer = db.Users.Where(x => x.Id == userId).FirstOrDefault(),
                        Total = eachAmount
                    }
                );

            }

            // create new bill
            Bill newBill = new Bill
            {
                Created = DateTime.Now,
                Id = Guid.Empty,
                isSettled = false,
                OverallItems = null,
                Owner = curUser,
                Shares = shares,
                Title = billDto.Title,
            };

            newBill.Total = Math.Round(newBill.Shares.Sum(x => x.Total), 2);

            db.Bills.Add(newBill);
            db.SaveChanges();

            return newBill.ConvertToDto();
        }

        /// <summary>Edit a bill</summary>
        /// <remarks>Use this route to edit a bill. Quite similar to the create bill. To edit just do the same.</remarks>
        /// <response code="404">Not found. When the supplied user guid is not found.</response>
        /// <response code="400">Bad request. When supply share or item</response>
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
                throw new HttpNotFound($"Cannot find payer: {bill_id}");

            User curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);

            if (bill.Owner.Id != curUser.Id)
                throw new HttpForbiddenRequest($"Permission Denied. Cannot edit bill that is not yours.");

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

        /// <summary>Edit a bill</summary>
        /// <remarks>Use this route to edit a bill. Quite similar to the create bill. To edit just do the same.</remarks>
        /// <response code="404">Not found. When the supplied user guid is not found.</response>
        /// <response code="400">Bad request. When supply share or item</response>
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

        [HttpPost("reject/{bill_id:Guid}")]
        public string Reject(Guid bill_id)
        {
            // check if bill exists
            Bill bill = db.Bills
                .Include(bill => bill.Owner)
                .Include(bill => bill.Shares)
                .ThenInclude(share => share.Payer)
                .Include(d => d.Shares)
                .ThenInclude(share => share.Items).FirstOrDefault();

            if (bill == null)
                throw new HttpNotFound($"Cannot find payer: {bill_id}");

            Guid curUserId = IdentityTools.GetUser(db, HttpContext.User.Identity).Id; // check if bill member is requesting the bill
            bool found = bill.Shares.Any(x => x.Payer.Id == curUserId);

            // check ownership
            if (bill.Owner.Id != curUserId && !found)
                throw new HttpForbiddenRequest($"Permission Denied. Cannot reject bill that you are not apart of.");

            // check if paid
            if (bill.isSettled)
                throw new HttpBadRequest($". Cannot reject bill that has been settled.");

            // logic
            // if user rejects the bill, they will show as hasRejected
            foreach (Share share in bill.Shares.Where(x => x.Payer.Id == curUserId))
            {
                share.hasRejected = true;
            }

            return "Success";

        }

        [HttpDelete("{bill_id:Guid}")]
        public string Delete(Guid bill_id)
        {
            Bill bill = db.Bills
                .Include(bill => bill.Owner)
                .Include(bill => bill.Shares)
                .ThenInclude(share => share.Payer)
                .Include(d => d.Shares)
                .ThenInclude(share => share.Items).FirstOrDefault();

            if (bill == null)
                throw new HttpBadRequest($"Cannot find payer: {bill_id}");

            Guid curUserId = IdentityTools.GetUser(db, HttpContext.User.Identity).Id; // check if bill member is requesting the bill
            bool found = bill.Shares.Any(x => x.Payer.Id == curUserId);

            // check ownership
            if (bill.Owner.Id != curUserId && !found)
                throw new HttpForbiddenRequest($"Permission Denied. Cannot reject bill that you are not apart of.");

            foreach (Share share in bill.Shares)
            {
                foreach (Item item in share.Items)
                    db.Items.Remove(item);

                db.Shares.Remove(share);
            }

            db.Bills.Remove(bill);

            return "Success";
        }

        [HttpPost("attachment/{bill_id:Guid}")]
        public string AddAttachment(Guid bill_id)
        {
            return "TODO";
        }

        [HttpGet("/api/file/{file_name}")]
        public string GetFile(string file_name)
        {
            return "TODO";
        }
    }
}
