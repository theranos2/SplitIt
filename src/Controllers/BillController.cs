using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using split_it.Authentication;
using split_it.Exceptions.Http;
using split_it.Models;
using split_it.Services;
using Stripe;

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

        private List<Share> ConvertToShares(ICollection<ShareInputDto> shares)
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
                    if (string.IsNullOrEmpty(item.Name))
                        throw new HttpBadRequest("Item name cannot be empty");

                    item.Name = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(item.Name.Trim().ToLower());

                    // convert itemDto to item
                    newItems.Add(new Item
                    {
                        Name = item.Name,
                        Price = item.Price
                    });
                }

                newShares.Add(
                    new Share
                    {
                        Payer = payer,
                        Items = newItems,
                        Status = shareDto.Status,
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
        public DetailedBillDto Get(Guid bill_id)
        {
            Bill bill = db.Bills.Where(x => x.Id == bill_id)
                .Include(bill => bill.Owner)
                .Include(bill => bill.Shares).ThenInclude(share => share.Payer)
                .Include(bill => bill.Shares).ThenInclude(share => share.Items)
                .Include(bill => bill.Attachments)
                .FirstOrDefault();

            if (bill == null)
                throw new HttpNotFound($"Cannot find bill: {bill_id}");


            Guid curUserId = IdentityTools.GetUser(db, HttpContext.User.Identity).Id; // check if bill member is requesting the bill
            bool isMember = bill.Shares.Any(share => share.Payer.Id == curUserId);

            // check ownership
            if (bill.Owner.Id != curUserId && !isMember)
                throw new HttpForbiddenRequest($"Permission Denied. Cannot view bill that you are not apart of.");


            return DetailedBillDto.FromEntity(bill);
        }

        /// <summary>Create Bill</summary>
        /// <remarks>Use this route to create a bill.</remarks>
        /// <response code="404">Not found. When the supplied user guid is not found.</response>
        /// <response code="400">Bad request. When not supply share or item</response>
        [HttpPost]
        public DetailedBillDto Create(BillInputDto billDto)
        {
            User curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);

            // create new bill
            Bill newBill = new Bill
            {
                Created = billDto.Created,
                Owner = curUser,
                Title = billDto.Title,
                Shares = ConvertToShares(billDto.Shares),
            };

            newBill.IsSettled = newBill.Shares.All(x => x.Status == Status.Paid);

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

            return DetailedBillDto.FromEntity(newBill);
        }

        /// <summary>Create Bill Simple</summary>
        /// <remarks>Use this route to create a simple bill.</remarks>
        /// <response code="404">Not found. When the supplied user guid is not found.</response>
        [HttpPost("simple")]
        public DetailedBillDto CreateSimple(SimpleBillInputDto billDto)
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
            double eachAmount = billDto.Total / billDto.UserIds.Count();
            // round to the upper 1 cent
            eachAmount = Math.Round(Math.Ceiling(eachAmount / 0.01) * 0.01, 2);

            List<Share> shares = new List<Share>();
            foreach (var userId in billDto.UserIds)
            {
                shares.Add(
                    new Share
                    {
                        Id = Guid.Empty,
                        Items = new List<Item> {
                            new Item{
                                Name = "Total amount",
                                Price = eachAmount
                            }
                        },
                        Payer = db.Users.Where(x => x.Id == userId).FirstOrDefault(),
                        Status = userId == curUser.Id ? Status.Paid : Status.Pending,
                    }
                );

            }

            // create new bill
            Bill newBill = new Bill
            {
                Id = Guid.Empty,
                Created = DateTime.Now,
                IsSettled = false,
                Owner = curUser,
                Shares = shares,
                Title = billDto.Title,
            };

            newBill.IsSettled = newBill.Shares.All(x => x.Status == Status.Paid);
            db.Bills.Add(newBill);
            db.SaveChanges();

            return DetailedBillDto.FromEntity(newBill);
        }

        /// <summary>Edit a bill</summary>
        /// <remarks>Use this route to edit a bill. Quite similar to the create bill. To edit just do the same.</remarks>
        /// <response code="404">Not found. When the supplied user guid is not found.</response>
        /// <response code="400">Bad request. When supply share or item</response>
        [HttpPut("{bill_id:Guid}")]
        public DetailedBillDto Edit(Guid bill_id, BillInputDto billDto)
        {
            Bill bill = db.Bills
                .Include(bill => bill.Owner)
                .Include(bill => bill.Shares)
                .ThenInclude(share => share.Payer)
                .Include(d => d.Shares)
                .ThenInclude(share => share.Items)
                .Include(bill => bill.Attachments)
                .FirstOrDefault();

            if (bill == null)
                throw new HttpNotFound($"Cannot find bill: {bill_id}");

            User curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);

            if (bill.Owner.Id != curUser.Id)
                throw new HttpForbiddenRequest("Cannot edit bill that is not yours.");

            bill.Title = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(billDto.Title.Trim().ToLower());

            // delete old shares
            var oldShares = bill.Shares;
            foreach (var s in oldShares)
            {
                db.Items.RemoveRange(s.Items);
                db.Shares.Remove(s);
            }

            bill.Shares = ConvertToShares(billDto.Shares);
            bill.IsSettled = bill.Shares.All(share => share.Status == Status.Paid);
            db.SaveChanges();

            return DetailedBillDto.FromEntity(bill);
        }

        /// <summary>Find bills</summary>
        /// <remarks>Use this route to search bills.</remarks>
        [HttpGet]
        public IEnumerable<SimpleBillDto> GetMany([FromQuery] BillFilter filter)
        {
            // TODO unauthorise people from accessing bills that aren't theirs
            User curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);

            IQueryable<Bill> query = db.Bills.AsQueryable<Bill>()
                // Show only bills you're a part of
                .Where(bill => bill.Owner.Id == curUser.Id || bill.Shares.Where(share => share.Payer.Id == curUser.Id).Any());

            if (filter.BillOwner != Guid.Empty)
                query = query.Where(x => x.Owner.Id == filter.BillOwner);

            if (filter.BillMembers != null)
                query = query.Where(x => x.Shares.Any(x => filter.BillMembers.Contains(x.Id)));

            return query
                .Include(bill => bill.Owner)
                .Include(bill => bill.Shares)
                .ThenInclude(share => share.Items)
                .Where(bill =>
                    bill.Created >= DateTime.UnixEpoch.AddSeconds(filter.StartTime) &&
                    bill.Created <= DateTime.UnixEpoch.AddSeconds(filter.EndTime) &&
                    bill.Shares.Sum(share => share.Items.Sum(item => item.Price)) <= filter.MaxAmount &&
                    bill.Shares.Sum(share => share.Items.Sum(item => item.Price)) >= filter.MinAmount &&
                    bill.Title.ToLower().Contains(filter.Title.ToLower()) &&
                    bill.IsSettled == filter.IsSettled)
                .OrderBy(bill => bill.Created)
                .Skip(filter.Offset)
                .Take(filter.Limit)
                .Select(SimpleBillDto.FromEntity);
        }

        private enum ResponseAction
        {
            Accept,
            Reject
        }

        /// <summary>Abstraction of bill accept and reject action</summary>
        private void BillResponse(Guid billId, ResponseAction action)
        {
            // check if bill exists
            Bill bill = db.Bills
                .Include(bill => bill.Owner)
                .Include(bill => bill.Shares)
                .ThenInclude(share => share.Payer)
                .Include(d => d.Shares)
                .ThenInclude(share => share.Items).FirstOrDefault();
            if (bill == null)
                throw new HttpNotFound($"Cannot find bill: {billId}");

            var curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);
            Guid curUserId = curUser.Id;
            bool found = bill.Shares.Any(x => x.Payer.Id == curUserId);

            var actionString = action == ResponseAction.Accept ? "accept" : "reject";

            // check ownership
            if (bill.Owner.Id != curUserId && !found)
                throw new HttpForbiddenRequest($"Permission Denied. Cannot {actionString} bill that you are not apart of.");

            // check if paid
            if (bill.IsSettled)
                throw new HttpBadRequest($"Cannot {actionString} bill that has been settled.");

            if (action == ResponseAction.Accept && bill.Shares.Any(s => s.Payer.Id == curUserId && s.Status == Status.Rejected))
                throw new HttpBadRequest("Cannot accept a bill that has been rejected");

            foreach (Share share in bill.Shares.Where(x => x.Payer.Id == curUserId))
            {
                share.Status = action == ResponseAction.Accept
                    ? Status.Accepted
                    : Status.Rejected;
            }

            var notifAction = action == ResponseAction.Accept ? "accepted" : "rejected";
            notificationService.Add(new Notification
            {
                UserId = bill.Owner.Id,
                Domain = "bill",
                ResourceId = bill.Id,
                Message = $"{curUser.FirstName} {notifAction} bill {bill.Title}",
            });
        }

        /// <response code="204">Bill rejected</response>
        /// <response code="404">Bill ID given not found</response>
        /// <response code="400">Rejecting a bill that has been settled</response>
        /// <response code="403">Rejecting a bill you are not a part of</response>

        [HttpPost("{bill_id:Guid}/reject")]
        public IActionResult Reject(Guid bill_id)
        {
            BillResponse(bill_id, ResponseAction.Reject);
            return NoContent();
        }

        /// <response code="204">Bill accepted</response>
        /// <response code="404">Bill ID given not found</response>
        /// <response code="400">Accepting a bill that has been settled or was previously rejected</response>
        /// <response code="403">Accepting a bill you are not a part of</response>

        [HttpPost("{bill_id:Guid}/accept")]
        public IActionResult Accept(Guid bill_id)
        {
            BillResponse(bill_id, ResponseAction.Accept);
            return NoContent();
        }

        /// <summary>Re-invite user to the bill if they rejected it</summary>
        /// <response code="404">Bill or User not found</response>
        /// <response code="403">Reinvite user to bill you do not own</response>
        /// <response code="400">Reinviting user who is not in bill or user has not rejected the bill</response>
        [HttpPost("{BillId:Guid}/reinvite/{UserId:Guid}")]
        public IActionResult Reinvite(Guid BillId, Guid UserId)
        {
            var bill = db.Bills.Where(bill => bill.Id == BillId).FirstOrDefault();
            if (bill == null)
                throw new HttpNotFound($"Bill ID: {BillId} not found");

            var owner = IdentityTools.GetUser(db, HttpContext.User.Identity);
            if (owner == null || owner.Id != bill.Owner.Id)
                throw new HttpForbidden("Cannot reinvite user to bill you do not own");

            var user = db.Users.Where(user => user.Id == UserId).FirstOrDefault();
            if (user == null)
                throw new HttpNotFound($"User ID: {UserId} not found");

            var billShare = bill.Shares.Where(share => share.Payer.Id == user.Id).FirstOrDefault();
            if (billShare == null)
                throw new HttpBadRequest("Cannot reinvite user who is not in bill");

            if (billShare.Status != Status.Rejected)
                throw new HttpBadRequest("The user has not rejected the bill");

            billShare.Status = Status.Pending;

            return NoContent();
        }

        [HttpDelete("{bill_id:Guid}")]
        public IActionResult Delete(Guid bill_id)
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
                throw new HttpForbiddenRequest($"Permission Denied. Cannot delete bill that you are not apart of.");

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
            return NoContent();
        }

        [HttpGet("{BillId:Guid}/attachment/{AttachmentId:Guid}")]
        public IActionResult GetAttachment(Guid BillId, Guid AttachmentId)
        {
            var curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);

            var bill = db.Bills
                .Where(bill => bill.Id == BillId &&
                    (bill.Owner.Id == curUser.Id || bill.Shares.Any(share => share.Payer.Id == curUser.Id))
                )
                .Include(bill => bill.Attachments)
                .FirstOrDefault();
            if (bill == null)
                throw new HttpNotFound("Bill not found");

            var attachment = bill.Attachments?.Where(attachment => attachment.Id == AttachmentId).FirstOrDefault();
            if (attachment == null)
                throw new HttpNotFound("Attachment not found");

            return File(attachment.Content, attachment.ContentType);
        }

        [HttpPost("{BillId:Guid}/attachment")]
        public IActionResult AddAttachment(Guid BillId, [FromForm] FileUploadDto input)
        {
            var bill = db.Bills.Where(bill => bill.Id == BillId).FirstOrDefault();
            if (bill == null)
                throw new HttpNotFound("Bill not found");

            var user = IdentityTools.GetUser(db, HttpContext.User.Identity);
            if (user == null || user.Id != bill.Owner.Id)
                throw new HttpForbidden("Cannot add file to bill you do not own");

            using var content = new MemoryStream();
            input.File.CopyTo(content);
            var attachment = new FileAttachment
            {
                Caption = string.IsNullOrEmpty(input.Caption) ? input.File.FileName : input.Caption,
                ContentType = input.File.ContentType,
                Content = content.ToArray()
            };

            bill.Attachments.Add(attachment);
            db.SaveChanges();

            return Ok(new { Id = attachment.Id, Caption = attachment.Caption });
        }



        /// <summary>If the user has the bill id they can join it. This makes sharing by link and QR possible</summary>
        [HttpPost("{bill_id:Guid}/join")]
        public IActionResult Join(Guid bill_id)
        {
            User curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);

            var bill = db.Bills.Where(x => x.Id == bill_id).FirstOrDefault();
            if (bill == null)
                throw new HttpNotFound($"Bill {bill_id} not found.");

            bill.Shares.Add(new Share
            {
                Id = Guid.Empty,
                Payer = curUser,
                Status = Status.Accepted,
                Items = new List<Item>{ // add default item
                    new Item {
                        Id = Guid.Empty,
                        Name = "",
                        Price = 1.00
                    }
                }
            });

        [HttpDelete("{BillId:Guid}/attachment/{AttachmentId:Guid}")]
        public IActionResult DeleteAttachment(Guid BillId, Guid AttachmentId)
        {
            var bill = db.Bills.Where(bill => bill.Id == BillId).FirstOrDefault();
            if (bill == null)
                throw new HttpNotFound("Bill not found");

            var user = IdentityTools.GetUser(db, HttpContext.User.Identity);
            if (user == null || user.Id != bill.Owner.Id)
                throw new HttpForbidden("Cannot remove file from bill you do not own");

            bill.Attachments = bill.Attachments.Where(attachment => attachment.Id != AttachmentId).ToList();
            db.SaveChanges();


            return NoContent();
        }


        private PaymentIntent CreatePaymentIntent(string sellerCustomerId, double appSurcharge, double grandTotal, string intentId = null)
        {
            var intentOptions = new PaymentIntentCreateOptions
            {
                Amount = (int)(grandTotal * 100),
                Currency = "aud",
                PaymentMethodTypes = new List<string> {
                    "card",
                },
                ApplicationFeeAmount = (int)(appSurcharge * 100)
            };

            // link bill owner account to payment
            var requestOptions = new RequestOptions();
            requestOptions.StripeAccount = sellerCustomerId;

        createIntent: // yarrrrr
            if (intentId == null)
            {
                var service = new PaymentIntentService();
                try
                {
                    return service.Create(intentOptions, requestOptions);
                }
                catch (StripeException e)
                {
                    Console.WriteLine(e.Message);
                    throw new HttpInternalServerError("Sumting wong wit stripe");
                }
            }
            else
            {
                var service = new PaymentIntentService();
                try
                {
                    var intentUpdateOptions = new PaymentIntentUpdateOptions()
                    {
                        Amount = intentOptions.Amount,
                        Currency = intentOptions.Currency,
                        PaymentMethodTypes = intentOptions.PaymentMethodTypes,
                        ApplicationFeeAmount = intentOptions.ApplicationFeeAmount
                    };
                    return service.Update(intentId, intentUpdateOptions, requestOptions);
                }
                catch (StripeException e)
                {
                    Console.WriteLine(e.Message);
                    intentId = null;
                    goto createIntent;
                }
            }
        }

        // view payment status
        [HttpGet("{bill_id:Guid}/pay")]
        public PayDto ViewPay(Guid bill_id)
        {
            Bill bill = db.Bills.Where(x => x.Id == bill_id)
                .Include(bill => bill.Owner)
                .Include(bill => bill.Shares).ThenInclude(share => share.Payer)
                .Include(bill => bill.Shares).ThenInclude(share => share.Items)
                .FirstOrDefault();

            if (bill == null)
                throw new HttpNotFound($"Cannot find bill: {bill_id}");

            Guid curUserId = IdentityTools.GetUser(db, HttpContext.User.Identity).Id; // check if bill member is requesting the bill
            bool isMember = bill.Shares.Any(share => share.Payer.Id == curUserId);

            // check ownership
            if (bill.Owner.Id != curUserId && !isMember)
                throw new HttpForbiddenRequest($"Permission Denied. Cannot view bill that you are not apart of.");

            // get total amount owed by current user in this bill
            double totalBillAmount = bill.Shares.Where(x => x.Payer.Id == curUserId).Sum(x => x.Total);
            totalBillAmount = Math.Round(Math.Ceiling(totalBillAmount / 0.01) * 0.01, 2); // round to the upper bound smallest cent

            // calculate stripe's surcharge
            double stripeSurcharge = GetStripeFee(totalBillAmount);

            // calculate our program's surcharge
            double splititSurcharge = GetSplitItFee(totalBillAmount);

            // total surcharge 
            double totalSurcharge = stripeSurcharge + splititSurcharge;

            // grand total
            double grandTotal = totalBillAmount + totalSurcharge;

            // check if owner has set up his bank details
            var bankDetails = db.BankDetails.Where(x => x.Owner.Id == bill.Owner.Id).FirstOrDefault();
            if (bankDetails == null || bankDetails.StripeCustomerId == null)
                throw new HttpNotFound("Bill owner has setup their bank details yet. Please tell your bill owner to setup their bank details to pay them.");

            string billOwnerStripeId = bankDetails.StripeCustomerId;

            // check if previous payment requested
            // if null then we create new intent
            // if existing we update
            string intentId = bill.Shares.Where(x => x.Payer.Id == curUserId).FirstOrDefault().StripePaymentId;
            var paymentIntent = CreatePaymentIntent(billOwnerStripeId, stripeSurcharge, grandTotal, intentId);

            // update our shares with payment intent id
            foreach (Share share in bill.Shares.Where(x => x.Payer.Id == curUserId))
            {
                share.StripePaymentId = paymentIntent.Id;
            }
            db.SaveChanges();

            return new PayDto
            {
                BillTotal = totalBillAmount,
                SurchargeTotal = totalSurcharge,
                ClientSecret = paymentIntent.ClientSecret,
                SellerId = billOwnerStripeId,
                hasPaid = false,
            };
        }

        private double GetSplitItFee(double amount)
        {
            const double SPLIT_IT_RATE = 1.00;
            return Math.Round(((amount * SPLIT_IT_RATE) / 100), 2);
        }

        private double GetStripeFee(double amount)
        {
            const double STRIPE_RATE = 1.75; // 1.75%. This is worse than the Mafia skimming the casino.
            const double STRIPE_CHARGE_PER_TRANSACTATION = 0.30; // 30 cents per transact
            return Math.Round(((amount * STRIPE_RATE) / 100) + STRIPE_CHARGE_PER_TRANSACTATION, 2);
        }

        [HttpPost("{bill_id:Guid}/pay")]
        public PayReceiptDto Pay(Guid bill_id)
        {
            // invokes a payment panel
            // throws error if paid
            throw new NotImplementedException();
        }

        /// <summary>Get many comments from a bill</summary>
        [HttpGet("{BillId:Guid}/comments")]
        public List<CommentDto> GetManyComments(
            Guid BillId,
            [FromQuery(Name = "sortBy")] CommentSort sortBy = CommentSort.DATE_DESC,
            [FromQuery(Name = "take")] int take = 10,
            [FromQuery(Name = "skip")] int skip = 0,
            [FromQuery(Name = "content")] string content = ""
        )
        {
            var user = IdentityTools.GetUser(db, HttpContext.User.Identity);
            var qb = db.Bills
                .Where(bill =>
                    (bill.Owner.Id == user.Id || bill.Shares.Any(share => share.Payer.Id == user.Id))
                    && bill.Id == BillId
                )
                .Include(bill => bill.Comments)
                .SelectMany(bill => bill.Comments);

            if (!string.IsNullOrEmpty(content))
                qb = qb.Where(comment => comment.Content.ToLower().Contains(content.ToLower()));

            if (sortBy == CommentSort.DATE_ASC)
                qb = qb.OrderBy(comment => comment.CreatedAt);
            else
                qb = qb.OrderByDescending(comment => comment.CreatedAt);

            return qb
                .Skip(skip)
                .Take(take)
                .Select(CommentDto.FromEntity)
                .ToList();
        }

        /// <summary>Get one comment from a bill</summary>
        [HttpGet("{BillId:Guid}/comments/{CommentId:Guid}")]
        public CommentDto GetOneComment(Guid BillId, Guid CommentId)
        {
            var user = IdentityTools.GetUser(db, HttpContext.User.Identity);
            var comment = db.Bills
                .Where(bill =>
                    (bill.Owner.Id == user.Id || bill.Shares.Any(share => share.Payer.Id == user.Id))
                    && bill.Id == BillId
                )
                .Include(bill => bill.Comments)
                .SelectMany(bill => bill.Comments)
                .Where(c => c.Id == CommentId)
                .Select(CommentDto.FromEntity)
                .FirstOrDefault();
            if (comment == null)
                throw new HttpNotFound($"Comment with ID: {CommentId} not found");
            return comment;
        }

        /// <summary>Create a comment on a bill</summary>
        [HttpPost("{BillId:Guid}/comments")]
        public CommentDto CreateOneComment(Guid BillId, [FromBody] CommentInputDto input)
        {
            var user = IdentityTools.GetUser(db, HttpContext.User.Identity);
            var bill = db.Bills.Where(bill =>
                (bill.Owner.Id == user.Id || bill.Shares.Any(share => share.Payer.Id == user.Id))
                && bill.Id == BillId
            ).FirstOrDefault();
            if (bill == null)
                throw new HttpBadRequest($"Bill requested not found or you are not part of it");

            var comment = new Comment
            {
                Commenter = user,
                Content = input.Content,
            };
            bill.Comments.Add(comment);
            db.SaveChanges();

            return CommentDto.FromEntity(comment);
        }


    }
}
