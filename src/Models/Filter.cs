using System;
using System.ComponentModel.DataAnnotations;

namespace split_it.Models
{
    public class BillFilter
    {
        public int StartTime { get; set; } = 0;
        public int EndTime { get; set; } = int.MaxValue;
        public Guid BillOwner { get; set; }
        public Guid[] BillMembers { get; set; } = null;
        public int Limit { get; set; } = 10;
        public int Offset { get; set; } = 0;
        public bool isSettled { get; set; } = false;
        public string Title { get; set; } = "";
        public double StartAmount { get; set; } = 0;
        public double EndAmount { get; set; } = 1000; // max 1000 per bill?
    }
}
