using System.ComponentModel.DataAnnotations;

namespace Obchod.Server.Models
{
    public class OrderItem
    {
        [Key]
        public int OrderItemID { get; set; }
        public int Quantity { get; set; }
        public int OrderID { get; set; }
        public int ProductSizeID { get; set; }

    }
}
