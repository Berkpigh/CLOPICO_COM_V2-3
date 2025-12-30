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
    public class SqlServerGetAllCuvéeService : IGetAllCuvéeService
    {
        private readonly ProduitDbContext _dbContext;
        #region Constructors
        public SqlServerGetAllCuvéeService(ProduitDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        #endregion

        #region Public methods
        public bool CheckLangueExists()
        {
            var q = _dbContext.Dlangues.AsNoTracking().FirstOrDefault();
            if (q != null) { return true; } else { return false; }
        }
        public int getNextCuvéeId()
        {
            var cuv = _dbContext.Dcuvées.AsNoTracking()
                        .OrderByDescending(c => c.CuvéeId)
                        .FirstOrDefault();
            if (cuv == null) { return 1; }
            return cuv.CuvéeId + 1;
        }
        public int getNextBouteillId()
        {
            var bot = _dbContext.Dbouteilles.AsNoTracking()
                        .OrderByDescending(b => b.BouteilleId)
                        .FirstOrDefault();
            if (bot == null) { return 1; }
            return bot.BouteilleId + 1;
        }
        public long getNextProduitId(int bot)
        {
            long prod = bot * 100000;
            var pr = _dbContext.Dproduits.AsNoTracking()
                        .OrderByDescending(p => p.ProduitId)
                        .FirstOrDefault();
            if (pr.ProduitId == null) { return prod + 200; }
            double np = pr.ProduitId / 100000;
            long npt = (long)Math.Truncate(np);
            if (npt < bot)
            { return prod + 200; }
            return pr.ProduitId + 100;
        }
        public List<Dcuvée> GetAllCuvée()
        {
            List<Dcuvée> query = _dbContext.Dcuvées.AsNoTracking()
                            .Include(b => b.Dbouteilles)
                            .ThenInclude(p => p.Dproduits).ToList();
            return query;
        }

        public bool PostOneCuvée(CuveBoutProd cbp)
        {
            bool ok = true;
            string min = "";
            int btnum = 0;
 // *--- C u v é e
            Dcuvée dcuvée = new Dcuvée();
            if (cbp.CuvéeId == 0) { dcuvée.CuvéeId = getNextCuvéeId(); } else { dcuvée.CuvéeId = cbp.CuvéeId; }
            dcuvée.AnnéeCuvée = cbp.AnnéeCuvée;
            dcuvée.TypeCuvée = cbp.TypeCuvée;
            dcuvée.LibelléCuvée = cbp.LibelléCuvée;
            List<DdescriptionCuvée> Ddescs = new List<DdescriptionCuvée>();
            if (!CheckLangueExists())
            {
                Dlangue dlangue = new Dlangue();
                dlangue.LangueId = 1;
                dlangue.Langue = "FR";
                _dbContext.Dlangues.Add(dlangue);
                dlangue = new Dlangue();
                dlangue.LangueId = 2;
                dlangue.Langue = "EN";
                _dbContext.Dlangues.Add(dlangue);
                dlangue = new Dlangue();
                dlangue.LangueId = 3;
                dlangue.Langue = "DE";
                _dbContext.Dlangues.Add(dlangue);
                dlangue = new Dlangue();
                dlangue.LangueId = 4;
                dlangue.Langue = "IT";
                _dbContext.Dlangues.Add(dlangue);
                dlangue = new Dlangue();
                dlangue.LangueId = 5;
                dlangue.Langue = "SP";
                _dbContext.Dlangues.Add(dlangue);
            }
 // *--- D e s c r p t i o n  C u v é e
            DdescriptionCuvée dd = new DdescriptionCuvée();
            dd.Langue = 1;
            dd.CuvéeId = dcuvée.CuvéeId;
            dd.Description = "";
            dd.DescriptionLongue = "";
            Ddescs.Add(dd);
            dd = new DdescriptionCuvée();
            dd.Langue = 2;
            dd.CuvéeId = dcuvée.CuvéeId;
            dd.Description = "";
            dd.DescriptionLongue = "";
            Ddescs.Add(dd);
            dd = new DdescriptionCuvée();
            dd.Langue = 3;
            dd.CuvéeId = dcuvée.CuvéeId;
            dd.Description = "";
            dd.DescriptionLongue = "";
            Ddescs.Add(dd);
            dd = new DdescriptionCuvée();
            dd.Langue = 4;
            dd.CuvéeId = dcuvée.CuvéeId;
            dd.Description = "";
            dd.DescriptionLongue = "";
            Ddescs.Add(dd);
            dd = new DdescriptionCuvée();
            dd.Langue = 5;
            dd.CuvéeId = dcuvée.CuvéeId;
            dd.Description = "";
            dd.DescriptionLongue = "";
            Ddescs.Add(dd);
// *--- B O u t e i l l e
            List<Dbouteille> lb = new List<Dbouteille>();
            List<Dproduit> lp0 = new List<Dproduit>();
            List<Dstock> st0 = new List<Dstock>();
            List<Dproduit> lp1 = new List<Dproduit>();
            List<Dstock> st1 = new List<Dstock>();

            foreach (Bout bo in cbp.Dbouteilles) {
                List<Dproduit> lp = new List<Dproduit>();
                List<Dstock> st = new List<Dstock>();
                Dbouteille Dbout = new Dbouteille();
                if(bo.BouteilleId == 0) { Dbout.BouteilleId = getNextBouteillId(); } else { Dbout.BouteilleId = bo.BouteilleId; }
                Dbout.CuvéeId = dcuvée.CuvéeId;
                Dbout.Capacité = bo.Capacité;
                Dbout.LibelléBouteille = cbp.LibelléCuvée + " " + bo.Capacité + "cl.";
// *--- S t o c k
                Dstock dstock = new Dstock();
                dstock.StockId = Dbout.BouteilleId;
                dstock.BouteilleId = Dbout.BouteilleId;
                st.Add(dstock);
                // *--- P r o d u i t
                int ind = 0;
                short prqmin = 0;
                long pridnotnull = 0;
                long nextprid = 0;
                foreach (Prd pr in bo.Dproduits)
                {
                    min = "";
                    pridnotnull = pr.ProduitId;
                    prqmin = pr.QuantitéMinimum;

                    if (pridnotnull == 0)
                    {
                        if(ind == 0) {
                            pridnotnull = getNextProduitId(Dbout.BouteilleId);
                            if(prqmin > 0) { pridnotnull++; };
                            nextprid = pridnotnull;
                        } else {
                            if(prqmin > 0) { nextprid++; } else { nextprid = nextprid + 100; }
                        }
                        ind++;
                    } else { nextprid = pr.ProduitId; }

                    if (pr.QuantitéMinimum > 0) { min = "min " + pr.QuantitéMinimum; }
                    ;
                    Dproduit prodt = new Dproduit();
                    prodt.ProduitId = nextprid;
                    prodt.BouteilleId = Dbout.BouteilleId;
                    prodt.NombreBouteilles = pr.NombreBouteilles;
                    prodt.QuantitéMinimum = pr.QuantitéMinimum;
                    prodt.LibelléProduit = cbp.LibelléCuvée + " " + bo.Capacité + "cl. carton de " + pr.NombreBouteilles + "bt." + min;
                    lp.Add(prodt);
                }
                Dbout.Dproduits = lp;
                Dbout.Dstocks = st;
                lb.Add(Dbout);
                if(btnum == 0) { lp0 = lp; st0 = st; } else { lp1 = lp; st1 = st; }
                btnum++;
            }
            dcuvée.Dbouteilles = lb;
            dcuvée.DdescriptionCuvées = Ddescs;
            try
            {
                //var trackedEntity = _dbContext.ChangeTracker.Entries<Dbouteille>().FirstOrDefault(e => e.Entity.BouteilleId == 1004); 
                //if (trackedEntity != null) { trackedEntity.State = EntityState.Detached; }
                //// Maintenant vous pouvez attacher la nouvelle instance 
                _dbContext.Dcuvées.Add(dcuvée);
                foreach (DdescriptionCuvée dc in Ddescs) { _dbContext.DdescriptionCuvées.Add(dc); }
                foreach (Dbouteille  bt in lb) { _dbContext.Dbouteilles.Add(bt); }
                foreach (Dproduit dproduit in lp0) { _dbContext.Dproduits.Add(dproduit); }
                foreach (Dproduit dproduit in lp1) { _dbContext.Dproduits.Add(dproduit); }
                foreach (Dstock dstock in st0) { _dbContext.Dstocks.Add(dstock); }
                foreach (Dstock dstock in st1) { _dbContext.Dstocks.Add(dstock); }
                _dbContext.SaveChanges();
                return ok;
            } catch
            {
                ok = false;
            }

            return ok;
        }
        #endregion
    }
}
