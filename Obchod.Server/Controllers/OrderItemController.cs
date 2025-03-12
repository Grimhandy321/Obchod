using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Obchod.Server.Models;

namespace Obchod.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class OrderItemController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public OrderItemController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var orderItems = _dbContext.orderItems.ToList();
            return Ok(orderItems);
        }

        [HttpGet("{orderId}")]
        public IActionResult Get(int orderId)
        {
            var orderItems = _dbContext.orderItems.Where(oi => oi.OrderID == orderId).ToList();
            if (!orderItems.Any())
            {
                return NotFound();
            }
            return Ok(orderItems);
        }

        [HttpPost]
        public IActionResult Post([FromBody] OrderItem orderItem)
        {
            _dbContext.orderItems.Add(orderItem);
            _dbContext.SaveChanges();
            return CreatedAtAction(nameof(Get), new { orderId = orderItem.OrderID }, orderItem);
        }

        [HttpPut("{orderItemId}")]
        public IActionResult Put(int orderItemId, [FromBody] OrderItem orderItem)
        {
            if (orderItemId != orderItem.OrderItemID)
            {
                return BadRequest("Order Item ID in URL does not match body");
            }

            var existingOrderItem = _dbContext.orderItems.Find(orderItemId);
            if (existingOrderItem == null)
            {
                return NotFound();
            }

            _dbContext.Entry(existingOrderItem).CurrentValues.SetValues(orderItem);
            _dbContext.SaveChanges();

            return Ok();
        }

        [HttpDelete("{orderItemId}")]
        public IActionResult Delete(int orderItemId)
        {
            var orderItem = _dbContext.orderItems.Find(orderItemId);
            if (orderItem == null)
            {
                return NotFound();
            }

            _dbContext.orderItems.Remove(orderItem);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
