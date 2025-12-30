using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.minimalapi.Core.Prod.Models;

namespace backend.minimalapi.Core.Prod.Models
{
    public class ProduitDbContext : DbContext
    {
        #region Constructors
        public ProduitDbContext(DbContextOptions<ProduitDbContext> options) : base(options) { }

        protected ProduitDbContext() { }
        #endregion

        #region Internal Methods
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dlangue>()
                .Property(b => b.LangueId)
                .ValueGeneratedNever();

            modelBuilder.Entity<Dcuvée>()
                .Property(b => b.CuvéeId)
                .ValueGeneratedNever();

            modelBuilder.Entity<DdescriptionCuvée>()
                .Property(b => b.DescriptionCuvéeId);

            modelBuilder.Entity<Dbouteille>()
                .Property(b => b.BouteilleId)
                .ValueGeneratedNever();

            modelBuilder.Entity<DbouteilleImage>()
                .Property(b => b.BouteilleImageId)
                .ValueGeneratedNever();

            modelBuilder.Entity<Dstock>()
                .Property(b => b.StockId)
                .ValueGeneratedNever();

            modelBuilder.Entity<Dproduit>()
                .Property(b => b.ProduitId)
                .ValueGeneratedNever();

            modelBuilder.Entity<DproduitAction>()
                .Property(b => b.ProduitActionId);

            modelBuilder.Entity<DcommandesClient>()
                .Property(b => b.CommandeId)
                .ValueGeneratedNever();

            modelBuilder.Entity<DlignesCommande>()
                .Property(b => b.LignesCommandeId)
                .ValueGeneratedNever();

            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Game>().ToTable("Game");
        }

        #endregion

        #region Properties
        public DbSet<Dlangue> Dlangues{ get; set; }
        public DbSet<Dcuvée> Dcuvées { get; set; }
        public DbSet<DdescriptionCuvée> DdescriptionCuvées { get; set; }
        public DbSet<Dbouteille> Dbouteilles{ get; set; }
        public DbSet<DbouteilleImage> DbouteilleImages{ get; set; }
        public DbSet<Dstock> Dstocks{ get; set; }
        public DbSet<Dproduit> Dproduits { get; set; }
        public DbSet<DproduitAction> DproduitActions { get; set; }
        public DbSet<DcommandesClient> DcommandesClients { get; set; }
        public DbSet<DlignesCommande> DlignesCommandes { get; set; }
        #endregion
    }
}
