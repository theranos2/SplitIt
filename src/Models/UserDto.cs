using System;

using Microsoft.AspNetCore.Mvc;


namespace split_it.Models
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool MfaEnabled { get; set; } = false;
    }

    // Use me in lists
    public class UserInfoDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class UserFilter
    {
        [FromQuery(Name = "email")]
        public string Email { get; set; }
        [FromQuery(Name = "firstname")]
        public string FirstName { get; set; }
        [FromQuery(Name = "lastname")]
        public string LastName { get; set; }
    }

    public enum UserSort
    {
        EMAIL_ASC,
        EMAIL_DESC,
        FIRSTNAME_ASC,
        FIRSTNAME_DESC,
        LASTNAME_ASC,
        LASTNAME_DESC,
    }
}
