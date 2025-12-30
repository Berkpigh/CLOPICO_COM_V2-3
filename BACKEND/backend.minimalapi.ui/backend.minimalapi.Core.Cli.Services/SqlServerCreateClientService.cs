using backend.minimalapi.Core.Cli.IF;
using backend.minimalapi.Core.Cli.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Cli.Services
{
    public class SqlServerCreateClientService : IClientService
    {
        private readonly ClientDbContext _dbContext;
        #region constructors
        public SqlServerCreateClientService(ClientDbContext context)
        {
            _dbContext = context;
        }
        #endregion

        #region Public methods
        public long getNextClientId()
        {
            long nextid = ((DateTime.Now.Year - 2000) * 10000000) + (DateTime.Now.Month * 100000);
            int s = DateTime.Now.Second + 100;
            if (s > 139) { s = s - 20; }

            long nextcliid = nextid + s;
            Dclient? dclient = new Dclient();
            dclient = _dbContext.Dclients
                        .OrderByDescending(d => d.ClientId).FirstOrDefault();
            if (dclient == null) { return nextcliid; }
            if (nextid <= dclient.ClientId) { nextcliid = dclient.ClientId + s; }
            return nextcliid;
        }
        public long getClientId(string ownerid)
        {
            long r = 0;
            var dcli = _dbContext.Dclients
                        .Where(c => c.OwnerId == ownerid)
                        .FirstOrDefault();
            if (!(dcli == null)) { r = dcli.ClientId; }
            return r;
        }
        public void createClient(Dclient dclient)
        {
            _dbContext.Dclients.Add(dclient);
            _dbContext.SaveChanges();
        }

        #endregion
    }
}