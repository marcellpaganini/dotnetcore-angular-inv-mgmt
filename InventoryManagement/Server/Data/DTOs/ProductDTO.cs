using Server.Data.Models.Validation;
using Server.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Server.Data.DTOs
{
    public class ProductDTO
    {
        public Guid ProductId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public Decimal Price { get; set; }

        public int Quantity { get; set; }

        public string Status { get; set; } = string.Empty;

        public Guid SupplierId { get; set; }

        public string? SupplierName { get; set; } = null!;
    }
}
