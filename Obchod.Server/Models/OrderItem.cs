using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Obchod.Server.Models
{
    public class OrderItem
    {
        [Key]
        public int OrderItemID { get; set; } // Primary Key

        // Foreign Keys
        public int OrderID { get; set; }
        public Order Order { get; set; } = null!;

        public int ProductID { get; set; }
        public Product Product { get; set; } = null!;

        public int Quantity { get; set; } // How many of this product are in the order
    }
}
