using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Models.Models
{
    public class CuveBoutProd
    {
        public int CuvéeId { get; set; }
        public int AnnéeCuvée { get; set; }
        public string TypeCuvée { get; set; }
        public string LibelléCuvée { get; set; }
        public ICollection<Bout> Dbouteilles { get; set; }
    }
}
