namespace Obchod.Server.Entity
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ImageID { get; set; }
        public Variant[] vartiants { get; set; }
    }
}
