using System;
using System.Collections.Generic;
using split_it;

namespace seeder
{
    public class BillSeeder
    {
        public static List<Bill> Data = new List<Bill>
        {
            new Bill
            {
                Id = Guid.NewGuid(),
                Owner = UserSeeder.Data[0],
                Title = "Something",
                Total = 6.9,
                Shares = new List<Share>
                {
                    new Share
                    {
                        Total = 3,
                        Payer = UserSeeder.Data[1],
                        Items = new List<Item>{
                            new Item
                            {
                                Name = "Popcorn",
                                Price = 3
                            },
                        },
                        hasPaid = false,
                        hasRejected = false,
                    },
                    new Share
                    {
                        Total = 3.9,
                        Payer = UserSeeder.Data[0],
                        Items = new List<Item>{
                            new Item
                            {
                                Name = "Popcorn",
                                Price = 3
                            },
                            new Item
                            {
                                Name = "Asshat tax",
                                Price = 0.9
                            }
                        }
                    }
                },
                Created = DateTime.Now,
                isSettled = false,
                OverallItems = new List<Item>
                {
                    new Item
                    {
                        Name = "Popcorn",
                        Price = 6
                    },
                    new Item
                    {
                        Name = "Asshat tax",
                        Price = 0.9
                    }
                },
            }
        };

        public static void Seed(DatabaseContext ctx)
        {
            ctx.Bills.AddRange(Data);
            ctx.SaveChanges();
        }
    }
}
