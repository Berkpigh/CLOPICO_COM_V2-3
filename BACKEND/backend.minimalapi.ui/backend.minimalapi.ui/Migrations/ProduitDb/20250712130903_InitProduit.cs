using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.minimalapi.ui.Migrations.ProduitDb
{
    /// <inheritdoc />
    public partial class InitProduit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DcommandesClients",
                columns: table => new
                {
                    CommandeId = table.Column<long>(type: "bigint", nullable: false),
                    ClientId = table.Column<long>(type: "bigint", nullable: false),
                    IdContactFacturation = table.Column<int>(type: "int", nullable: false),
                    IdContactLivraison = table.Column<int>(type: "int", nullable: false),
                    DateCommande = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateFacturation = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateLivraison = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MontantCommande = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    GesteCommercial = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Commentaire = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StatutCommande = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DcommandesClients", x => x.CommandeId);
                });

            migrationBuilder.CreateTable(
                name: "Dcuvées",
                columns: table => new
                {
                    CuvéeId = table.Column<int>(type: "int", nullable: false),
                    AnnéeCuvée = table.Column<int>(type: "int", nullable: false),
                    TypeCuvée = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LibelléCuvée = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dcuvées", x => x.CuvéeId);
                });

            migrationBuilder.CreateTable(
                name: "Dlangues",
                columns: table => new
                {
                    LangueId = table.Column<int>(type: "int", nullable: false),
                    Langue = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dlangues", x => x.LangueId);
                });

            migrationBuilder.CreateTable(
                name: "DlignesCommandes",
                columns: table => new
                {
                    LignesCommandeId = table.Column<long>(type: "bigint", nullable: false),
                    CommandeId = table.Column<long>(type: "bigint", nullable: false),
                    NuméroLigne = table.Column<int>(type: "int", nullable: false),
                    ProduitId = table.Column<long>(type: "bigint", nullable: false),
                    QuantitéProduit = table.Column<short>(type: "smallint", nullable: false),
                    SoldeQuantitéProduit = table.Column<short>(type: "smallint", nullable: false),
                    MontantLigne = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FraisLivraison = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MontantTVA = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DcommandesClientCommandeId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DlignesCommandes", x => x.LignesCommandeId);
                    table.ForeignKey(
                        name: "FK_DlignesCommandes_DcommandesClients_DcommandesClientCommandeId",
                        column: x => x.DcommandesClientCommandeId,
                        principalTable: "DcommandesClients",
                        principalColumn: "CommandeId");
                });

            migrationBuilder.CreateTable(
                name: "Dbouteilles",
                columns: table => new
                {
                    BouteilleId = table.Column<int>(type: "int", nullable: false),
                    CuvéeId = table.Column<int>(type: "int", nullable: false),
                    LibelléBouteille = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Capacité = table.Column<int>(type: "int", nullable: false),
                    DcuvéeCuvéeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dbouteilles", x => x.BouteilleId);
                    table.ForeignKey(
                        name: "FK_Dbouteilles_Dcuvées_DcuvéeCuvéeId",
                        column: x => x.DcuvéeCuvéeId,
                        principalTable: "Dcuvées",
                        principalColumn: "CuvéeId");
                });

            migrationBuilder.CreateTable(
                name: "DdescriptionCuvées",
                columns: table => new
                {
                    DescriptionCuvéeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CuvéeId = table.Column<int>(type: "int", nullable: false),
                    Langue = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescriptionLongue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DcuvéeCuvéeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DdescriptionCuvées", x => x.DescriptionCuvéeId);
                    table.ForeignKey(
                        name: "FK_DdescriptionCuvées_Dcuvées_DcuvéeCuvéeId",
                        column: x => x.DcuvéeCuvéeId,
                        principalTable: "Dcuvées",
                        principalColumn: "CuvéeId");
                });

            migrationBuilder.CreateTable(
                name: "DbouteilleImages",
                columns: table => new
                {
                    BouteilleImageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
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

            migrationBuilder.CreateTable(
                name: "Dproduits",
                columns: table => new
                {
                    ProduitId = table.Column<long>(type: "bigint", nullable: false),
                    BouteilleId = table.Column<int>(type: "int", nullable: false),
                    LibelléProduit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NombreBouteilles = table.Column<short>(type: "smallint", nullable: false),
                    PrixTTC = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FraisPoste = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    QuantitéMinimum = table.Column<short>(type: "smallint", nullable: false),
                    DatePeremption = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DbouteilleBouteilleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dproduits", x => x.ProduitId);
                    table.ForeignKey(
                        name: "FK_Dproduits_Dbouteilles_DbouteilleBouteilleId",
                        column: x => x.DbouteilleBouteilleId,
                        principalTable: "Dbouteilles",
                        principalColumn: "BouteilleId");
                });

            migrationBuilder.CreateTable(
                name: "Dstocks",
                columns: table => new
                {
                    StockId = table.Column<int>(type: "int", nullable: false),
                    BouteilleId = table.Column<int>(type: "int", nullable: false),
                    QuantitéEntrée = table.Column<int>(type: "int", nullable: false),
                    DateEntrée = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ValeurEntrée = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ValeurVendue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ValeurSolde = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    QuantitéRéserve = table.Column<int>(type: "int", nullable: false),
                    QuantitéSolde = table.Column<int>(type: "int", nullable: false),
                    DbouteilleBouteilleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dstocks", x => x.StockId);
                    table.ForeignKey(
                        name: "FK_Dstocks_Dbouteilles_DbouteilleBouteilleId",
                        column: x => x.DbouteilleBouteilleId,
                        principalTable: "Dbouteilles",
                        principalColumn: "BouteilleId");
                });

            migrationBuilder.CreateTable(
                name: "DproduitActions",
                columns: table => new
                {
                    ProduitActionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProduitId = table.Column<long>(type: "bigint", nullable: false),
                    ActionDesc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ActionPourcent = table.Column<int>(type: "int", nullable: false),
                    DébutAction = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FinAction = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DproduitProduitId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DproduitActions", x => x.ProduitActionId);
                    table.ForeignKey(
                        name: "FK_DproduitActions_Dproduits_DproduitProduitId",
                        column: x => x.DproduitProduitId,
                        principalTable: "Dproduits",
                        principalColumn: "ProduitId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DbouteilleImages_DbouteilleBouteilleId",
                table: "DbouteilleImages",
                column: "DbouteilleBouteilleId");

            migrationBuilder.CreateIndex(
                name: "IX_Dbouteilles_DcuvéeCuvéeId",
                table: "Dbouteilles",
                column: "DcuvéeCuvéeId");

            migrationBuilder.CreateIndex(
                name: "IX_DdescriptionCuvées_DcuvéeCuvéeId",
                table: "DdescriptionCuvées",
                column: "DcuvéeCuvéeId");

            migrationBuilder.CreateIndex(
                name: "IX_DlignesCommandes_DcommandesClientCommandeId",
                table: "DlignesCommandes",
                column: "DcommandesClientCommandeId");

            migrationBuilder.CreateIndex(
                name: "IX_DproduitActions_DproduitProduitId",
                table: "DproduitActions",
                column: "DproduitProduitId");

            migrationBuilder.CreateIndex(
                name: "IX_Dproduits_DbouteilleBouteilleId",
                table: "Dproduits",
                column: "DbouteilleBouteilleId");

            migrationBuilder.CreateIndex(
                name: "IX_Dstocks_DbouteilleBouteilleId",
                table: "Dstocks",
                column: "DbouteilleBouteilleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DbouteilleImages");

            migrationBuilder.DropTable(
                name: "DdescriptionCuvées");

            migrationBuilder.DropTable(
                name: "Dlangues");

            migrationBuilder.DropTable(
                name: "DlignesCommandes");

            migrationBuilder.DropTable(
                name: "DproduitActions");

            migrationBuilder.DropTable(
                name: "Dstocks");

            migrationBuilder.DropTable(
                name: "DcommandesClients");

            migrationBuilder.DropTable(
                name: "Dproduits");

            migrationBuilder.DropTable(
                name: "Dbouteilles");

            migrationBuilder.DropTable(
                name: "Dcuvées");
        }
    }
}
