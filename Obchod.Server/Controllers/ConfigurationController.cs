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
    }
}
