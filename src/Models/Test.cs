using System;
using System.ComponentModel.DataAnnotations;

namespace split_it.Models
{
    public class TestDto
    {
        [Required]
        public int? Age { get; set; }
        public Guid Id { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Name { get; set; }
        public double Amount { get; set; }
    }
}
