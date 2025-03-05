using Microsoft.EntityFrameworkCore;

namespace Obchod.Server.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {

        }
        public DbSet<Order> orders { get; set; }
    }
}
