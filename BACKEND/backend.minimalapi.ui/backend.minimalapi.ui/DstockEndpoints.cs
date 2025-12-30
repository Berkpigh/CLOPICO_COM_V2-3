using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using backend.minimalapi.Core.Prod.Models;
namespace backend.minimalapi.ui;

public static class DstockEndpoints
{
    public static void MapDstockEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Dstock").WithTags(nameof(Dstock));

        group.MapGet("/", () =>
        {
            return new [] { new Dstock() };
        })
        .WithName("GetAllDstocks")
        .WithOpenApi();

        group.MapGet("/{id}", (int id) =>
        {
            //return new Dstock { ID = id };
        })
        .WithName("GetDstockById")
        .WithOpenApi();

        group.MapPut("/{id}", (int id, Dstock input) =>
        {
            return TypedResults.NoContent();
        })
        .WithName("UpdateDstock")
        .WithOpenApi();

        group.MapPost("/", (Dstock model) =>
        {
            //return TypedResults.Created($"/api/Dstocks/{model.ID}", model);
        })
        .WithName("CreateDstock")
        .WithOpenApi();

        group.MapDelete("/{id}", (int id) =>
        {
            //return TypedResults.Ok(new Dstock { ID = id });
        })
        .WithName("DeleteDstock")
        .WithOpenApi();
    }
}
