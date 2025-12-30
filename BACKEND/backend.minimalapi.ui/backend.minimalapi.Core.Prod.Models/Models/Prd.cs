using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Models.Models
{
    public class Prd
    {
        public long ProduitId { get; set; }
        public short NombreBouteilles { get; set; }
        public short QuantitéMinimum { get; set; }
    }
}
