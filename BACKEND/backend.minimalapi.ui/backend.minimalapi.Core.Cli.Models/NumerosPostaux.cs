using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Cli.Models
{
    public class NumerosPostaux
    {
        [Key]
        public int NumerosPostauxId { get; set; }
        public int NuméroPostal { get; set; }
        public string Localité { get; set; }
        public string NuméroAdditionnel { get; set; }
        public string Commune { get; set; }
        public string Canton { get; set; }
        public string Langue { get; set; }
        public int NuméroAFS { get; set; }
        public StatutL? StatutLivraison { get; set; }
        public enum StatutL { A_domicile, Postale }
    }
}
