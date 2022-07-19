using System;
using System.Collections.Generic;
using split_it;
using Crypto = BCrypt.Net.BCrypt;

namespace seeder
{
    public class UserSeeder
    {
        public static List<User> Data = new List<User>{
            new User
            {
                Id = Guid.Parse("2e1d5f46-a60d-42d1-a67d-d024034541f2"),
                Email = "foo@bar.com",
                FirstName = "Foo",
                LastName = "Bar",
                Password = Crypto.HashPassword("foobar123"),
            },
            new User
            {
                Id = Guid.Parse("144b2038-b3e9-4602-821b-a240667a118c"),
                Email = "bill@gates.com",
                FirstName = "Bill",
                LastName = "Gates",
                Password = Crypto.HashPassword("billgates123"),
            },
            new User
            {
                Id = Guid.Parse("85b87b75-b690-4974-88d6-a87cfff73f32"),
                Email = "steve@jobs.com",
                FirstName = "Steve",
                LastName = "Jobs",
                Password = Crypto.HashPassword("stevejobs123"),
            },
            new User
            {
                Id = Guid.Parse("21c45fa5-69d6-43fe-9d91-6d5ca6ac06ba"),
                Email = "mike@cox.com",
                FirstName = "Mike",
                LastName = "Cox",
                Password = Crypto.HashPassword("mikecox123"),
            },
            new User
            {
                Id = Guid.Parse("8e051a1d-a543-451b-a955-4db409da9379"),
                Email = "ben@dover.com",
                FirstName = "Ben",
                LastName = "Dover",
                Password = Crypto.HashPassword("bendover123"),
            },
            new User
            {
                Id = Guid.Parse("6928659e-ae4c-4784-be4e-fcbb54f23f4d"),
                Email = "hugh@jass.com",
                FirstName = "Hugh",
                LastName = "Jass",
                Password = Crypto.HashPassword("hughjass123"),
            },
        };

        public static void Seed(DatabaseContext ctx)
        {
            ctx.Users.AddRange(Data);
            ctx.SaveChanges();
        }
    }
}
