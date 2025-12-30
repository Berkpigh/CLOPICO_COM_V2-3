using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Models
{
    public class Dcuvée
    {
        [Key]
        public int CuvéeId { get; set; }
        public int AnnéeCuvée { get; set; }
        public string TypeCuvée { get; set; }
        public string LibelléCuvée { get; set; }
        public ICollection<DdescriptionCuvée> DdescriptionCuvées { get; set; }
        public ICollection<Dbouteille> Dbouteilles { get; set; }
    }
}
