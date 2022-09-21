using Server.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Server.Data.DTOs
{
    public class SupplierDTO
    {
        public Guid SupplierId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string Province { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public int? TotalProducts { get; set; } = null!;
    }
}
