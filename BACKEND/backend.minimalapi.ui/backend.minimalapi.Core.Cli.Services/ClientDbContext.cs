using Microsoft.EntityFrameworkCore;
using backend.minimalapi.Core.Cli.Models;

namespace backend.minimalapi.Core.Cli.Models
{
    public class ClientDbContext : DbContext
    {
        #region Constructors
        public ClientDbContext(DbContextOptions<ClientDbContext> options) : base(options) { }
        
        protected ClientDbContext() { }
        #endregion

        #region Internal Methods
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dclient>()
                .Property(b => b.ClientId)
                .ValueGeneratedNever();
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Game>().ToTable("Game");
        }

        #endregion

        #region Properties
        public DbSet<Dclient> Dclients { get; set; }
        public DbSet<Dcontact> Dcontacts { get; set; }
        public DbSet<NumerosPostaux> NumerosPostauxes { get; set; }
        #endregion
    }
}
