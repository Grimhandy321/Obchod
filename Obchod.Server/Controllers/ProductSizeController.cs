using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Obchod.Server.Models;

namespace Obchod.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class ProductSizeController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public ProductSizeController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var productSizes = _dbContext.productSizes.ToList();
            return Ok(productSizes);
        }

        [HttpGet("{productId}")]
        public IActionResult Get(int productId)
        {
            var productSizes = _dbContext.productSizes.Where(ps => ps.ProductID == productId).ToList();
            if (!productSizes.Any())
            {
                return NotFound();
            }
            return Ok(productSizes);
        }

        [HttpGet("{id}/size")]
        public IActionResult GetProductSizeById(int id)
        {
            var productSize = _dbContext.productSizes.Find(id);
            if (productSize == null)
            {
                return NotFound();
            }
            return Ok(productSize);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProductSize newProductSize)
        {
            _dbContext.productSizes.Add(newProductSize);
            _dbContext.SaveChanges();
            return CreatedAtAction(nameof(GetProductSizeById), new { id = newProductSize.Id }, newProductSize);
        }

        [HttpPut("{productSizeId}")]
        public IActionResult Put(int productSizeId, [FromBody] ProductSize updatedProductSize)
        {
            if (productSizeId != updatedProductSize.ProductSizeID)
            {
                return BadRequest("Product Size ID in URL does not match body");
            }

            var existingProductSize = _dbContext.productSizes.Find(productSizeId);
            if (existingProductSize == null)
            {
                return NotFound();
            }

            _dbContext.Entry(existingProductSize).CurrentValues.SetValues(updatedProductSize);
            _dbContext.SaveChanges();

            return Ok();
        }

        [HttpDelete("{productSizeId}")]
        public IActionResult Delete(int productSizeId)
        {
            var productSize = _dbContext.productSizes.Find(productSizeId);
            if (productSize == null)
            {
                return NotFound();
            }

            _dbContext.productSizes.Remove(productSize);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
