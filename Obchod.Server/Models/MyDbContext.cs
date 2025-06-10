using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Obchod.Server.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<Order> orders { get; set; }
        public DbSet<OrderItem> orderItems { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Login> logins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // OrderItem primary key
            modelBuilder.Entity<OrderItem>()
                .HasKey(oi => oi.OrderItemID);

            // OrderItem → Order relationship (many-to-one)
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderID);

            // Product.ImagePaths conversion: List<string> ↔ JSON
            modelBuilder.Entity<Product>()
                .Property(p => p.ImagePaths)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                    v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions)null)
                );

            // Seed initial products
            modelBuilder.Entity<Product>().HasData(
                new
                {
                    ProductID = 1,
                    Name = "Bezdrátová sluchátka",
                    Brand = "Sony",
                    Description = "Kvalitní bezdrátová sluchátka s aktivním potlačením hluku.",
                    Price = 2999.99m,
                    Count = 25,
                    ImagePaths = new List<string> { "cat.png", "cat.png", "cat.png" },
                    Rating = 4.5f
                },
                new
                {
                    ProductID = 2,
                    Name = "Notebook 15\"",
                    Brand = "Dell",
                    Description = "Výkonný notebook ideální na práci i hraní her.",
                    Price = 23999.00m,
                    Count = 10,
                    ImagePaths = new List<string> { "cat.png", "cat.png" },
                    Rating = 4.7f
                },
                new
                {
                    ProductID = 3,
                    Name = "Chytré hodinky",
                    Brand = "Apple",
                    Description = "Stylové chytré hodinky s měřením zdravotních funkcí.",
                    Price = 10999.50m,
                    Count = 40,
                    ImagePaths = new List<string> { "cat.png" },
                    Rating = 4.8f
                },
                new
                {
                    ProductID = 4,
                    Name = "Bluetooth reproduktor",
                    Brand = "JBL",
                    Description = "Kompaktní reproduktor s mohutným zvukem a odolností proti vodě.",
                    Price = 1499.99m,
                    Count = 100,
                    ImagePaths = new List<string> { "cat.png", "cat.png" },
                    Rating = 4.4f
                },
                new
                {
                    ProductID = 5,
                    Name = "Herní myš",
                    Brand = "Logitech",
                    Description = "Přesná herní myš s nastavitelnou citlivostí a RGB podsvícením.",
                    Price = 1299.00m,
                    Count = 75,
                    ImagePaths = new List<string> { "cat.png", "cat.png", "cat.png", "cat.png" },
                    Rating = 4.6f
                }
            );
            // Seed innitail user 
            modelBuilder.Entity<User>().HasData(
                new 
                {
                    FirstName = "Michal",
                    LastName = "Prihoda",
                    CreatedDate = DateTime.Parse("2025-05-01T11:33:44.7974406+02:00"),
                    ModifiedDate = DateTime.Parse("2025-05-01T11:33:44.7974467+02:00"),
                    LastLogin = DateTime.Parse("2025-05-01T11:33:44.7974469+02:00"),
                    ShoppingCart = new List<OrderItem>(),
                    IsAdmin = true,
                    Id = "0",
                    UserName = "",
                    NormalizedUserName = "",
                    Email = "michal.jezek07@gmail.com",
                    NormalizedEmail = "",
                    EmailConfirmed = false,
                    PasswordHash = "",
                    SecurityStamp = "f9d14cef-d16b-4ed1-86fc-ae29c28a69b4",
                    ConcurrencyStamp = "30ad636b-a277-4a3e-b086-8f98642b4fa9",
                    PhoneNumber = "",
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = false,
                    AccessFailedCount = 0
                }
            );
        }
    }
}
