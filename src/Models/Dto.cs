using System;
using System.ComponentModel.DataAnnotations;

namespace split_it.Models
{
    public class LoginDto
    {
        [Required(AllowEmptyStrings = false)]
        public string Email { get; set; }
        public string Password  { get; set; }
    }
}
