using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Obchod.Server.Attributes;
using Obchod.Server.Models;
using Obchod.Server.Services;
using System.Security.Claims;
using System.IO;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Linq;

namespace Obchod.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly MyDbContext _dbContext;
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<ProductController> _logger;
        private readonly ProductService _productService;

        public ProductController(MyDbContext dbContext, IWebHostEnvironment environment, ILogger<ProductController> logger, ProductService productService)
        {
            _dbContext = dbContext;
            _environment = environment;
            _logger = logger;
            _productService = productService;
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
        [SessionAuthorize("Admin")]
        public async Task<IActionResult> Post([FromForm] Product product, [FromForm] IFormFile[] images)
        {
            try
            {
                if (images != null && images.Any())
                {
                    product.ImagePaths = await _productService.SaveImagesAsync(images);
                }

                _dbContext.products.Add(product);
                await _dbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(Get), new { productId = product.ProductID }, product);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error while saving product: " + ex.Message);
                return StatusCode(500, new { message = "Error while saving product", error = ex.Message });
            }
        }

        //  Update an existing product (Admin Only)
        [HttpPut("{productId:int}")]
        [SessionAuthorize("Admin")]
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
                product.ImagePaths.AddRange(await _productService.SaveImagesAsync(images));
            }

            _dbContext.Entry(product).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return Ok(product);
        }

        //  Delete a product (Admin Only)
        [HttpDelete("{productId:int}")]
        [SessionAuthorize("Admin")]
        public async Task<IActionResult> Delete(int productId)
        {
            var product = await _dbContext.products.FindAsync(productId);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            _dbContext.products.Remove(product);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Product deleted successfully" });
        }
        // Upload product images
        [HttpPost("{productId}/images")]
        public async Task<IActionResult> UploadProductImages(int productId, [FromForm] IFormFile[] images)
        {
            try
            {
                var product = await _dbContext.products.FirstOrDefaultAsync(x => x.ProductID == productId);
                if (product == null) NotFound(new { message = "Product not found" });

                List<string> imagePaths = await _productService.SaveImagesAsync(images);
                product.ImagePaths.AddRange(imagePaths);

                _dbContext.products.Update(product);
                _dbContext.SaveChanges();

                product = await _dbContext.products.FirstOrDefaultAsync(x => x.ProductID == productId);
                return Ok(new { message = "Images uploaded successfully", product.ImagePaths });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error uploading images", error = ex.Message });
            }
        }
        // Delete product image
        [HttpDelete("{productId}/images/{fileName}")]
        public async Task<IActionResult> DeleteProductImages(int productId, string fileName)
        {
            try
            {
                var product = await _dbContext.products.FirstOrDefaultAsync(x => x.ProductID == productId);
                if (product == null) return NotFound(new { message = "Product not found" }); ;

                var imagePaths = await _productService.DeleteImageAsync(fileName);
                if (imagePaths)
                {
                    product.ImagePaths.Remove(fileName);
                    _dbContext.products.Update(product);
                    _dbContext.SaveChanges();
                    return Ok(new { message = "Images uploaded successfully", imagePaths });
                }
                else 
                {
                    return StatusCode(500, new { message = "Error deleting images"});
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting images", error = ex.Message });
            }
        }

        // Get product images
        [HttpGet("{productId}/images")]
        public async Task<IActionResult> GetProductImages(int productId)
        {
            try
            {
                var product = await _dbContext.products.FirstOrDefaultAsync(x => x.ProductID == productId);
                if (product == null) return NotFound(new { message = "Product not found" });

                return Ok(new { product.ImagePaths});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error uploading images", error = ex.Message });
            }
        }
        // Download product image

        [HttpGet("{productId}/image/download/{fileName}")]
        public IActionResult DownloadProductImage(int productId, string fileName)
        {
            var filePath = Path.Combine(_environment.WebRootPath, "uploads", fileName);
            if (!System.IO.File.Exists(filePath)) return NotFound();

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File(fileBytes, "application/octet-stream", fileName);
        }
    }
}
