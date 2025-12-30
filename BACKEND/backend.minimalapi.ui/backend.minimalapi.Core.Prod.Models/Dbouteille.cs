using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Models
{
    public class Dbouteille
    {
        [Key]
        public int BouteilleId { get; set; }
        public int CuvéeId { get; set; }
        public string LibelléBouteille { get; set; }
        public int Capacité { get; set; }
        public ICollection<DbouteilleImage> DbouteilleImages { get; set; }
        public ICollection<Dproduit> Dproduits { get; set; }
        public ICollection<Dstock> Dstocks { get; set; }
    }
}
