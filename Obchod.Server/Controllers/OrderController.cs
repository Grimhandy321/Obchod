using Obchod.Server.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Obchod.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class OrderController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public OrderController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var orders = _dbContext.orders.ToList();
            return Ok(orders);
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var orders = _dbContext.orders.Where(o => o.UserID == userId).ToList();
            if (!orders.Any())
            {
                return NotFound();
            }
            return Ok(orders);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Order newOrder)
        {
            _dbContext.orders.Add(newOrder);
            _dbContext.SaveChanges();
            return CreatedAtAction(nameof(Get), new { userId = newOrder.UserID }, newOrder);
        }

        [HttpPut("{orderId}")]
        public IActionResult Put(int orderId, [FromBody] Order updatedOrder)
        {
            if (orderId != updatedOrder.OrderID)
            {
                return BadRequest("Order ID in URL does not match body");
            }

            var existingOrder = _dbContext.orders.Find(orderId);
            if (existingOrder == null)
            {
                return NotFound();
            }

            _dbContext.Entry(existingOrder).CurrentValues.SetValues(updatedOrder);
            _dbContext.SaveChanges();

            return Ok();
        }

        [HttpDelete("{orderId}")]
        public IActionResult Delete(int orderId)
        {
            var order = _dbContext.orders.Find(orderId);
            if (order == null)
            {
                return NotFound();
            }

            _dbContext.orders.Remove(order);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
