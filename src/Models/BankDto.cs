using System;
using System.ComponentModel.DataAnnotations;

namespace split_it.Models
{
    public class BankingInfoDto
    {
        public Guid Id { get; set; }
        public User Owner { get; set; }
        public string CardNumber { get; set; }
        public string CardSecret { get; set; }
        public string CardName { get; set; }
        public DateTime CardExpiry { get; set; }
        public DateTime DoB { get; set; }
        public string HouseNumber { get; set; }
        public string StreetName { get; set; }
        public string State { get; set; }
        public string Postcode { get; set; }
        public string Country { get; set; }

    }

    public class AddressDto
    {
        [Required]
        public string HouseNumber { get; set; }

        [Required]
        public string StreetName { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string Postcode { get; set; }

        [Required]
        public string Country { get; set; }

        public static AddressDto FromEntity(BankingInfoDto bankInfo)
        {
            return new AddressDto
            {
                Country = bankInfo.Country,
                HouseNumber = bankInfo.HouseNumber,
                Postcode = bankInfo.Postcode,
                State = bankInfo.State,
                StreetName = bankInfo.StreetName
            };
        }
    }

    public class CardDto
    {
        [Required]
        [MinLength(15)]
        [MaxLength(17)]
        public string Number { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(4)]
        public string Secret { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(22)]
        public string Name { get; set; }

        [Required]
        public DateTime Expiry { get; set; }

        [Required]
        public DateTime DoB { get; set; }

        public static CardDto FromEntity(BankingInfoDto bankInfo)
        {
            return new CardDto
            {
                Expiry = bankInfo.CardExpiry,
                Name = bankInfo.CardName,
                Number = bankInfo.CardNumber,
                Secret = bankInfo.CardSecret,
                DoB = bankInfo.DoB
            };
        }
    }
}