using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Prod.Models
{
    public class DbouteilleImage
    {
        [Key]
        public int BouteilleImageId { get; set; }
        public int BouteilleId { get; set; }   
        public string ImageDesc { get; set; }
        public string ImageUrl { get; set; }
    }
}
