using Microsoft.AspNetCore.Mvc;
using Obchod.Server.Entity;

namespace Obchod.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private static readonly IEnumerable<Product> products = new[]
        {
            new Product {Id = 1, Description = "ASD" , Name = "Nevim", vartiants = null, ImageID = 1 }
        };

        [HttpGet]
        public Product[] GetAll() 
        {
            return products.ToArray();
        }
    }
}
