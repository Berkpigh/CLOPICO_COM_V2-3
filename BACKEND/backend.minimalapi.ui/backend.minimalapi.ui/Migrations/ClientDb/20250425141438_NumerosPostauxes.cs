using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.minimalapi.ui.Migrations.ClientDb
{
    /// <inheritdoc />
    public partial class NumerosPostauxes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NumerosPostauxes",
                columns: table => new
                {
                    NumerosPostauxId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NuméroPostal = table.Column<int>(type: "int", nullable: false),
                    Localité = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NuméroAdditionnel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Commune = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Canton = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Langue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NuméroAFS = table.Column<int>(type: "int", nullable: false),
                    StatutLivraison = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NumerosPostauxes", x => x.NumerosPostauxId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NumerosPostauxes");
        }
    }
}
