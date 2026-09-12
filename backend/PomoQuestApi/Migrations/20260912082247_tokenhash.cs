using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PomoQuestApi.Migrations
{
    /// <inheritdoc />
    public partial class tokenhash : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CsrfToken",
                table: "Sessions",
                newName: "CsrfTokenHash");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CsrfTokenHash",
                table: "Sessions",
                newName: "CsrfToken");
        }
    }
}
