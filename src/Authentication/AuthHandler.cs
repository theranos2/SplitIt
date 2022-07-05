using System;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace split_it.Authentication
{
    public class AuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        public AuthHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock) : base(options, logger, encoder, clock)
        {
        }

        // ATTENTION: when invoking AuthenticationResult.Fail or Success please DONT FORGET "retutrn".
        // This does not get picked up by intellisense. BEWARE!
        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Token"))
                return AuthenticateResult.Fail("No Authentication String");

            string cookieString = Request.Headers["Token"];

            if (cookieString == null)
                return AuthenticateResult.Fail("No Authentication String");

            // check if exists in cookeiesDb
            var cookie = CookiesDb.Get(cookieString);

            if (cookie == null)
                return AuthenticateResult.Fail("Bad Authentication String");

            // check expiry date
            if (DateTime.Now > cookie.ExpiryDate)
            {
                CookiesDb.RemoveCookie(cookieString);
                return AuthenticateResult.Fail("Expired Authentication String");
            }

            // check if fully authenticated. it is fully authenticated when mfa is confirmed
            if (cookie.hasPassedMfa == false)
                return AuthenticateResult.Fail("MFA Not Confirmed");

            // update last usage time
            // todo if it actually updates origin
            cookie.LastSeen = DateTime.Now;

            var claims = new[] { new Claim(ClaimTypes.Name, cookieString) };
            var identity = new ClaimsIdentity(claims, Scheme.Name);
            var principal = new ClaimsPrincipal(identity);
            var auth = new AuthenticationTicket(principal, Scheme.Name);

            return AuthenticateResult.Success(auth);
        }
    }

}
