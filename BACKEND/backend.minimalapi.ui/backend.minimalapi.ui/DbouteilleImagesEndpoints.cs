using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using backend.minimalapi.Core.Prod.Models;
namespace backend.minimalapi.ui;

public static class DbouteilleImageEndpoints
{
    public static void MapDbouteilleImageEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/DbouteilleImage").WithTags(nameof(DbouteilleImage));

        group.MapGet("/", () =>
        {
            return new [] { new DbouteilleImage() };
        })
        .WithName("GetAllDbouteilleImages")
        .WithOpenApi();

        group.MapGet("/{id}", (int id) =>
        {
            //return new DbouteilleImages { ID = id };
        })
        .WithName("GetDbouteilleImagesById")
        .WithOpenApi();

        group.MapPut("/{id}", (int id, DbouteilleImage input) =>
        {
            return TypedResults.NoContent();
        })
        .WithName("UpdateDbouteilleImages")
        .WithOpenApi();

        group.MapPost("/", (DbouteilleImage model) =>
        {
            //return TypedResults.Created($"/api/DbouteilleImagess/{model.ID}", model);
        })
        .WithName("CreateDbouteilleImages")
        .WithOpenApi();

        group.MapDelete("/{id}", (int id) =>
        {
            //return TypedResults.Ok(new DbouteilleImages { ID = id });
        })
        .WithName("DeleteDbouteilleImages")
        .WithOpenApi();
    }
}
