using backend.minimalapi.Core.Auths.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.minimalapi.Core.Auths.Models
{
    public class AuthenticationDbContext : IdentityDbContext<AuthenticationUser>
    {
        #region Constructors
        public AuthenticationDbContext(DbContextOptions<AuthenticationDbContext> options) : base(options) 
        { 
        }
        public AuthenticationDbContext()
        {
        }
        #endregion
    }
}
