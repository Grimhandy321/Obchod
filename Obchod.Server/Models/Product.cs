using System.ComponentModel.DataAnnotations;

namespace Obchod.Server.Models
{
    public class Product
    {
        [Key]
        public int ProductID { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }
        public List<string> ImagePaths { get; set; } = new();
        public float Rating { get; set; } 
    }
}