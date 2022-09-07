using Server.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Supplier> Suppliers { get; set; } = default!;

        public DbSet<Product> Products { get; set; } = default!;
    }
}
