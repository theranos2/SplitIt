using System;

namespace split_it.Models
{
    public class BillFilter
    {
        public int StartTime { get; set; }
        public int EndTime { get; set; }
        public Guid BillOwner { get; set; }
        public Guid[] BillMembers { get; set; }
        public int Limit { get; set; }
        public bool isSettled { get; set; }
        public string Title { get; set; }
        public double StartAmount { get; set; }
        public double EndAmount { get; set; }
    }
}
