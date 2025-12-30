using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Models.Models
{
    public class BouteilleProdOnly
    {
        public int BouteilleId { get; set; }
        public int CuvéeId { get; set; }
        public string LibelléBouteille { get; set; }
        public int Capacité { get; set; }
        public ICollection<Dproduit> Dproduits { get; set; }
    }
}
