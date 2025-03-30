using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Obchod.Server.Models;
using Obchod.Server.Services;

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
                return Ok(new
                {
                    status = "success"
                });
            }
            else
            {
                return Ok(new
                {
                    status = "error",
                    message = "User exists"
                });
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
            if (!_jwtService.IsAdmin(HttpContext))
            {
                return Forbid("Admin access required");
            }

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
            var user = _dbContext.users.FirstOrDefault(x => x.Email == loginRequest.Email);
            if (user == null)
            {
                return Ok(new
                {
                    status = "error",
                    message = "user not found"
                });
            }
            if (user.PasswordHash != loginRequest.Password)
            {
                return Ok(new
                {
                    status = "error",
                    message = "invalid password"
                });
            }
            var token = _jwtService.GenerateJwtToken(user);
            return Ok(new
            {
                status = "success",
                Token = token
            });
        }
    }
}
