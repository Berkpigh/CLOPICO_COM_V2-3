using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Models
{
    public class DproduitAction
    {
        [Key]
        public int ProduitActionId {  get; set; }
        public long ProduitId { get; set; }
        public string ActionDesc { get; set; }
        public int ActionPourcent { get; set; }
        public DateTime? DébutAction { get; set; }
        public DateTime? FinAction { get; set; }
    }
}
