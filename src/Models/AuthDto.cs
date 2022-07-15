using System.ComponentModel.DataAnnotations;

namespace split_it.Models
{
    public class LoginDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [MinLength(5)]
        [MaxLength(32)]
        [Required]
        public string Password { get; set; }
    }

    public class RegisterDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [MinLength(5)]
        [MaxLength(32)]
        [Required]
        public string Password { get; set; }

        [MinLength(2)]
        [MaxLength(32)]
        [Required]
        public string FirstName { get; set; }

        [MinLength(2)]
        [MaxLength(32)]
        [Required]
        public string LastName { get; set; }
    }

    public class TokenDto
    {
        public string Token { get; set; }
    }
}
