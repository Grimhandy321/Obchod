using System.ComponentModel.DataAnnotations;

namespace Obchod.Server.Models
{
    public class UserDTO
    {  
        public string Email { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
    }
}
