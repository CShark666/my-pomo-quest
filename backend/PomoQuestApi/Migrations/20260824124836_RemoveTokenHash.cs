using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PomoQuestApi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTokenHash : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RevokedAt",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "TokenHash",
                table: "Sessions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "RevokedAt",
                table: "Sessions",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TokenHash",
                table: "Sessions",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
