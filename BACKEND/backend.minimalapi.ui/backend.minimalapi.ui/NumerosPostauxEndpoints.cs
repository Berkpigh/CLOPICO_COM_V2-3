using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using backend.minimalapi.Core.Cli.Models;
using backend.minimalapi.Core.Cli.Models.Models;
using backend.minimalapi.Core.Cli.IF;
namespace backend.minimalapi.ui;

public static class NumerosPostauxEndpoints
{
    public static void MapNumerosPostauxEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/NumerosPostaux").WithTags(nameof(NumerosPostaux));

        group.MapGet("/", (IGetAllNPService serviceC) =>
        {
            IEnumerable<NumPosShort> nps = serviceC.GetAllNPServiceNPs();
            return TypedResults.Ok(nps);
        })
        .WithName("GetAllNumerosPostauxes")
        .WithOpenApi();

        group.MapGet("/{id}", (int id) =>
        {
            //return new NumerosPostaux { ID = id };
        })
        .WithName("GetNumerosPostauxById")
        .WithOpenApi();

        group.MapPut("/{id}", (int id, NumerosPostaux input) =>
        {
            return TypedResults.NoContent();
        })
        .WithName("UpdateNumerosPostaux")
        .WithOpenApi();

        group.MapPost("/", (NumerosPostaux model) =>
        {
            //return TypedResults.Created($"/api/NumerosPostauxes/{model.ID}", model);
        })
        .WithName("CreateNumerosPostaux")
        .WithOpenApi();

        group.MapDelete("/{id}", (int id) =>
        {
            //return TypedResults.Ok(new NumerosPostaux { ID = id });
        })
        .WithName("DeleteNumerosPostaux")
        .WithOpenApi();
    }
}
