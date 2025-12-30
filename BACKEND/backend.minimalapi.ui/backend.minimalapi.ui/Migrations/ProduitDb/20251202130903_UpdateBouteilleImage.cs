using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.minimalapi.ui.Migrations.ProduitDb
{
    /// <inheritdoc />
    public partial class UpdateBouteilleImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DbouteilleImages",
                columns: table => new
                {
                    BouteilleImageId = table.Column<int>(type: "int", nullable: false),
                    BouteilleId = table.Column<int>(type: "int", nullable: false),
                    ImageDesc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DbouteilleBouteilleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DbouteilleImages", x => x.BouteilleImageId);
                    table.ForeignKey(
                        name: "FK_DbouteilleImages_Dbouteilles_DbouteilleBouteilleId",
                        column: x => x.DbouteilleBouteilleId,
                        principalTable: "Dbouteilles",
                        principalColumn: "BouteilleId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DbouteilleImages_DbouteilleBouteilleId",
                table: "DbouteilleImages",
                column: "DbouteilleBouteilleId");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DbouteilleImages");

        }
    }
}
