using System;
using Microsoft.AspNetCore.Mvc;

namespace split_it.Models
{
    public class BillFilter
    {
        [FromQuery]
        public int StartTime { get; set; } = 0;
        [FromQuery]
        public int EndTime { get; set; } = int.MaxValue;
        [FromQuery]
        public Guid BillOwner { get; set; }
        [FromQuery]
        public Guid[] BillMembers { get; set; } = null;
        [FromQuery]
        public int Limit { get; set; } = 10;
        [FromQuery]
        public int Offset { get; set; } = 0;
        [FromQuery]
        public bool IsSettled { get; set; } = false;
        [FromQuery]
        public string Title { get; set; } = "";
        [FromQuery]
        public double MinAmount { get; set; } = 0;
        [FromQuery]
        public double MaxAmount { get; set; } = 1000; // max 1000 per bill?
    }
}
