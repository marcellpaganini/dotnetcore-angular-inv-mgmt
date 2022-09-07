using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Data.Models
{
    public class Product
    {
        public Guid ProductId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public Decimal Price { get; set; }

        public int Quantity { get; set; }

        public string Status { get; set; } = string.Empty;

        [ForeignKey(nameof(Supplier))]
        public Guid SupplierId { get; set; }

        public Supplier? Supplier { get; set; } = null!;
    }
}
