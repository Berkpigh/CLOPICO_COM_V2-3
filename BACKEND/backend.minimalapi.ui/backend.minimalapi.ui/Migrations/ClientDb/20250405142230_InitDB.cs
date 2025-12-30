using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.minimalapi.ui.Migrations.ClientDb
{
    /// <inheritdoc />
    public partial class InitDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dcontacts",
                columns: table => new
                {
                    ContactId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<long>(type: "bigint", nullable: false),
                    DtypeContactId = table.Column<short>(type: "smallint", nullable: false),
                    Cnom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cprénom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdresseMail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TélPortable = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TélFixe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Adresse1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Adresse2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ville = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pays = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NuméroPostal = table.Column<int>(type: "int", nullable: true),
                    ClientIdNavigationClientId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dcontacts", x => x.ContactId);
                    table.ForeignKey(
                        name: "FK_Dcontacts_Dclients_ClientIdNavigationClientId",
                        column: x => x.ClientIdNavigationClientId,
                        principalTable: "Dclients",
                        principalColumn: "ClientId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dcontacts_ClientIdNavigationClientId",
                table: "Dcontacts",
                column: "ClientIdNavigationClientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dcontacts");
        }
    }
}
