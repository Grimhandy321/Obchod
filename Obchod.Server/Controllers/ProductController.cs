using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Obchod.Server.Models;
using Obchod.Server.Services;
using System.Security.Claims;

namespace Obchod.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class ProductController : ControllerBase
    {
        private readonly MyDbContext _dbContext;
        private readonly IWebHostEnvironment _environment;

        public ProductController(MyDbContext dbContext, IWebHostEnvironment environment)
        {
            _dbContext = dbContext;
            _environment = environment;
   
        }

        //  Get all products
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = await _dbContext.products.ToListAsync();
            return Ok(products);
        }

        //  Get a single product by ID
        [HttpGet("{productId:int}")]
        public async Task<IActionResult> Get(int productId)
        {
            var product = await _dbContext.products.FindAsync(productId);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            return Ok(product);
        }

        //  Add a new product (Admin Only)
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Post([FromForm] Product product, [FromForm] IFormFile[] images)
        {
            try
            {
                if (images != null && images.Any())
                {
                    product.ImagePaths = await SaveImagesAsync(images);
                }

                _dbContext.products.Add(product);
                await _dbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(Get), new { productId = product.ProductID }, product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error while saving product", error = ex.Message });
            }
        }

        //  Update an existing product (Admin Only)
        [HttpPut("{productId:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put(int productId, [FromForm] Product updatedProduct, [FromForm] IFormFile[] images)
        {
            var product = await _dbContext.products.FindAsync(productId);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            // Update properties
            product.Name = updatedProduct.Name;
            product.Brand = updatedProduct.Brand;
            product.Description = updatedProduct.Description;
            product.Rating = updatedProduct.Rating;

            // Handle image updates
            if (images != null && images.Any())
            {
                product.ImagePaths.AddRange(await SaveImagesAsync(images));
            }

            _dbContext.Entry(product).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return Ok(product);
        }

        //  Delete a product (Admin Only)
        [HttpDelete("{productId:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int productId)
        {
            var product = await _dbContext.products.FindAsync(productId);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            _dbContext.products.Remove(product);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Product deleted successfully" });
        }

        //  Image Upload Helper
        private async Task<List<string>> SaveImagesAsync(IFormFile[] images)
        {
            var imagePaths = new List<string>();
            var uploadFolder = Path.Combine(_environment.WebRootPath, "uploads");

            Directory.CreateDirectory(uploadFolder);

            foreach (var image in images)
            {
                if (image.Length == 0) continue;

                var uniqueFileName = $"{Guid.NewGuid()}_{image.FileName}";
                var filePath = Path.Combine(uploadFolder, uniqueFileName);

                await using var stream = new FileStream(filePath, FileMode.Create);
                await image.CopyToAsync(stream);

                imagePaths.Add($"/uploads/{uniqueFileName}");
            }

            return imagePaths;
        }
    }
}
