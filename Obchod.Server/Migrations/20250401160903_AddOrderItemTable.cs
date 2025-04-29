using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Obchod.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderItemTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "productSizes");

            migrationBuilder.RenameColumn(
                name: "ProductSizeID",
                table: "orderItems",
                newName: "ProductID");

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_orderItems_OrderID",
                table: "orderItems",
                column: "OrderID");

            migrationBuilder.CreateIndex(
                name: "IX_orderItems_ProductID",
                table: "orderItems",
                column: "ProductID");

            migrationBuilder.AddForeignKey(
                name: "FK_orderItems_orders_OrderID",
                table: "orderItems",
                column: "OrderID",
                principalTable: "orders",
                principalColumn: "OrderID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orderItems_products_ProductID",
                table: "orderItems",
                column: "ProductID",
                principalTable: "products",
                principalColumn: "ProductID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orderItems_orders_OrderID",
                table: "orderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_orderItems_products_ProductID",
                table: "orderItems");

            migrationBuilder.DropIndex(
                name: "IX_orderItems_OrderID",
                table: "orderItems");

            migrationBuilder.DropIndex(
                name: "IX_orderItems_ProductID",
                table: "orderItems");

            migrationBuilder.DropColumn(
                name: "Count",
                table: "products");

            migrationBuilder.RenameColumn(
                name: "ProductID",
                table: "orderItems",
                newName: "ProductSizeID");

            migrationBuilder.CreateTable(
                name: "productSizes",
                columns: table => new
                {
                    ProductSizeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Size = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productSizes", x => x.ProductSizeID);
                });
        }
    }
}
