using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace split_it.Models
{
    // For output only
    public class DetailedShareDto
    {
        public Guid Id { get; set; }
        public bool HasPaid { get; set; } = false;
        public bool HasRejected { get; set; } = false;
        public double Total { get; set; }
        public UserInfoDto Payer { get; set; }
        public ICollection<DetailedItemDto> Items { get; set; }
        public static DetailedShareDto FromEntity(Share share)
        {
            return new DetailedShareDto
            {
                Id = share.Id,
                HasPaid = share.hasPaid,
                HasRejected = share.hasRejected,
                Total = share.Total,
                Payer = UserInfoDto.FromEntity(share.Payer),
                Items = share.Items.Select(DetailedItemDto.FromEntity).ToList(),
            };
        }
    }

    // for output only
    public class DetailedItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public static DetailedItemDto FromEntity(Item item)
        {
            return new DetailedItemDto
            {
                Id = item.Id,
                Name = item.Name,
                Price = item.Price,
            };
        }
    }

    // For output only
    public class SimpleBillDto
    {
        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public UserInfoDto Owner { get; set; }
        public double Total { get; set; }
        public string Title { get; set; }
        public bool IsSettled { get; set; }
        public static SimpleBillDto FromEntity(Bill bill)
        {
            return new SimpleBillDto
            {
                Id = bill.Id,
                Created = bill.Created,
                Owner = UserInfoDto.FromEntity(bill.Owner),
                Total = bill.Total,
                Title = bill.Title,
                IsSettled = bill.isSettled,
            };
        }
    }

    // For output only
    public class DetailedBillDto : SimpleBillDto
    {
        public ICollection<DetailedShareDto> Shares { get; set; }
        public ICollection<DetailedItemDto> OverallItems { get; set; }
        public static new DetailedBillDto FromEntity(Bill bill)
        {
            return new DetailedBillDto
            {
                Id = bill.Id,
                Created = bill.Created,
                Owner = UserInfoDto.FromEntity(bill.Owner),
                Total = bill.Total,
                Title = bill.Title,
                IsSettled = bill.isSettled,
                Shares = bill.Shares.Select(DetailedShareDto.FromEntity).ToList(),
                OverallItems = bill.OverallItems.Select(DetailedItemDto.FromEntity).ToList()
            };
        }
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

    public class SimpleGroupDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public UserInfoDto Owner { get; set; }
        public int MemberCount { get; set; }

        public static SimpleGroupDto FromEntity(Group group)
        {
            return new SimpleGroupDto
            {
                Id = group.Id,
                Name = group.Name,
                Owner = new UserInfoDto
                {
                    Id = group.Owner.Id,
                    FirstName = group.Owner.FirstName,
                    LastName = group.Owner.LastName
                },
                MemberCount = group.Members.Count
            };
        }
    }

    public class DetailGroupDto : SimpleGroupDto
    {
        public ICollection<UserInfoDto> Members { get; set; }
    }
}
