using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Models.Models
{
    public class DescCuvée
    {
        public int DescriptionCuvéeId { get; set; }
        public int CuvéeId { get; set; }
        public int Langue { get; set; }
        public string Description { get; set; }
        public string DescriptionLongue { get; set; }
        public string NomLangue { get; set; }
    }
}
