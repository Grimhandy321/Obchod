using Microsoft.EntityFrameworkCore;
using Obchod.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace Obchod.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    }
}
