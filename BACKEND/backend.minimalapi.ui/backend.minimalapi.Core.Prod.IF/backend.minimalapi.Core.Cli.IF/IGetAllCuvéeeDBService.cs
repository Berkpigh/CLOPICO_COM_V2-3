using backend.minimalapi.Core.Prod.Models;
using backend.minimalapi.Core.Prod.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.IF
{
    public interface IGetAllCuvéeeDBService
    {
        List<CuvéeDBOnly> GetAllCuvéeOnlyDB();
        Dcuvée GetOneCuvéeDB(int id);
        bool PostOneCuvéeDB(CuvéeDBOnly cuvonly);
        string GetNomLangue(int id);
    }
}
