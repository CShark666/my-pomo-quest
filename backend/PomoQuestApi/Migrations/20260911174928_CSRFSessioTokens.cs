using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PomoQuestApi.Migrations
{
    /// <inheritdoc />
    public partial class CSRFSessioTokens : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CsrfToken",
                table: "Sessions",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CsrfToken",
                table: "Sessions");
        }
    }
}
