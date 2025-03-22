using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Obchod.Server.Models
{
    public class ProductSize
    {
        [Key]
        public int ProductSizeID { get; set; }
        public int Size { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public int ProductID { get; set; }
    }
}
