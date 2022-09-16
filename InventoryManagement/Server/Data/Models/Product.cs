using Server.Data.Models.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Data.Models
{
    public class Product
    {
        public Guid ProductId { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [StringLength(50, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "{0} is required.")]
        [StringLength(550, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 5)]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "{0} is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Negative price not allowed.")]
        public Decimal Price { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Negative numbers not allowed.")]
        public int Quantity { get; set; }

        [Required(ErrorMessage = "{0} is required.")]
        [StringRange(AllowableValues = new[] { "Operational", "Canceled", "Experimental", "Not Launched" }, ErrorMessage = "Status must be either 'Operational', 'Canceled', 'Experimental' or 'Not Launched'.")]
        public string Status { get; set; } = string.Empty;

        [Required(ErrorMessage = "{0} is required.")]
        [ForeignKey(nameof(Supplier))]
        public Guid SupplierId { get; set; }

        public Supplier? Supplier { get; set; } = null!;
    }
}
