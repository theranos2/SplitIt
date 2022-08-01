using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using split_it.Authentication;
using split_it.Exceptions.Http;
using split_it.Models;

namespace split_it.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class BankController : ControllerBase
    {
        DatabaseContext db;
        private const string KEY = "MOMGAE"; // TODO STORE SOMEWHERE ELSE !!!
        public BankController(DatabaseContext _db)
        {
            db = _db;
        }

        // Ripped from Geeks for Geeks. 
        // NO VERIFICATION!
        private bool LuhnChecksumOk(string cardNo)
        {
            int nDigits = cardNo.Length;

            int nSum = 0;
            bool isSecond = false;
            for (int i = nDigits - 1; i >= 0; i--)
            {

                int d = cardNo[i] - '0';

                if (isSecond == true)
                    d = d * 2;

                // We add two digits to handle
                // cases that make two digits
                // after doubling
                nSum += d / 10;
                nSum += d % 10;

                isSecond = !isSecond;
            }
            return (nSum % 10 == 0);
        }

        // reads decrypted obj and encrypts it. 
        // writes encrypted information to old object
        private void EncryptInfo(BankingInfo orig, CardDto decrypted)
        {
            orig.CardExpiry = EncyptorService.EncryptString(decrypted.Expiry.ToString(), KEY);
            orig.DoB = EncyptorService.EncryptString(decrypted.DoB.ToString(), KEY);
            orig.CardName = EncyptorService.EncryptString(decrypted.Name, KEY);
            orig.CardNumber = EncyptorService.EncryptString(decrypted.Number, KEY);
            orig.CardSecret = EncyptorService.EncryptString(decrypted.Secret, KEY);
        }

        private void EncryptInfo(BankingInfo orig, AddressDto decrypted)
        {
            orig.Country = EncyptorService.EncryptString(decrypted.Country, KEY);
            orig.HouseNumber = EncyptorService.EncryptString(decrypted.HouseNumber, KEY);
            orig.Postcode = EncyptorService.EncryptString(decrypted.Postcode, KEY);
            orig.State = EncyptorService.EncryptString(decrypted.State, KEY);
            orig.StreetName = EncyptorService.EncryptString(decrypted.StreetName, KEY);
        }

        // reads encrypted original and decrypts it. 
        // writes decrypted information to supplied object
        private void DecryptInfo(BankingInfo orig, BankingInfoDto decrypted)
        {
            decrypted.Id = orig.Id;
            decrypted.Owner = orig.Owner;
            decrypted.CardExpiry = DateTime.Parse(EncyptorService.DecryptToString(orig.CardExpiry, KEY));
            decrypted.DoB = DateTime.Parse(EncyptorService.DecryptToString(orig.DoB, KEY));
            decrypted.CardName = EncyptorService.DecryptToString(orig.CardName, KEY);
            decrypted.CardNumber = EncyptorService.DecryptToString(orig.CardNumber, KEY);
            decrypted.CardSecret = EncyptorService.DecryptToString(orig.CardSecret, KEY);
            decrypted.Country = EncyptorService.DecryptToString(orig.Country, KEY);
            decrypted.HouseNumber = EncyptorService.DecryptToString(orig.HouseNumber, KEY);
            decrypted.Postcode = EncyptorService.DecryptToString(orig.Postcode, KEY);
            decrypted.State = EncyptorService.DecryptToString(orig.State, KEY);
            decrypted.StreetName = EncyptorService.DecryptToString(orig.StreetName, KEY);
        }

        private BankingInfoDto ObscureCardInfo(BankingInfoDto decryptedInfo)
        {
            string cardNum = decryptedInfo.CardNumber;
            int length = cardNum.Length;
            cardNum = new String('X', length - 4) + cardNum.Substring(length - 4); // Blur out all characters except that last 4i digits

            decryptedInfo.CardNumber = cardNum;
            decryptedInfo.CardSecret = "XXX";

            return decryptedInfo;
        }

        [HttpGet("card")]
        public CardDto GetCardDetails()
        {
            User curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);
            BankingInfo bankInfo = db.BankDetails.Where(x => x.Owner.Id == curUser.Id).FirstOrDefault();
            if (bankInfo == null)
                return null;

            if (bankInfo.CardNumber == null)
                return null;

            BankingInfoDto bankingDto = new BankingInfoDto();
            DecryptInfo(bankInfo, bankingDto);

            return CardDto.FromEntity(bankingDto);
        }

        [HttpPost("card")]
        public CardDto EditCardDetails(CardDto cardDetails)
        {
            // Credit card validation here.
            if (cardDetails.Expiry < DateTime.Now)
                throw new HttpBadRequest("Cannot add an expired card.");

            // Ludhn checksum
            if (!LuhnChecksumOk(cardDetails.Number))
                throw new HttpBadRequest("Invalid card number. Failed number validation.");

            // stripping out non numeric values
            cardDetails.Number = new string(cardDetails.Number.Where(c => char.IsDigit(c)).ToArray());
            cardDetails.Secret = new string(cardDetails.Secret.Where(c => char.IsDigit(c)).ToArray());
            cardDetails.Name = cardDetails.Name.ToUpper();

            User curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);
            BankingInfo bankInfoEncrypted = db.BankDetails.Where(x => x.Owner.Id == curUser.Id).FirstOrDefault();

            if (bankInfoEncrypted == null)
            {
                bankInfoEncrypted = new BankingInfo
                {
                    Id = Guid.Empty,
                    Owner = curUser
                };

                db.Add(bankInfoEncrypted);
                db.SaveChanges();
            }

            EncryptInfo(bankInfoEncrypted, cardDetails);
            db.SaveChanges();

            return CardDto.FromEntity(new BankingInfoDto
            {
                CardExpiry = cardDetails.Expiry,
                CardName = cardDetails.Name,
                CardNumber = cardDetails.Number,
                CardSecret = cardDetails.Secret
            });
        }

        [HttpGet("address")]
        public AddressDto GetAddressDetails()
        {

            User curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);
            BankingInfo bankInfo = db.BankDetails.Where(x => x.Owner.Id == curUser.Id).FirstOrDefault();
            if (bankInfo == null)
                return null;
            if (bankInfo.Country == null)
                return null;

            // Decryption
            BankingInfoDto bankingDto = new BankingInfoDto();
            DecryptInfo(bankInfo, bankingDto);

            return AddressDto.FromEntity(bankingDto);
        }

        [HttpPost("address")]
        public AddressDto EditAddressDetails(AddressDto addrDetails)
        {
            // TOOD enforce address validation (beyond project scope)
            addrDetails.Country = addrDetails.Country.ToUpper();
            addrDetails.HouseNumber = addrDetails.HouseNumber.ToUpper();
            addrDetails.Postcode = addrDetails.Postcode.ToUpper();
            addrDetails.State = addrDetails.State.ToUpper();
            addrDetails.StreetName = addrDetails.StreetName.ToUpper();

            User curUser = IdentityTools.GetUser(db, HttpContext.User.Identity);
            BankingInfo bankInfEncrypted = db.BankDetails.Where(x => x.Owner.Id == curUser.Id).FirstOrDefault();
            if (bankInfEncrypted == null)
            {
                bankInfEncrypted = new BankingInfo
                {
                    Id = Guid.Empty,
                    Owner = curUser
                };

                db.Add(bankInfEncrypted);
                db.SaveChanges();
            }

            EncryptInfo(bankInfEncrypted, addrDetails);
            db.SaveChanges();

            return addrDetails;
        }
    }
}