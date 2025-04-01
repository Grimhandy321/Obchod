using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Obchod.Server.Models
{
    public class Product
    {
        [Key]
        public int ProductID { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        public int Count { get; set; } // skladová zásoba
        public List<string> ImagePaths { get; set; } = new();
        public float Rating { get; set; }

        // Many-to-Many Relationship
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
