using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using backend.minimalapi.Core.Cli.Models;
using backend.minimalapi.Core.Cli.IF;
using backend.minimalapi.Core.Cli.Services;
namespace backend.minimalapi.ui;

public static class DclientEndpoints
{
    public static void MapDclientEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Dclient").WithTags(nameof(Dclient));

        group.MapGet("/", (IGetAllClientService serviceC) =>
        {
            return serviceC.GetAllClient();
        })
        .WithName("GetAllDclients")
        .WithOpenApi();

        group.MapGet("/{id}", (long clientid, IGetAllClientService serviceC) =>
        {
            Dclient cli = new();
            cli = (Dclient)serviceC.GetOneClient(clientid);
            return cli;
        })
        .WithName("GetDclientById")
        //.RequireAuthorization()
        .WithOpenApi();

        group.MapPut("/{id}", (int id, Dclient input) =>
        {
            return TypedResults.NoContent();
        })
        .WithName("UpdateDclient")
        .WithOpenApi();

        group.MapPost("/", (Dclient model) =>
        {
            //return TypedResults.Created($"/api/Dclients/{model.ID}", model);
        })
        .WithName("CreateDclient")
        .WithOpenApi();

        group.MapDelete("/{id}", (int id) =>
        {
            //return TypedResults.Ok(new Dclient { ID = id });
        })
        .WithName("DeleteDclient")
        .WithOpenApi();
    }
}
