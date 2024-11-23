using Microsoft.EntityFrameworkCore;

namespace Obchod.Server.Models
{
    public class LoginDBContext : DbContext
    {
        public LoginDBContext(DbContextOptions<LoginDBContext> options) :base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }


    }
}
