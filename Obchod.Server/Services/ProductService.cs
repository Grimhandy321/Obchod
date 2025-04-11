using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Obchod.Server.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;


public class ProductService
{
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<ProductService> _logger;

    public ProductService(IWebHostEnvironment environment, ILogger<ProductService> logger)
    {
        _environment = environment;
        _logger = logger;
    }

    public async Task<List<string>> SaveImagesAsync(IFormFile[] images)
    {
        var uploadFolder = Path.Combine(_environment.ContentRootPath, "uploads");
        Directory.CreateDirectory(uploadFolder);

        var imagePaths = new List<string>();
        foreach (var image in images)
        {
            if (image == null || image.Length == 0) continue;

            var uniqueFileName = $"{Guid.NewGuid()}";
            var filePath = Path.Combine(uploadFolder, uniqueFileName);

            try
            {
                await using var stream = new FileStream(filePath, FileMode.Create);
                await image.CopyToAsync(stream);

                imagePaths.Add($"{uniqueFileName}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Image upload failed.");
                throw;
            }
        }
        return imagePaths;
    }
    public async Task<bool> DeleteImageAsync(string fileName)
    {
        var uploadFolder = Path.Combine(_environment.WebRootPath, "uploads");
        var filePath = Path.Combine(uploadFolder, fileName);

        if (!File.Exists(filePath))
        {
            _logger.LogWarning("Attempted to delete non-existing file: {FileName}", fileName);
            return false;
        }

        try
        {
            await Task.Run(() => File.Delete(filePath));
            _logger.LogInformation("Deleted image: {FileName}", fileName);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to delete image: {FileName}", fileName);
            return false;
        }
    }
}


