
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
        public IActionResult Put(Product updatedProduct)
        {
            bool updated = _productRepository.Update(updatedProduct);
            if (updated)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("{productId}")]
        public IActionResult Delete(int productId)
        {
            bool deleted = _productRepository.Delete(productId);
            if (deleted)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
