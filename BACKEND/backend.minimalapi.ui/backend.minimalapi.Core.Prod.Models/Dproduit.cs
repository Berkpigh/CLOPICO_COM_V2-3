using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Models
{
    public class Dproduit
    {
        [Key]
        public long ProduitId { get; set; }
        public int BouteilleId { get; set; }
        public string LibelléProduit { get; set; }
        public short NombreBouteilles { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal PrixTTC { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal FraisPoste { get; set; }
        public short QuantitéMinimum { get; set; }
        public DateTime? DatePeremption { get; set; }
        public ICollection<DproduitAction> DproduitActions { get; set; }
    }
}
