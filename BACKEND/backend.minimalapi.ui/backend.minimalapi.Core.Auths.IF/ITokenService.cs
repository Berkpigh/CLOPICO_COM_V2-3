using backend.minimalapi.Core.Auths.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

///
/// Contrat pour créer un service de génération de token
/// 
namespace backend.minimalapi.Core.Auths.IF
{
    public interface ITokenService
    {
        string Create(AuthenticationUser user);
        JwtSecurityToken Create(List<Claim> claims, SigningCredentials credentials, DateTime expiration);
    }
}
