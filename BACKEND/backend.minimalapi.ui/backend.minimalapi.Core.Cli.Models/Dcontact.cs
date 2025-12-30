using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Cli.Models
{
    public class Dcontact
    {
        [Key]
        public int ContactId { get; set; }
        public long ClientId { get; set; }
        public short DtypeContactId { get; set; }
        public string Cnom { get; set; } = string.Empty;
        public string Cprénom { get; set; } = string.Empty;
        public string AdresseMail { get; set; } = string.Empty;
        public string TélPortable { get; set; } = string.Empty;
        public string TélFixe { get; set; } = string.Empty;
        public string Adresse1 { get; set; } = string.Empty;
        public string Adresse2 { get; set; } = string.Empty;
        public string Ville { get; set; } = string.Empty;
        public string Pays { get; set; } = string.Empty;
        public int? NuméroPostal { get; set; }
    }
}
