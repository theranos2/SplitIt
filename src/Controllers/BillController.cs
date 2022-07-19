using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using split_it.Authentication;
using split_it.Exceptions.Http;
using split_it.Models;
using split_it.Services;

namespace split_it.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class BillController : ControllerBase
    {
        DatabaseContext db;
        NotificationService notificationService;

        public BillController(DatabaseContext _db, NotificationService _notificationService)
        {
            db = _db;
            notificationService = _notificationService;
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
        /// <response code="400">Bad request. When supply share or item</response>
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

            db.Bills.Add(newBill).Reload();
            db.SaveChanges();

            foreach (var share in billDto.Shares)
            {
                notificationService.Add(new Notification
                {
                    UserId = share.PayerId,
                    Domain = "bill",
                    ResourceId = newBill.Id,
                    Message = $"{curUser.FirstName} created bill: {newBill.Title}",
                });
            }

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

            if (bill.Owner.Id != curUser.Id)
                throw new HttpForbidden($"Permission Denied. Cannot edit bill that is not yours.");


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

        /// <summary>Find bills</summary>
        /// <remarks>Use this route to search bills.</remarks>
        [HttpGet]
        public IEnumerable<SimpleBillDto> GetMany([FromQuery] BillFilter filter)
        {
            User curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);

            IQueryable<Bill> query = db.Bills.AsQueryable<Bill>()
                // Show only bills you're a part of
                .Where(bill => bill.Owner.Id == curUser.Id || bill.Shares.Where(share => share.Payer.Id == curUser.Id).Any());

            if (filter.BillOwner != Guid.Empty)
                query = query.Where(x => x.Owner.Id == filter.BillOwner);

            if (filter.BillMembers != null)
                query = query.Where(x => x.Shares.Any(x => filter.BillMembers.Contains(x.Id)));

            return query
                .Where(bill =>
                    bill.Created >= DateTime.UnixEpoch.AddSeconds(filter.StartTime) &&
                    bill.Created <= DateTime.UnixEpoch.AddSeconds(filter.EndTime) &&
                    bill.Total <= filter.MaxAmount &&
                    bill.Total >= filter.MinAmount &&
                    bill.Title.ToLower().Contains(filter.Title.ToLower()) &&
                    bill.isSettled == filter.isSettled)
                .Include(bill => bill.Owner)
                .OrderBy(bill => bill.Created)
                .Skip(filter.Offset)
                .Take(filter.Limit)
                .Select(bill => new SimpleBillDto
                {
                    Id = bill.Id,
                    Created = bill.Created,
                    Owner = new UserInfoDto
                    {
                        Id = bill.Owner.Id,
                        FirstName = bill.Owner.FirstName,
                        LastName = bill.Owner.LastName,
                    },
                    Total = bill.Total,
                    Title = bill.Title,
                    IsSettled = bill.isSettled,
                });
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

            var curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);
            Guid curUserId = curUser.Id;
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

            notificationService.Add(new Notification
            {
                UserId = bill.Owner.Id,
                Domain = "bill",
                ResourceId = bill.Id,
                Message = $"{curUser.FirstName} rejected bill {bill.Title}",
            });

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

            foreach (var share in bill.Shares)
            {
                notificationService.Add(new Notification
                {
                    UserId = share.Payer.Id,
                    Domain = "bill",
                    ResourceId = bill.Id,
                    Message = $"Bill {bill.Title} deleted",
                });
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
