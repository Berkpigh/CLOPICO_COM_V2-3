using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using backend.minimalapi.Core.Cli.Models;
using backend.minimalapi.Core.Cli.Models.Models;
using backend.minimalapi.Core.Cli.IF;
using System.Collections.Generic;
namespace backend.minimalapi.ui;

public static class ClientInfoEndpoints
{
    public static void MapClientInfoEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/ClientInfo").WithTags(nameof(ClientInfo));

        group.MapGet("/", (IGetAllClientService serviceC) =>
        {
            IList<ClientInfo> lcliinf = serviceC.GetAllClientInfo();
            return TypedResults.Ok(lcliinf);
            //return new [] { new ClientInfo() };
        })
        .WithName("GetAllClientInfos")
        .RequireAuthorization()
        .WithOpenApi();

        group.MapGet("/{clientid}", (long clientid, IGetAllClientService serviceC) =>
        {
            ClientInfo clientInfo = new();
            clientInfo = (ClientInfo)serviceC.GetOneClientInfo(clientid);
            return clientInfo;
        })
        .WithName("GetClientInfoById")
        .RequireAuthorization()
        .WithOpenApi();

        group.MapPut("/{clientid}", (long clientid, ClientInfo input) =>
        {
            return TypedResults.NoContent();
        })
        .WithName("UpdateClientInfo")
        .RequireAuthorization()
        .WithOpenApi();

        group.MapPost("/{clientid}", (ClientInfo model, IGetAllClientService serviceC) =>
        {
            IResult result = TypedResults.BadRequest();
            FLKeys fLKeys = serviceC.PostOneClientInfo(model);
            result = TypedResults.Created($"/api/ClientInfo/{model.ClientId}", fLKeys);
            return result;
        })
        .WithName("CreateClientInfo")
        .RequireAuthorization()
        .WithOpenApi();

        group.MapDelete("/{id}", (int id) =>
        {
            //return TypedResults.Ok(new ClientInfo { ID = id });
        })
        .WithName("DeleteClientInfo")
        .RequireAuthorization()
        .WithOpenApi();
    }
}
