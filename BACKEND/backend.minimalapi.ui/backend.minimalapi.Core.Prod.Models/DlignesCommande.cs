using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.minimalapi.Core.Prod;

namespace backend.minimalapi.Core.Prod.Models
{
    public class DlignesCommande
    {
        [Key]
        public long LignesCommandeId { get; set; }
        public long CommandeId { get; set; }
        public int NuméroLigne { get; set; }
        public long ProduitId { get; set; }
        public short QuantitéProduit { get; set; }
        public short SoldeQuantitéProduit { get; set; }
        [Column(TypeName = "decimal(18,2)")]

        public decimal MontantLigne { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal FraisLivraison { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal MontantTVA { get; set; }
    }
}
