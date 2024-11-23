using System.ComponentModel.DataAnnotations;

namespace Obchod.Server.Models
{
    public class User
    {
        // User ID (Primary Key)
        public int Id { get; set; }

        // User's email
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        [StringLength(100, ErrorMessage = "Email cannot be longer than 100 characters.")]
        public string Email { get; set; }

        // User's password (typically stored as a hash in a database)
        [Required]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string Password { get; set; }

        // Full name of the user
        [StringLength(100, ErrorMessage = "Full Name cannot be longer than 100 characters.")]
        public string FullName { get; set; }

        // User's role (admin, user, etc.)
        public string Role { get; set; }

        // Date the user account was created
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Date the user last updated their profile
        public DateTime? LastUpdated { get; set; }

        // Is the user active (to mark if they are disabled or banned)
        public bool IsActive { get; set; } = true;

        // User profile picture URL (optional)
    }
}
