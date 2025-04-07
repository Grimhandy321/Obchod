using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Obchod.Server.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

public interface IProductService
{
    Task<Product> CreateProductAsync(Product product, IFormFile[] images);
    Product? GetProductById(int productId);
}

public class ProductService : IProductService
{
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<ProductService> _logger;
    private readonly List<Product> _products = new();

    public ProductService(IWebHostEnvironment environment, ILogger<ProductService> logger)
    {
        _environment = environment;
        _logger = logger;
    }

    public async Task<List<string>> SaveImagesAsync(IFormFile[] images)
    {
        var uploadFolder = Path.Combine(_environment.WebRootPath, "uploads");
        Directory.CreateDirectory(uploadFolder);

        var imagePaths = new List<string>();
        foreach (var image in images)
        {
            if (image == null || image.Length == 0) continue;

            var uniqueFileName = $"{Guid.NewGuid()}_{image.FileName}";
            var filePath = Path.Combine(uploadFolder, uniqueFileName);

            try
            {
                await using var stream = new FileStream(filePath, FileMode.Create);
                await image.CopyToAsync(stream);

                imagePaths.Add($"/uploads/{uniqueFileName}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Image upload failed.");
                throw;
            }
        }
        return imagePaths;
    }

    public async Task<Product> CreateProductAsync(Product product, IFormFile[] images)
    {
        var imagePaths = await SaveImagesAsync(images);
        product.ImagePaths = imagePaths;
        _products.Add(product);

        return product;
    }

    public Product? GetProductById(int productId)
    {
        return _products.FirstOrDefault(p => p.ProductID == productId);
    }
}
