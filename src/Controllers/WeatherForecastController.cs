using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using split_it.Models;

namespace split_it.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("hello")]
        public Bill Test()
        {
            using (var db = new DatabaseContext())
            {
                var user = new User()
                {
                    Email = "hello@example.com",
                    FirstName = "Jack",
                    LastName = "Mack"
                };

                db.Users.Add(user);

                // create a share
                var share = new Share()
                {
                    hasPaid = false,
                    Payer = user,
                    Amount = 0,
                    Description = "BJ Pancake" // butter and jam
                };

                List<Share> shares = new List<Share>();
                shares.Add(share);


                // create a bill
                var bill = new Bill()
                {
                    Created = DateTime.Now,
                    Total = shares.Sum(x => x.Amount),
                    Shares = shares
                };
                db.Bills.Add(bill);


                // save database
                db.SaveChanges();

                return bill;
            }

        }
    }
}
