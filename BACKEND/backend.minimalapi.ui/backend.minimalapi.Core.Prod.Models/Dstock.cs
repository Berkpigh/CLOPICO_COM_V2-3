using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Models
{
    public class Dstock
    {
        [Key]
        public int StockId { get; set; }
        public int BouteilleId { get; set; }

        public int QuantitéEntrée { get; set; }
        public DateTime DateEntrée { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal ValeurEntrée { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal ValeurVendue { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal ValeurSolde { get; set; }
        public int QuantitéRéserve { get; set; }
        public int QuantitéSolde { get; set; }
    }
}
