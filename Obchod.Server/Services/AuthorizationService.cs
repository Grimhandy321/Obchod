using Microsoft.AspNetCore.Http;
using Obchod.Server.Models;
using System.Linq;

namespace Obchod.Server.Services
{
    public interface IAuthorizationService
    {
        bool IsAdmin(HttpContext httpContext);
    }

    public class AuthorizationService : IAuthorizationService
    {
        private readonly JwtService _jwtService;
        private readonly MyDbContext _dbContext;

        public AuthorizationService(JwtService jwtService, MyDbContext dbContext)
        {
            _jwtService = jwtService;
            _dbContext = dbContext;
        }

        public bool IsAdmin(HttpContext httpContext)
        {
            var token = httpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(token))
            {
                return false;
            }

            var userId = _jwtService.GetUserIdFromToken(token);
            if (userId == null)
            {
                return false;
            }

            var user = _dbContext.users.Find(userId);
            return user != null && user.IsAdmin;
        }
    }
}
