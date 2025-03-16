using System.ComponentModel.DataAnnotations;

namespace Obchod.Server.Models
{
    public class Login
    {
        [Key]
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public bool Remember { get; set; } = false;
    }
}
