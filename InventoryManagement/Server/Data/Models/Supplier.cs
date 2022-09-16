using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Data.Models
{
    public class Supplier
    {
        public Guid SupplierId { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [StringLength(50, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "{0} is required.")]
        [StringLength(50, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 5)]
        public string Address { get; set; } = string.Empty;

        [Required(ErrorMessage = "{0} is required.")]
        [StringLength(2, ErrorMessage = "{0} length must have 2 characters.", MinimumLength = 2)]
        public string Province { get; set; } = string.Empty;


        [Required(ErrorMessage = "{0} is required.")]
        [RegularExpression(@"\(\d{3}\) \d{7}", ErrorMessage = "Incorrect phone number format. Accepted: (999) 9999999.")]
        public string Phone { get; set; } = string.Empty;

        [Required(ErrorMessage = "{0} is required.")]
        [EmailAddress(ErrorMessage = "Incorrect email format.")]
        public string Email { get; set; } = string.Empty;

        public ICollection<Product>? Products { get; set; } = null!;
    }
}
