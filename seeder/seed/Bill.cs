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
                Shares = new List<Share>
                {
                    new Share
                    {
                        Payer = UserSeeder.Data[1],
                        Items = new List<Item>{
                            new Item
                            {
                                Name = "Popcorn",
                                Price = 3
                            },
                        },
                    },
                    new Share
                    {
                        Payer = UserSeeder.Data[0],
                        Items = new List<Item>{
                            new Item
                            {
                                Name = "Popcorn",
                                Price = 3
                            }
                        }
                    }
                },
                Created = DateTime.Now,
                IsSettled = false,
            },
            new Bill
            {
                Id = Guid.NewGuid(),
                Owner = UserSeeder.Data[1],
                Title = "Something 2",
                Shares = new List<Share>
                {
                    new Share
                    {
                        Payer = UserSeeder.Data[1],
                        Items = new List<Item>{
                            new Item
                            {
                                Name = "Ice Cream",
                                Price = 3
                            },
                        },
                    },
                    new Share
                    {
                        Payer = UserSeeder.Data[0],
                        Items = new List<Item>{
                            new Item
                            {
                                Name = "Rice",
                                Price = 3
                            }
                        }
                    }
                },
                Created = DateTime.Now,
                IsSettled = false,
            }
        };

        public static void Seed(DatabaseContext ctx)
        {
            ctx.Bills.AddRange(Data);
            ctx.SaveChanges();
        }
    }
}
