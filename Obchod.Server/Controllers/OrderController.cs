using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Obchod.Server.Attributes;
using Obchod.Server.Models;
using Obchod.Server.Services;
using System.Security.Claims;

namespace Obchod.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class OrderController : ControllerBase
    {
        private readonly MyDbContext _dbContext;
        private readonly JwtService _jwtService;

        public OrderController(MyDbContext dbContext, JwtService jwtService)
        {
            _dbContext = dbContext;
            _jwtService = jwtService;
        }

        //  Get All Orders (Admin Only)
        [HttpGet]
        [SessionAuthorize("Admin")]
        public IActionResult Get()
        {
            var orders = _dbContext.orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ToList();

            var result = new List<object>();

            for (int i = 0; i < orders.Count; i++)
            {
                var order = orders[i];
                var user = _dbContext.users.FirstOrDefault(o => o.Id == order.UserID);
                result.Add(new
                {
                    order.OrderID,
                    order.DateTime,
                    order.TotalPrice,
                    order.Status,
                    order.UserID,
                    FirstName = user?.FirstName,
                    LastName = user?.LastName,
                    order.Address,
                    order.Street,
                    order.City,
                    order.PostalCode,
                    order.Country,
                    OrderItems = order.OrderItems.Select(oi => new
                    {
                        oi.OrderItemID,
                        oi.ProductID,
                        ProductName = oi.Product.Name,
                        ProductPrice = oi.Product.Price,
                        oi.Quantity
                    }).ToList()
                });
            }

            return Ok(result);
        }

        //  Get Orders for the Logged-in User
        [HttpGet("user")]
        [SessionAuthorize]
        public IActionResult GetUserOrders()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var orders = _dbContext.orders
                .Where(o => o.UserID == userId)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ToList();

            return Ok(orders);
        }

        //  Create Order (Only for Authenticated Users)
        [HttpPost]
        [SessionAuthorize]
        public IActionResult Post([FromBody] Order newOrder)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            newOrder.UserID = userId;
            newOrder.DateTime = DateTime.UtcNow;
            newOrder.Status = OrderStatus.Pending;

            if (newOrder.OrderItems == null || !newOrder.OrderItems.Any())
            {
                return BadRequest(new { message = "Order must contain at least one product." });
            }

            _dbContext.orders.Add(newOrder);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetUserOrders), newOrder);
        }

        //  Update Order (User Can Only Update Their Own Order)
        [HttpPut("{orderId}")]
        [SessionAuthorize("Admin")]
        public IActionResult Put(int orderId, [FromBody] Order updatedOrder)
        {
            var existingOrder = _dbContext.orders
                .Include(o => o.OrderItems)
                .FirstOrDefault(o => o.OrderID == orderId);

            if (existingOrder == null)
            {
                return NotFound(new { message = "Order not found " });
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

        // Cancel Order 
        [HttpGet("api/[controller]/cancel/{orderId}")]
        [SessionAuthorize]
        public IActionResult Cancel(int orderId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var order = _dbContext.orders
                .Include(o => o.OrderItems)
                .FirstOrDefault(o => o.OrderID == orderId);

            if (order == null)
            {
                return NotFound(new {message = "Order not found "});
            }
            if (order.UserID == userId)
            {
                return NotFound(new { message = "Cant cancel order " });
            }

            _dbContext.orderItems.RemoveRange(order.OrderItems);
            _dbContext.orders.Remove(order);
            _dbContext.SaveChanges();

            return Ok();
        }

        //  Delete Order (Only Admins)
        [HttpDelete("{orderId}")]
        [SessionAuthorize("Admin")]
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
