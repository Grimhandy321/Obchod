
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Obchod.Server.Models;



namespace Obchod.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]

    public class ProductController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public ProductController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Product> products = _dbContext.products.ToList();
            return Ok(products);
        }

        [HttpGet("{productId}")]
        public IActionResult Get(int productId)
        {
            var product = _dbContext.products.FirstOrDefault(x => x.ProductID == productId);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public IActionResult Post(Product product)
        {
            _dbContext.products.Add(product);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{productId}")]
        public IActionResult Put(string productId, [FromBody] Product updatedProduct)
        {
            var product = _dbContext.products.Find(productId);
            if (product == null)
            {
                return NotFound();
            }

            _dbContext.products.Remove(product);
            _dbContext.SaveChanges();

            return Ok();
        }

        [HttpDelete("{productId}")]
        public IActionResult Delete(string productId)
        {
            var product = _dbContext.products.Find(productId);
            if (product == null)
            {
                return NotFound();
            }

            _dbContext.products.Remove(product);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
