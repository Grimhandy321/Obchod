using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Obchod.Server.Migrations
{
    /// <inheritdoc />
    public partial class cart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "orderItems",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_orderItems_UserId",
                table: "orderItems",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_orderItems_users_UserId",
                table: "orderItems",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orderItems_users_UserId",
                table: "orderItems");

            migrationBuilder.DropIndex(
                name: "IX_orderItems_UserId",
                table: "orderItems");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "orderItems");
        }
    }
}
