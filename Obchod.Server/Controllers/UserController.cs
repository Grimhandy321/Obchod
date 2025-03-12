using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Obchod.Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Obchod.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]

    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly MyDbContext _dbContext;

        public UserController(IConfiguration configuration, MyDbContext dbContext)
        {
            _configuration = configuration;
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<User> users = _dbContext.users.ToList();
            return Ok(users);
        }

        [HttpGet("{userId}")]
        public IActionResult Get(string userId)
        {
            var user = _dbContext.users.First(x => x.Id == userId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(User newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var objUser = _dbContext.users.FirstOrDefault(x => x.Email == newUser.Email);
            if (objUser == null)
            {
                _dbContext.users.Add(new User
                {
                    FirstName = newUser.FirstName,
                    LastName = newUser.LastName,
                    Email = newUser.Email,
                    PasswordHash = newUser.PasswordHash
                });
                _dbContext.SaveChanges();
                return Ok("Registration Successfull");
            }
            else {
                return BadRequest("User allready exists");
            }
        }

        [HttpPut("{userId}")]
        public IActionResult Put(string userId, [FromBody] User updatedUser)
        {
            if (userId != updatedUser.Id)
            {
                return BadRequest("User ID in URL does not match body");
            }

            var existingUser = _dbContext.users.Find(userId);
            if (existingUser == null)
            {
                return NotFound();
            }

            _dbContext.Entry(existingUser).CurrentValues.SetValues(updatedUser);
            _dbContext.SaveChanges();

            return Ok();
        }


        [HttpDelete("{userId}")]
        public IActionResult Delete(int userId)
        {
            var user = _dbContext.users.Find(userId);
            if (user == null)
            {
                return NotFound();
            }

            _dbContext.users.Remove(user);
            _dbContext.SaveChanges();

            return Ok();
        }


        [HttpPost("login")]
        public IActionResult Login(UserLoginRequest loginRequest)
        {
            var user = _dbContext.users.FirstOrDefault(x => loginRequest.Password == x.PasswordHash && x.Email == loginRequest.Email);
            if (user == null)
            {
                return Unauthorized("Invalid username or password");
            }
            var jwtService = new JwtService(_configuration);
            var token = jwtService.GenerateJwtToken(user);
            return Ok(new { Token = token });
            }
        }
}
    