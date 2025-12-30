using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Models
{
    public class Dlangue
    {
        [Key]
        public int LangueId { get; set; }
        public string Langue {  get; set; }
    }
}
