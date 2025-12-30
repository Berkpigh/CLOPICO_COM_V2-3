using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.minimalapi.Core.Prod.Models;
using backend.minimalapi.Core.Prod.Models.Models;

namespace backend.minimalapi.Core.Prod.IF
{
    public interface IGetAllCuvéeService
    {
        List<Dcuvée> GetAllCuvée();
        bool PostOneCuvée(CuveBoutProd cbp);
        bool CheckLangueExists();
        int getNextCuvéeId();
        int getNextBouteillId();
        long getNextProduitId(int bot);
    }
}
