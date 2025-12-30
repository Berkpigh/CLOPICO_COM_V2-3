using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;

#nullable disable

namespace backend.minimalapi.ui.Migrations.ClientDb
{
    /// <inheritdoc />
    public partial class Dclient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dclients",
                columns: table => new
                {
                    ClientId = table.Column<long>(type: "bigint", nullable: false),
                    OwnerId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prénom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateContact = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dclients", x => x.ClientId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dclients");
        }
    }


public static class ClientDbContextModelSnapshotEndpoints
{
	public static void MapClientDbContextModelSnapshotEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/ClientDbContextModelSnapshot").WithTags(nameof(ClientDbContextModelSnapshot));

        group.MapGet("/", () =>
        {
            return new [] { new ClientDbContextModelSnapshot() };
        })
        .WithName("GetAllClientDbContextModelSnapshots")
        .WithOpenApi();

        group.MapGet("/{id}", (int id) =>
        {
            //return new ClientDbContextModelSnapshot { ID = id };
        })
        .WithName("GetClientDbContextModelSnapshotById")
        .WithOpenApi();

        group.MapPut("/{id}", (int id, ClientDbContextModelSnapshot input) =>
        {
            return TypedResults.NoContent();
        })
        .WithName("UpdateClientDbContextModelSnapshot")
        .WithOpenApi();

        group.MapPost("/", (ClientDbContextModelSnapshot model) =>
        {
            //return TypedResults.Created($"/api/ClientDbContextModelSnapshots/{model.ID}", model);
        })
        .WithName("CreateClientDbContextModelSnapshot")
        .WithOpenApi();

        group.MapDelete("/{id}", (int id) =>
        {
            //return TypedResults.Ok(new ClientDbContextModelSnapshot { ID = id });
        })
        .WithName("DeleteClientDbContextModelSnapshot")
        .WithOpenApi();
    }
}}
