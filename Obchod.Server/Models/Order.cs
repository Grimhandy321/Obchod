using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Obchod.Server.Models
{
    public enum OrderStatus
    {
        Pending,
        Processing,
        Shipped,
        Delivered,
        Cancelled,
    }

    public class Order
    {
        [Key]
        public int OrderID { get; set; }
        public DateTime DateTime { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }

        // One-to-Many Relationship
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        public OrderStatus Status { get; set; }
        public string UserID { get; set; }
    }
}
