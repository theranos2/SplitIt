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
        public Status Status { get; set; }

        /// <summary>Inferred from sum of items</summary>
        public double Total
        {
            get
            {
                return this.Items.Sum(i => i.Price);
            }
        }

        public UserInfoDto Payer { get; set; }
        public ICollection<DetailedItemDto> Items { get; set; }

        public static DetailedShareDto FromEntity(Share share)
        {
            return new DetailedShareDto
            {
                Id = share.Id,
                Status = share.Status,
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
                IsSettled = bill.IsSettled,
            };
        }
    }

    public class AttachmentDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }

        public static AttachmentDto FromEntity(FileAttachment file)
        {
            return new AttachmentDto
            {
                Id = file.Id,
                Title = file.Title,
            };
        }
    }

    // For output only
    public class DetailedBillDto : SimpleBillDto
    {
        public ICollection<DetailedShareDto> Shares { get; set; }
        public ICollection<AttachmentDto> Attachments { get; set; }

        public static new DetailedBillDto FromEntity(Bill bill)
        {
            return new DetailedBillDto
            {
                Id = bill.Id,
                Created = bill.Created,
                Owner = UserInfoDto.FromEntity(bill.Owner),
                Total = bill.Total,
                Title = bill.Title,
                IsSettled = bill.IsSettled,
                Shares = bill.Shares.Select(DetailedShareDto.FromEntity).ToList(),
                Attachments = bill.Attachments.Select(AttachmentDto.FromEntity).ToList()
            };
        }
    }

    public class SimpleBillInputDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required]
        [MinLength(1)]
        public List<Guid> UserIds { get; set; }

        [Required]
        [Range(1, 1000)]
        public double Total { get; set; }
    }

    public class BillInputDto
    {
        [Required]
        public Guid OwnerId { get; set; }

        /// <summary>Defaults to current time</summary>
        public DateTime Created { get; set; } = DateTime.Now;

        [Required]
        [MaxLength(100)]
        [MinLength(3)]
        public string Title { get; set; }

        [Required]
        [MinLength(1)]
        public ICollection<ShareInputDto> Shares { get; set; }
    }

    public class ShareInputDto
    {
        [Required]
        public Guid PayerId { get; set; }

        [Required]
        public ICollection<ItemInputDto> Items { get; set; }

        /// <summary>Defaults to pending</summary>
        public Status Status { get; set; } = Status.Pending;
    }

    public class ItemInputDto
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

    public class DetailedGroupDto : SimpleGroupDto
    {
        public ICollection<UserInfoDto> Members { get; set; }
        public static new DetailedGroupDto FromEntity(Group group)
        {
            return new DetailedGroupDto
            {
                Id = group.Id,
                Name = group.Name,
                Owner = new UserInfoDto
                {
                    Id = group.Owner.Id,
                    FirstName = group.Owner.FirstName,
                    LastName = group.Owner.LastName
                },
                MemberCount = group.Members.Count,
                Members = group.Members.Select(UserInfoDto.FromEntity).ToList(),
            };
        }
    }
}
