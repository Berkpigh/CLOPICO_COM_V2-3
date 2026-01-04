using backend.minimalapi.Core.Prod.IF;
using backend.minimalapi.Core.Prod.Models;
using backend.minimalapi.Core.Prod.Models.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Identity.Client;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Services
{
    public class SqlServerGetAllBouteilleService : IGetAllBouteilleService
    {
        private readonly ProduitDbContext _dbContext;
        #region Constructors
        public SqlServerGetAllBouteilleService(ProduitDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        #endregion

        #region Public methods

        public List<Dbouteille> GetAllBouteilles()
        {
            List<Dbouteille> LBout = new List<Dbouteille>();
            var query = _dbContext.Dbouteilles
                        .Include(p => p.Dproduits)
                        .Include(s => s.Dstocks)
                        .Include(i => i.DbouteilleImages)
                        .ToList();
            if(query == null) {  return LBout; }
            return query;
        }
        public Dbouteille GetOneBouteille(int id)
        {
            Dbouteille dbouteille = new Dbouteille();
            var bot = _dbContext.Dbouteilles.AsNoTracking()
                .Include(i => i.DbouteilleImages)
                .Include(s => s.Dstocks)
                .Include(p => p.Dproduits)
                .ThenInclude(a => a.DproduitActions)
                .Where(b => b.BouteilleId == id).FirstOrDefault();
            if (bot == null) { return dbouteille; }
            return bot;
        }
        public void GetOneProd(long id)
        {
            Dproduit dproduit = _dbContext.Dproduits.AsNoTracking()
                                    .Where(p => p.ProduitId == id).FirstOrDefault();
        }
        public void GetOneProdAction(int id)
        {
            DproduitAction dproduitAction = _dbContext.DproduitActions.AsNoTracking()
                                                .Where(a => a.ProduitActionId == id).FirstOrDefault();
        }
        public bool PostOneBoutProd(BouteilleProdOnly bouteilleProd)
        {
            Dbouteille bot = GetOneBouteille(bouteilleProd.BouteilleId);
            if (bot == null) { return false; }
            List<Dproduit> lprod = new List<Dproduit>();
            List<DproduitAction> laction = new List<DproduitAction>();
            foreach (var item in bouteilleProd.Dproduits)
            {
                Dproduit lp = new Dproduit();
                lp.BouteilleId = item.BouteilleId;
                lp.ProduitId = item.ProduitId;
                lp.LibelléProduit = item.LibelléProduit;
                lp.NombreBouteilles = item.NombreBouteilles;
                lp.DatePeremption = item.DatePeremption;
                lp.FraisPoste = item.FraisPoste;
                lp.PrixTTC = item.PrixTTC;
                lp.QuantitéMinimum = item.QuantitéMinimum;
                foreach (var item2 in item.DproduitActions)
                {
                    DproduitAction la = new DproduitAction();
                    la.ProduitActionId = item2.ProduitActionId;
                    la.ProduitId = item2.ProduitId;
                    la.ActionPourcent = item2.ActionPourcent;
                    la.ActionDesc = item2.ActionDesc;
                    la.DébutAction = item2.DébutAction;
                    la.FinAction = item2.FinAction;
                    laction.Add(la);
                }
                lp.DproduitActions = laction;
                lprod.Add(lp);
            }
            bot.Dproduits = lprod;

            //var trackedEntity = _dbContext.ChangeTracker.Entries<DdescriptionCuvée>()
            //                    .FirstOrDefault(e => e.Entity.DescriptionCuvéeId == 10);
            //if (trackedEntity != null) { trackedEntity.State = EntityState.Detached; }
            //// Maintenant vous pouvez attacher la nouvelle instance 

            try
            {
                foreach (Dproduit dproduit in lprod)
                {
                    List<DproduitAction> la = new List<DproduitAction>();
                    foreach (DproduitAction action in la)
                    {
                        GetOneProdAction(action.ProduitActionId);
                        _dbContext.DproduitActions.Update(action);
                    }
                    GetOneProd(dproduit.ProduitId);
                    _dbContext.Dproduits.Update(dproduit);
                }
                _dbContext.Dbouteilles.Update(bot);
                _dbContext.SaveChanges();
            }
            catch
            {
                return false;
            }
            return true;
        }
        public List<DbouteilleImage> GetOneBouteilleImages(int bouteilleId)
        {
            List<DbouteilleImage> query = new List<DbouteilleImage>();
            query = _dbContext.DbouteilleImages
                        .Where(i => i.BouteilleId == bouteilleId).ToList();
            if(!(query.Count > 0))
            {
                DbouteilleImage bi = new DbouteilleImage();
                bi.BouteilleImageId = 1;
                bi.BouteilleId = bouteilleId;
                bi.ImageDesc = "empty " + bouteilleId;
                bi.ImageUrl = "";
                query.Add(bi);
            }
            return query;
        }
        public List<DbouteilleImage> GetAllImages(int id)
        {
            List<DbouteilleImage> oldimages = _dbContext.DbouteilleImages.Where(b => b.BouteilleId == id).ToList();
            return oldimages;
        }
        public bool PutOneBouteilleImages(List<DbouteilleImage> images)
        {
        // ---* --- * Obtention de la bouteille
            if (images.Count < 1) { return false; };
            int boutid = images[0].BouteilleId;
            Dbouteille bot = GetOneBouteille(boutid);
            if (bot.BouteilleId != boutid) { return false; }

            // ---*---*Suppression des images existantes
            List<DbouteilleImage> oldimages = GetAllImages(boutid);
            foreach (DbouteilleImage img in oldimages)
            {
                _dbContext.DbouteilleImages.Remove(img);
            }

            // ---* --- * Remplacement des images de la bouteille
            foreach (DbouteilleImage img in images)
            {
                _dbContext.DbouteilleImages.Add(img);
            }
            List<DbouteilleImage> bl = _dbContext.DbouteilleImages.Where(b => b.BouteilleId > boutid).ToList();
            bot.DbouteilleImages = images;
            _dbContext.Dbouteilles.Update(bot);
            _dbContext.SaveChanges();

            return true;
        }

        #endregion
    }
}

