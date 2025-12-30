using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.minimalapi.ui.Migrations.ClientDb
{
    /// <inheritdoc />
    public partial class DcontactNavigation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dcontacts_Dclients_ClientIdNavigationClientId",
                table: "Dcontacts");

            migrationBuilder.DropIndex(
                name: "IX_Dcontacts_ClientIdNavigationClientId",
                table: "Dcontacts");

            migrationBuilder.DropColumn(
                name: "ClientIdNavigationClientId",
                table: "Dcontacts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ClientIdNavigationClientId",
                table: "Dcontacts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Dcontacts_ClientIdNavigationClientId",
                table: "Dcontacts",
                column: "ClientIdNavigationClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dcontacts_Dclients_ClientIdNavigationClientId",
                table: "Dcontacts",
                column: "ClientIdNavigationClientId",
                principalTable: "Dclients",
                principalColumn: "ClientId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
