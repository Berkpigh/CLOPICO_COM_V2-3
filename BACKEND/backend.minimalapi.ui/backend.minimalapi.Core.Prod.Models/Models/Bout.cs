using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Models.Models
{
    public class Bout
    {
        public int BouteilleId { get; set; }
        public int Capacité { get; set; }
        public required ICollection<Prd> Dproduits { get; set; }
    }
}
