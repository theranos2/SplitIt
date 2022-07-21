using System;
using System.Collections.Generic;
using split_it;

namespace seeder
{
    public class GroupSeeder
    {
        public static List<Group> Data = new List<Group>{
            new Group
            {
                Id = Guid.NewGuid(),
                Owner = UserSeeder.Data[0],
                Name = $"{UserSeeder.Data[0].FirstName}'s Group",
                Members = new List<User>{
                    UserSeeder.Data[1],
                    UserSeeder.Data[2],
                }
            },
            new Group
            {
                Id = Guid.NewGuid(),
                Owner = UserSeeder.Data[1],
                Name = $"{UserSeeder.Data[1].FirstName}'s Group",
                Members = new List<User>{
                    UserSeeder.Data[2],
                    UserSeeder.Data[3],
                    UserSeeder.Data[4],
                }
            }
        };

        public static void Seed(DatabaseContext ctx)
        {
            ctx.Groups.AddRange(Data);
            ctx.SaveChanges();
        }
    }
}
