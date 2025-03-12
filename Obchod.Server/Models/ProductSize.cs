namespace Obchod.Server.Models
{
    public class ProductSize
    {
        public int ProductSizeID { get; set; }
        public int Size { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int ProductID { get; set; }
    }
}
