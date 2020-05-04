using Microsoft.EntityFrameworkCore.Migrations;

namespace Happnin.Data.Migrations
{
    public partial class Attend : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Lat",
                table: "Locations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Lng",
                table: "Locations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Lng",
                table: "Locations");
        }
    }
}
