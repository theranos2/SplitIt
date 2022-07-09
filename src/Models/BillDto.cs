using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace split_it.Models
{
    public class BillDto
    {
        public Guid Id { get; set; }

        public DateTime Created { get; set; }

        public Guid OwnerId { get; set; }

        public double Total { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public ICollection<ShareDto> Shares { get; set; }

        public ICollection<ItemDto> OverallItems { get; set; } // derived from where?

        public bool isSettled { get; set; }
    }

    public class ShareDto
    {
        //public Guid Id { get; set; } // do we need share id?
        public bool hasPaid { get; set; } = false;

        public bool hasAccepted { get; set; } = false;

        public double Total { get; set; }

        [Required]
        public Guid PayerId { get; set; }

        [Required]
        public ICollection<ItemDto> Items { get; set; }
    }

    public class ItemDto
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        [Range(0.05, 1000)]
        public double Price { get; set; }
    }
}