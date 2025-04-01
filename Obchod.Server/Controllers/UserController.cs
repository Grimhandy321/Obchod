using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Obchod.Server.Models;
using Obchod.Server.Services;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Obchod.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly MyDbContext _dbContext;
        private readonly JwtService _jwtService;

        public UserController(IConfiguration configuration, MyDbContext dbContext, JwtService jwtService)
        {
            _configuration = configuration;
            _dbContext = dbContext;
            _jwtService = jwtService;
        }

        // Get all users
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _dbContext.users.ToListAsync();
            return Ok(users);
        }

        // Get user by ID
        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(string userId)
        {
            var user = await _dbContext.users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
            {
                return NotFound(new { status = "error", message = "User not found" });
            }
            return Ok(user);
        }

        // Create new user
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { status = "error", message = "Invalid model state" });
            }

            var existingUser = await _dbContext.users.FirstOrDefaultAsync(x => x.Email == newUser.Email);
            if (existingUser != null)
            {
                return BadRequest(new { status = "error", message = "User already exists" });
            }

            // Hash the password before saving
            newUser.PasswordHash = HashPassword(newUser.PasswordHash);

            _dbContext.users.Add(newUser);
            await _dbContext.SaveChangesAsync();

            return Ok(new { status = "success", message = "Registration successfull" });
        }

        // Update user
        [HttpPut("{userId}")]
        public async Task<IActionResult> Put(string userId, [FromBody] User updatedUser)
        {
            if (userId != updatedUser.Id)
            {
                return BadRequest(new { status = "error", message = "User ID in URL does not match body" });
            }

            var existingUser = await _dbContext.users.FindAsync(userId);
            if (existingUser == null)
            {
                return NotFound(new { status = "error", message = "User not found" });
            }

            _dbContext.Entry(existingUser).CurrentValues.SetValues(updatedUser);
            await _dbContext.SaveChangesAsync();

            return Ok(new { status = "success", message = "User update successfull" });
        }

        // Delete user (only for admins)
        [HttpDelete("{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int userId)
        {
            var user = await _dbContext.users.FindAsync(userId);
            if (user == null)
            {
                return NotFound(new { status = "error", message = "User not found" });
            }

            _dbContext.users.Remove(user);
            await _dbContext.SaveChangesAsync();

            return Ok(new { status = "success", message = "User deleted" } );
        }

        // Login user and generate JWT token
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest loginRequest)
        {
            var user = await _dbContext.users.FirstOrDefaultAsync(x => x.Email == loginRequest.Email);
            if (user == null)
            {
                return BadRequest(new { status = "error", message = "User not found" });
            }

            // Check if the password matches (consider using a hashed password for comparison)
            if (!VerifyPassword(user.PasswordHash, loginRequest.Password))
            {
                return BadRequest(new { status = "error", message = "Invalid password" });
            }

            var token = _jwtService.GenerateJwtToken(user);

            return Ok(new
            {
                status = "success",
                message = "Login successfull",
                Token = token
            });
        }

        // Utility method to hash passwords
        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashBytes);
        }

        private bool VerifyPassword(string storedHash, string password)
        {
            string passwordHash = HashPassword(password);
            return storedHash == passwordHash;
        }
    }
}
