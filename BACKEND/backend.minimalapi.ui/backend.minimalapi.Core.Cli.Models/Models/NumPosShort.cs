using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static backend.minimalapi.Core.Cli.Models.NumerosPostaux;

namespace backend.minimalapi.Core.Cli.Models.Models
{
    public class NumPosShort
    {
        public int numéroPostal { get; set; }
        public string localité { get; set; }
        public string canton{ get; set; }
        public int statutLivraison { get; set; }
    }
}
