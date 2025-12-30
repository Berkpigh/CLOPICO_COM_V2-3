using Microsoft.AspNetCore.Identity;
using backend.minimalapi.Core.Auths.Models;
using backend.minimalapi.Core.Auths.IF;
using backend.minimalapi.Core.Cli.IF;
using backend.minimalapi.Core.Cli.Models;
namespace backend.minimalapi.ui;

public static class LoginUserEndpoints
{
    public static void MapLoginUserEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Login").WithTags(nameof(LoginUser));

        group.MapPost("/", async (LoginUser model,
                                    UserManager<AuthenticationUser> userManager,
                                    ITokenService tokenService,
                                    IRoleService serviceR,
                                    IClientService serviceC) =>
        {
            IResult result = TypedResults.BadRequest("Login ou Mot de passe erroné");

            var user = await userManager.FindByEmailAsync(model.Login);
            if (user != null)
            {
                bool passwordIsValid = await userManager.CheckPasswordAsync(user, model.Password);
                if (passwordIsValid)
                {
                    var token = tokenService.Create(user);
                    string roleid = serviceR.getUserRoleRoleId(user.Id);
                    string rolename = serviceR.getRoleNameById(roleid);
                    long clientid = serviceC.getClientId(user.Id);
                    result = TypedResults.Ok(new { email = model.Login, token = token, roleName = rolename, clientid = clientid });
                }
            }

            return result;

        })
        .WithName("CreateLoginUser")
        .WithOpenApi();

        group = routes.MapGroup("/api/Login").WithTags(nameof(LoginUser));

        group.MapPost("/Host/", async (UserManager<AuthenticationUser> userManager,
                                    ITokenService tokenService,
                                    IRoleService serviceR,
                                    IClientService serviceC) =>
        {
            IResult result = TypedResults.BadRequest("Login ou Mot de passe erroné");

            var user = await userManager.FindByEmailAsync("hostztr.ewq@poi.com");
            if (user != null)
            {
                bool passwordIsValid = await userManager.CheckPasswordAsync(user, "Hostpwd_918273");
                if (passwordIsValid)
                {
                    // --- *  --- *  Création du client avec OwnerId = unique pour le rôle "hôte"
                    long nextcliid = serviceC.getNextClientId();
                    Dclient dcli = new();
                    dcli.ClientId = nextcliid;
                    dcli.OwnerId = user.Id;
                    dcli.Nom = "Nom hôte";
                    dcli.Prénom = "Prénom hôte";
                    dcli.DateContact = DateTime.Now;
                    serviceC.createClient(dcli);

                    string rid = serviceR.getRoleId("hôte");
                    serviceR.createUserRole(user.Id, rid);

                    var token = tokenService.Create(user);
                    long clientid = serviceC.getClientId(user.Id);
                    result = TypedResults.Ok(new { email = "", token = token, roleName = "hôte", clientid = clientid });
                }
            }

            return result;

        })
        .WithName("CreateLoginHostUser")
        .WithOpenApi();
    }
}
