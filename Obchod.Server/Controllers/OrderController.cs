using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Obchod.Server.Models;
using Obchod.Server.Services;
using System.Security.Claims;

namespace Obchod.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    [Authorize] // Requires authentication for all routes
    public class OrderController : ControllerBase
    {
        private readonly MyDbContext _dbContext;
        private readonly IJwtService _jwtService;

        public OrderController(MyDbContext dbContext, IJwtService jwtService)
        {
            _dbContext = dbContext;
            _jwtService = jwtService;
        }

        //  Get All Orders (Admin Only)
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IActionResult Get()
        {
            var orders = _dbContext.orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ToList();

            return Ok(orders);
        }

        //  Get Orders for the Logged-in User
        [HttpGet("user")]
        public IActionResult GetUserOrders()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var orders = _dbContext.orders
                .Where(o => o.UserID == int.Parse(userId))
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ToList();

            return Ok(orders);
        }

        //  Create Order (Only for Authenticated Users)
        [HttpPost]
        public IActionResult Post([FromBody] Order newOrder)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            newOrder.UserID = int.Parse(userId);

            if (newOrder.OrderItems == null || !newOrder.OrderItems.Any())
            {
                return BadRequest("Order must contain at least one product.");
            }

            _dbContext.orders.Add(newOrder);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetUserOrders), newOrder);
        }

        //  Update Order (User Can Only Update Their Own Order)
        [HttpPut("{orderId}")]
        public IActionResult Put(int orderId, [FromBody] Order updatedOrder)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var existingOrder = _dbContext.orders
                .Include(o => o.OrderItems)
                .FirstOrDefault(o => o.OrderID == orderId);

            if (existingOrder == null)
            {
                return NotFound();
            }

            // Ensure user can only update their own orders
            if (existingOrder.UserID != int.Parse(userId))
            {
                return Forbid();
            }

            _dbContext.Entry(existingOrder).CurrentValues.SetValues(updatedOrder);

            _dbContext.orderItems.RemoveRange(existingOrder.OrderItems);
            foreach (var item in updatedOrder.OrderItems)
            {
                _dbContext.orderItems.Add(new OrderItem
                {
                    OrderID = orderId,
                    ProductID = item.ProductID,
                    Quantity = item.Quantity
                });
            }

            _dbContext.SaveChanges();
            return Ok();
        }

        //  Delete Order (Only Admins)
        [HttpDelete("{orderId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int orderId)
        {
            var order = _dbContext.orders
                .Include(o => o.OrderItems)
                .FirstOrDefault(o => o.OrderID == orderId);

            if (order == null)
            {
                return NotFound();
            }

            _dbContext.orderItems.RemoveRange(order.OrderItems);
            _dbContext.orders.Remove(order);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
