using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Models
{
    public class DcommandesClient
    {
        [Key]
        public long CommandeId { get; set; }
        public long ClientId { get; set; }
        public int IdContactFacturation { get; set; }
        public int IdContactLivraison { get; set; }
        public DateTime DateCommande { get; set; }
        public DateTime? DateFacturation { get; set; }
        public DateTime? DateLivraison { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public Decimal MontantCommande { get; set; }
        public string GesteCommercial { get; set; }
        public string Commentaire { get; set; }
        public StatutC StatutCommande { get; set; }
        public enum StatutC { Préparation, PDF, Facturation, Livraison, Annulée, Encaissée }
        public ICollection<DlignesCommande> DlignesCommandes { get; set; }
    }
}
