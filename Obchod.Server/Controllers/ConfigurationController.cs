using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Obchod.Server.Controllers
{
    [ApiController]
    [Route("api/")]
    public class ConfigurationController : ControllerBase
    {
        [HttpGet("getTranslations")]
        public string GetAll()
        {
            return "asd";
        }


        [HttpGet]
        [Route("/testToken")]
        public IActionResult GetSecureData()
        {
            return Ok(new { Message = "This is a secure endpoint" });
        }
    }
}
