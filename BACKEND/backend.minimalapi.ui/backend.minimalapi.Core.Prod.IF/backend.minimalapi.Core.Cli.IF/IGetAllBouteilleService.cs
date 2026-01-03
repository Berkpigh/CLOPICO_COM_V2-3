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
    public interface IGetAllBouteilleService
    {
        List<Dbouteille> GetAllBouteilles();
        bool PostOneBoutProd(BouteilleProdOnly bouteilleProd);
        List<DbouteilleImage> GetOneBouteilleImages(int BouteilleId);
        bool PutOneBouteilleImages(List<DbouteilleImage> images);
    }
}
