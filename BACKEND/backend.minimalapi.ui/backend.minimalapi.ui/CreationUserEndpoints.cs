using Microsoft.AspNetCore.Identity;
using backend.minimalapi.Core.Auths.Models;
using backend.minimalapi.Core.Auths.IF;
using backend.minimalapi.Core.Cli.IF;
using Microsoft.AspNetCore.Http;
using System.Drawing.Text;
using System.Diagnostics;
using backend.minimalapi.Core.Cli.Models;
using Microsoft.AspNetCore.Mvc;
namespace backend.minimalapi.ui;

public static class CreationUserEndpoints
{
    public static void MapCreationUserEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Register").WithTags(nameof(CreationUser));

        group.MapPost("/", async (CreationUser model, IRoleService serviceR, IClientService serviceC, UserManager<AuthenticationUser> userManager) =>
        {
            IResult result = TypedResults.BadRequest();

            serviceR.createRoles();

            var user = await userManager.FindByEmailAsync(model.Email.ToLower());
            if (user == null)
            {
                string un = DateTime.Now.ToString();
                un = un.Replace(".", "");
                un = un.Replace(":", "");
                un = un.Replace(" ", "");
                var resultCreationUser = await userManager.CreateAsync(new AuthenticationUser()
                {
                    UserName = un,
                    Email = model.Email.ToLower(),
                }, model.Password);
                if (!resultCreationUser.Succeeded)
                {
                    string errD = "";
                    foreach (IdentityError err in resultCreationUser.Errors)
                    {
                        //Debug.WriteLine(err.Code);
                        //Debug.WriteLine(err.Description);
                        errD = errD + "," + err.Description;
                    }
                    string errDesc = errD.Replace(",", "\n");
                    //IResult CR = TypedResults.Text({ Content = errDesc, statusCode = 400, ContentType = "application/json" };
                    return result;
                }
                user = await userManager.FindByEmailAsync(model.Email.ToLower());
                if (!(user == null))
                {
                    model.RoleName = serviceR.getRoleName(model.RoleName);
                    string rid = serviceR.getRoleId(model.RoleName);
                    serviceR.createUserRole(user.Id,rid);

                    //=================================================================================================
                    // --- *  --- * Un User avec rôle "hôte" existe-t-il dans la table AspNetUsers ? Sinon on le crée
                    //string hostid = serviceR.checkCreateHostUser();
                    //if (hostid == "")
                    //{
                    //    var resultCreationHostUser = await userManager.CreateAsync(new AuthenticationUser()
                    //    {
                    //        UserName = "Hôte",
                    //        Email = "hostztr.ewq@poi.com",
                    //    }, "Hostpwd_918273");
                    //    if (!resultCreationUser.Succeeded)
                    //    {
                    //        string errD = "";
                    //        foreach (IdentityError err in resultCreationUser.Errors)
                    //        {
                    //            //Debug.WriteLine(err.Code);
                    //            //Debug.WriteLine(err.Description);
                    //            errD = errD + "," + err.Description;
                    //        }
                    //        string errDesc = errD.Replace(",", "\n");
                    //        //IResult CR = TypedResults.Text({ Content = errDesc, statusCode = 400, ContentType = "application/json" };
                    //    }
                    //}
                    // =========================================================================================

                    long nextcliid = serviceC.getNextClientId();
                    Dclient dcli = new();
                    dcli.ClientId = nextcliid;
                    dcli.OwnerId = user.Id;
                    dcli.Nom = model.Name;
                    dcli.Prénom = model.FirstName;
                    dcli.DateContact = DateTime.Now;
                    serviceC.createClient(dcli);

                    result = TypedResults.Ok(new { email = model.Email, nom = model.Name, prénom = model.FirstName, roleName= model.RoleName });
                }
            }

            return result;
        })
        .WithName("CreateCreationUser")
        .WithOpenApi();

        group.MapPost("/Host/", async (UserManager<AuthenticationUser> userManager) =>
        {
            IResult result = TypedResults.BadRequest();

            var user = await userManager.FindByEmailAsync("hostztr.ewq@poi.com");
            if (user == null)
            {
                string un = DateTime.Now.ToString();
                un = un.Replace(".", "");
                un = un.Replace(":", "");
                un = un.Replace(" ", "");
                var resultCreationUser = await userManager.CreateAsync(new AuthenticationUser()
                {
                    UserName = un,
                    Email = "hostztr.ewq@poi.com",
                }, "Hostpwd_918273");
                if (!resultCreationUser.Succeeded)
                {
                    string errD = "";
                    foreach (IdentityError err in resultCreationUser.Errors)
                    {
                        errD = errD + "," + err.Description;
                    }
                    string errDesc = errD.Replace(",", "\n");
                    return result;
                }
                result = TypedResults.Ok();
            }
            return result;
        })
        .WithName("CreateHostUser")
        .WithOpenApi();
    }
}
