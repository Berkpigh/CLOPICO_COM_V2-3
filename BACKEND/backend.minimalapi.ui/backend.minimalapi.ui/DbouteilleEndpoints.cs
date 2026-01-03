using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using backend.minimalapi.Core.Prod.Models;
using backend.minimalapi.Core.Prod.Models.Models;
using backend.minimalapi.Core.Prod.IF;
namespace backend.minimalapi.ui;

public static class DbouteilleEndpoints
{
    public static void MapDbouteilleEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Dbouteille").WithTags(nameof(Dbouteille));

        group.MapGet("/", (IGetAllBouteilleService serviceC) =>
        {
            return serviceC.GetAllBouteilles();
        })
        .WithName("GetAllDbouteilles")
        .WithOpenApi();

        group.MapGet("/{id}", (int id, IGetAllBouteilleService ServiceC) =>
        {
            return ServiceC.GetOneBouteilleImages(id);
        })
        .WithName("GetDbouteilleById")
        .WithOpenApi();

        group.MapPut("/", (List<DbouteilleImage> model, IGetAllBouteilleService serviceC) =>
        {
            bool ok = false;
            ok = serviceC.PutOneBouteilleImages(model);
            return ok;
        })
        .WithName("UpdateDbouteille")
        .WithOpenApi();

        group.MapPost("/", (BouteilleProdOnly model, IGetAllBouteilleService serviceC) =>
        {
            bool ok = false;
            ok = serviceC.PostOneBoutProd(model);
            return ok;
        })
        .WithName("CreateDbouteille")
        .WithOpenApi();

        group.MapDelete("/{id}", (int id) =>
        {
            //return TypedResults.Ok(new Dbouteille { ID = id });
        })
        .WithName("DeleteDbouteille")
        .WithOpenApi();
    }
}

//group.MapPut("/{id}", (int id, Dbouteille input) =>
//{
//    return TypedResults.NoContent();
//})
//.WithName("UpdateDbouteille")
//.WithOpenApi();
