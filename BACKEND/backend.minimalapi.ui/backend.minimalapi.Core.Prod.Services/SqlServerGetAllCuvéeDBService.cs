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
    public class SqlServerGetAllCuvéeDBService : IGetAllCuvéeeDBService
    {

        private readonly ProduitDbContext _dbContext;
        #region Constructors
        public SqlServerGetAllCuvéeDBService(ProduitDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        #endregion

        #region Public methods
        public string GetNomLangue(int id)
        {
            string nomLangue = "";
            var query = _dbContext.Dlangues
                        .Where(l => l.LangueId == id).FirstOrDefault();
            if(query == null) { return nomLangue; }
            return query.Langue;
        }
        public List<CuvéeDBOnly> GetAllCuvéeOnlyDB()
        {
            List<CuvéeDBOnly> lcuvonly = new List<CuvéeDBOnly>();
            var query = _dbContext.Dcuvées
                        .Include(d => d.DdescriptionCuvées).ToList();
            if(query == null) { return lcuvonly; }
            foreach (var item in query)
            {
                CuvéeDBOnly co = new CuvéeDBOnly();
                List<DescCuvée> LDC = new List<DescCuvée>();
                co.CuvéeId = item.CuvéeId;
                co.AnnéeCuvée = item.AnnéeCuvée;
                co.TypeCuvée = item.TypeCuvée;
                co.LibelléCuvée = item.LibelléCuvée;
                foreach (var item2 in item.DdescriptionCuvées)
                {
                    DescCuvée DC = new DescCuvée();
                    DC.DescriptionCuvéeId = item2.DescriptionCuvéeId;
                    DC.CuvéeId = item2.CuvéeId;
                    DC.Langue = item2.Langue;
                    DC.Description = item2.Description;
                    DC.DescriptionLongue = item2.DescriptionLongue;
                    DC.NomLangue = GetNomLangue(item2.Langue);
                    LDC.Add(DC);
                }
                co.DescCuvées = LDC;
                lcuvonly.Add(co);
            }
            return lcuvonly;
        }
        public Dcuvée GetOneCuvéeDB(int id)
        {
            Dcuvée dcuvée = new Dcuvée();
            var cuv = _dbContext.Dcuvées.AsNoTracking()
                .Include(d => d.DdescriptionCuvées)
                .Include(b => b.Dbouteilles)
                .Where(c => c.CuvéeId == id).FirstOrDefault();
            if (cuv == null) { return dcuvée; }
            return cuv;
        }
        public void GetOneDesc(int id)
        {
            DdescriptionCuvée dc = _dbContext.DdescriptionCuvées.AsNoTracking()
                                    .Where(d => d.DescriptionCuvéeId == id).FirstOrDefault();
        }
        public bool PostOneCuvéeDB(CuvéeDBOnly cuvéeDBOnly)
        {
            Dcuvée cuv = GetOneCuvéeDB(cuvéeDBOnly.CuvéeId);
            if (cuv == null) { return false; }
            List<DdescriptionCuvée> ldesc = new List<DdescriptionCuvée> ();
            foreach(var item in cuvéeDBOnly.DescCuvées)
            {
                DdescriptionCuvée ld = new DdescriptionCuvée();
                ld.DescriptionCuvéeId = item.DescriptionCuvéeId;
                ld.CuvéeId = item.CuvéeId;
                ld.Langue = item.Langue;
                ld.Description = item.Description;
                ld.DescriptionLongue = item.DescriptionLongue;
                ldesc.Add(ld);
            }
            cuv.DdescriptionCuvées = ldesc;

            //var trackedEntity = _dbContext.ChangeTracker.Entries<DdescriptionCuvée>()
            //                    .FirstOrDefault(e => e.Entity.DescriptionCuvéeId == 10);
            //if (trackedEntity != null) { trackedEntity.State = EntityState.Detached; }
            //// Maintenant vous pouvez attacher la nouvelle instance 

            try
            {
                foreach (DdescriptionCuvée dc in ldesc)
                {
                    GetOneDesc(dc.DescriptionCuvéeId);
                    _dbContext.DdescriptionCuvées.Update(dc);
                }
                _dbContext.Dcuvées.Update(cuv);
                _dbContext.SaveChanges();
            }
            catch {
                return false;
            }
            return true;
        }
        #endregion

    }
}
