using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace split_it.Models
{
    // For output only
    public class SimpleBillDto
    {
        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public UserInfoDto Owner { get; set; }
        public double Total { get; set; }
        public string Title { get; set; }
        public bool IsSettled { get; set; }
    }

    // For output only
    public class DetailedBillDto : SimpleBillDto
    {
        public ICollection<ShareDto> Shares { get; set; }
        public ICollection<ItemDto> OverallItems { get; set; }
    }
    public class BillSimpleDtoIn
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required]
        [MinLength(1)]
        public List<Guid> UserIds { get; set; }

        [Required]
        [Range(1, 1000)]
        public double Amount { get; set; }
    }

    public class BillDto
    {
        public Guid Id { get; set; }

        public DateTime Created { get; set; }

        public Guid OwnerId { get; set; }

        public double Total { get; set; }

        [Required]
        [MaxLength(100)]
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

        public bool hasRejected { get; set; } = false;

        public double Total { get; set; }

        [Required]
        public Guid PayerId { get; set; }

        [Required]
        public ICollection<ItemDto> Items { get; set; }

        // Anonymous User
        public string Email { get; set; }
        public string Name { get; set; }
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

    public class GroupDto
    {

        public Guid Id { get; set; }
        public Guid OwnerId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public ICollection<Guid> MemberIds { get; set; }
    }
}
