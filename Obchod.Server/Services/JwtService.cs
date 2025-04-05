using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Obchod.Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Obchod.Server.Services
{
    public interface IJwtService
    {
        string GenerateJwtToken(User user);
        string? GetUserIdFromToken(string token);
        bool IsAdmin(HttpContext httpContext);
    }

    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;
        private readonly MyDbContext _dbContext;

        public JwtService(IConfiguration configuration, MyDbContext dbContext)
        {
            _configuration = configuration;
            _dbContext = dbContext;
        }

        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FirstName),
                new Claim(ClaimTypes.Surname, user.LastName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "User") // Assign role
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        public string? GetUserIdFromToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadJwtToken(token);
                var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                return userIdClaim?.Value;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error decoding token: {ex.Message}");
                return null;
            }
        }
        public bool IsAdmin(HttpContext httpContext)
        {
            var token = httpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(token))
            {
                return false;
            }

            var userId = GetUserIdFromToken(token);
            if (userId == null)
            {
                return false;
            }

            var user = _dbContext.users.Find(userId);
            return user != null && user.IsAdmin;
        }
    }
}
