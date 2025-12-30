using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using backend.minimalapi.Core.Prod.Models;
using backend.minimalapi.Core.Prod.IF;
using backend.minimalapi.Core.Prod.Models.Models;

namespace backend.minimalapi.ui
{
    public static class DcuvéeBDEndpoints
    {
        public static void MapDcuvéeBDEndpoints(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/api/DcuvéeBD").WithTags(nameof(Dcuvée));

            group.MapGet("/", (IGetAllCuvéeeDBService serviceC) =>
            {
                List<CuvéeDBOnly> lcuvéeonly = new List<CuvéeDBOnly>();
                lcuvéeonly = serviceC.GetAllCuvéeOnlyDB();
                return lcuvéeonly;
            })
            .WithName("GetAllDcuvéesBD")
            .WithOpenApi();

            group.MapGet("/{id}", (int CuvéeId, IGetAllCuvéeeDBService serviceC) =>
            {
                Dcuvée dcuvée = new Dcuvée();
                dcuvée = (Dcuvée)serviceC.GetOneCuvéeDB(CuvéeId);
                return dcuvée;
            })
            .WithName("GetDcuvéeBDById")
            .WithOpenApi();

            group.MapPut("/{id}", (int CuvéeId, Dcuvée input) =>
            {
                return TypedResults.NoContent();
            })
            .WithName("UpdateDcuvéeBD")
            .WithOpenApi();

            group.MapPost("/", (CuvéeDBOnly model, IGetAllCuvéeeDBService serviceC) =>
            {
                bool ok = false;
                ok = serviceC.PostOneCuvéeDB(model);
                return ok;
            })
            .WithName("CreateDcuvéeBD")
            .WithOpenApi();

            group.MapDelete("/{id}", (int id) =>
            {
                //return TypedResults.Ok(new Dcuvée { ID = id });
            })
            .WithName("DeleteDcuvéeBD")
            .WithOpenApi();
        }
    }
}

