using backend.minimalapi.Core.Cli.Models.Models;
using backend.minimalapi.Core.Prod.IF;
using backend.minimalapi.Core.Prod.Models;
using backend.minimalapi.Core.Prod.Models.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OpenApi;
namespace backend.minimalapi.ui;

public static class DcuvéeEndpoints
{
    public static void MapDcuvéeEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Dcuvée").WithTags(nameof(Dcuvée));

        group.MapGet("/", (IGetAllCuvéeService serviceC) =>
        {
            return serviceC.GetAllCuvée();
        })
        .WithName("GetAllDcuvées")
        .WithOpenApi();

        group.MapGet("/{id}", (int id) =>
        {
            return id;
        })
        .WithName("GetDcuvéeById")
        .WithOpenApi();

        group.MapPut("/{id}", (int id, Dcuvée input) =>
        {
            return TypedResults.NoContent();
        })
        .WithName("UpdateDcuvée")
        .WithOpenApi();

        group.MapPost("/", (CuveBoutProd model, IGetAllCuvéeService serviceC) =>
        {
            IResult result = TypedResults.BadRequest();
            bool ok = serviceC.PostOneCuvée(model);
            result = TypedResults.Created($"/api/Dcuvée/{model.CuvéeId}", ok);
        })
        .WithName("CreateDcuvée")
        //.RequireAuthorization()
        .WithOpenApi();

        group.MapDelete("/{id}", (int id) =>
        {
            //return TypedResults.Ok(new Dcuvée { ID = id });
        })
        .WithName("DeleteDcuvée")
        .WithOpenApi();
    }
}
