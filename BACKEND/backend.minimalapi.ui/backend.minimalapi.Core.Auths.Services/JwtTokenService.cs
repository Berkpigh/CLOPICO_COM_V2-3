using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using backend.minimalapi.Core.Auths.IF;
using backend.minimalapi.Core.Auths.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.minimalapi.Core.Auths.Services
{
    public class JwtTokenService : ITokenService
    {
        #region Fields
        private const int ExpirationMinutes = 30;
        private readonly IConfiguration configuration;
        #endregion

        #region Constructors
        public JwtTokenService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        #endregion
        #region Public methods
        public string Create(AuthenticationUser user)
        {
            var expiration = DateTime.UtcNow.AddMinutes(ExpirationMinutes);
            var token = Create(
                CreateClaims(user),
                CreateSigningCredentials(),
                expiration
            );
            var tokenHandler = new JwtSecurityTokenHandler();

            return tokenHandler.WriteToken(token);
        }

        public JwtSecurityToken Create(List<Claim> claims, SigningCredentials credentials, DateTime expiration)
        {
            return new JwtSecurityToken(
                configuration.GetSection("JwtTokenSettings")["ValidIssuer"],
                configuration.GetSection("JwtTokenSettings")["ValidAudience"],
                claims,
                expires: expiration,
                signingCredentials: credentials
            );
        }
        #endregion

        #region Internal method

        private List<Claim> CreateClaims(AuthenticationUser user)
        {
            var jwtSub = configuration.GetSection("JwtTokenSettings")["JwtRegisteredClaimNamesSub"];

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, jwtSub!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName!),
                new Claim(ClaimTypes.Email, user.Email!)
            };
            return claims;
        }
        private SigningCredentials CreateSigningCredentials()
        {
            var symmetricSecurityKey = this.configuration.GetSection("JwtTokenSettings")["SymmetricSecurityKey"];

            return new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(symmetricSecurityKey!)
                ),
                    SecurityAlgorithms.HmacSha256
            );
        }

        #endregion
    }
}
