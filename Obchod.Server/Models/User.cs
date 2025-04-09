using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace Obchod.Server.Models
{
    public class User : IdentityUser
    {
        [MaxLength(50)]
        public string FirstName { get; set; }
        [MaxLength(50)]
        public string LastName { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [Column(TypeName = "datetime")]
        public DateTime ModifiedDate { get; set; } = DateTime.Now;

        [Column(TypeName = "datetime")]
        public DateTime LastLogin { get; set; } = DateTime.Now;
        public List<OrderItem> ShoppingCart{ get; set; } = new List<OrderItem>();
        public bool IsAdmin { get; set; } = false;
    }
}
