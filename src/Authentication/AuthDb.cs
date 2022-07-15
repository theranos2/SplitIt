using System;
using System.Collections.Generic;
using System.Security.Cryptography;

namespace split_it.Authentication
{
    public class MyCookie
    {
        public DateTime IssueDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime LastSeen { get; set; }
        public Guid UserId { get; set; }
        public string MfaCode { get; set; }
        public bool hasPassedMfa { get; set; }

    }

    public static class CookiesDb
    {
        private static SortedDictionary<string, MyCookie> Db = new SortedDictionary<string, MyCookie>();


        // returns null if not found
        public static MyCookie Get(string cookieString)
        {
            if (!Db.ContainsKey(cookieString))
                return null;

            return Db[cookieString];
        }

        public static string IssueCookie(MyCookie content)
        {
            string cookieString = GenerateUniqueCookieString();
            Db.Add(cookieString, content);
            return cookieString;
        }

        public static void RemoveCookie(string cookieString)
        {
            if (Db.ContainsKey(cookieString))
                Db.Remove(cookieString);
        }

        private static string GenerateUniqueCookieString()
        {
            string cookieString;
            do
            {
                using (RandomNumberGenerator rng = new RNGCryptoServiceProvider())
                {
                    byte[] tokenData = new byte[128];
                    rng.GetBytes(tokenData);

                    cookieString = Convert.ToBase64String(tokenData);
                }

            } while (Db.ContainsKey(cookieString));

            return cookieString;
        }
    }
}
