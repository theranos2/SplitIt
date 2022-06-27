using System;
using split_it.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace split_it.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BillController : ControllerBase
    {
        [HttpGet]
        public Guid OG()
        {
			return new Guid();
        }

        [HttpGet("{bill_id:Guid}")]
        public Bill Get(Guid bill_id)
        {
            return new Bill();
        }

        [HttpPost]
        public Bill Post(Bill bill)
        {
            return new Bill();
        }

        [HttpGet("/getmany")]
        public IEnumerable<Bill> GetMany(BillFilter filter)
        {
            List<Bill> bills = new List<Bill>();
            return bills;
        }

        [HttpPost("accept/{bill_id:Guid}")]
        public string Accept(Guid bill_id)
        {
            return "Successful";
        }

        [HttpPost("reject/{bill_id:Guid}")]
        public string Reject(Guid bill_id)
        {
            return "Failed";
        }

        [HttpDelete("{bill_id:Guid}")]
        public string Delete(Guid bill_id)
        {
            return "hello";
        }

        [HttpPut("{bill_id:Guid}")]
        public Bill Edit(Guid bill_id, Bill bill)
        {
            return new Bill();
        }
    }
}
