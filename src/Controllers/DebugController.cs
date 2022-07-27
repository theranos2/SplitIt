using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using split_it.Models;

namespace split_it.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DebugController : ControllerBase
    {
        DatabaseContext db;

        public DebugController(DatabaseContext _db)
        {
            db = _db;
        }

        ////////////////////////
        ////DEBUGING METHODS////
        ////////////////////////

        // Example how to return nested objects
        [HttpGet("bills")]
        public IEnumerable<Bill> Getslosts()
        {
            return db.Bills
                .Include(bill => bill.Owner)
                .Include(bill => bill.Shares)
                .ThenInclude(share => share.Payer)
                .Include(d => d.Shares)
                .ThenInclude(share => share.Items).ToList();
        }

        [HttpGet("users")]
        public IEnumerable<User> GetUsers()
        {
            return db.Users.ToList();
        }

        [HttpGet("notifications")]
        public List<Notification> AllNotifications()
        {
            return db.Notifications.ToList();
        }

    }
}
