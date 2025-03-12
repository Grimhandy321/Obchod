using Microsoft.EntityFrameworkCore;

namespace Obchod.Server.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {

        }
        public DbSet<Order> orders { get; set; }
        public DbSet<OrderItem> orderItems { get; set; }
        public DbSet <Product> products { get; set; } 
        public DbSet<User> users { get; set; }
        public DbSet <UserLoginRequest> userLoginRequests { get; set; }
        public DbSet <Login> logins { get; set; }
        public DbSet<ProductSize> productSizes { get; set; }
    }
}
