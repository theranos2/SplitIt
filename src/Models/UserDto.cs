using System;
using System.ComponentModel.DataAnnotations;

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
}
