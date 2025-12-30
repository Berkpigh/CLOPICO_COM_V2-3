using backend.minimalapi.Core.Cli.IF;
using backend.minimalapi.Core.Cli.Models;
using backend.minimalapi.Core.Cli.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Cli.Services
{
    public class SqlServerGetAllNPService : IGetAllNPService
    {
        private readonly ClientDbContext _dbContext;
        #region constructors
        public SqlServerGetAllNPService(ClientDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        #endregion
        #region public methods
        public IEnumerable<NumPosShort> GetAllNPServiceNPs()
        {
            var np = _dbContext.NumerosPostauxes
                .OrderBy(x => x.Localité)
                .ToList();
            IList<NumPosShort> numPosShorts = new List<NumPosShort>();
            foreach (var n in np)
            {
                NumPosShort numPosShort = new ();
                numPosShort.localité = n.Localité.Trim();
                numPosShort.numéroPostal = n.NuméroPostal;
                numPosShort.canton = n.Canton;
                numPosShort.statutLivraison = (int)n.StatutLivraison;
                numPosShorts.Add(numPosShort);
            }
            return numPosShorts;
        }
        #endregion

    }
}
