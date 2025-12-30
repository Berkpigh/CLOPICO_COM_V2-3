using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Cli.Models.Models
{
    public class ClientInfo
    {
        // -- * -- * -- * Info Client * -- * -- * -- * -- * -- * -- * -- * 
        public long ClientId { get; set; }
        public string OwnerId { get; set; } = string.Empty;
        public string Nom { get; set; } = string.Empty;
        public string Prénom { get; set; } = string.Empty;
        public DateTime DateContact { get; set; }
        // -- * -- * -- * Contact Facturation * -- * -- * -- * -- * -- * -- * -- * 
        public int F_ContactId { get; set; }
        public int F_DTypeContact {  get; set; }
        public string F_Cnom { get; set; } = string.Empty;
        public string F_Cprénom { get; set; } = string.Empty;
        public string F_AdresseMail { get; set; } = string.Empty;
        public string F_TélPortable { get; set; } = string.Empty;
        public string F_TélFixe { get; set; } = string.Empty;
        public string F_Adresse1 { get; set; } = string.Empty;
        public string F_Adresse2 { get; set; } = string.Empty;
        public string F_Ville { get; set; } = string.Empty;
        public string F_Pays { get; set; } = string.Empty;
        public int? F_NuméroPostal { get; set; }
        // -- * -- * -- * Contact Livraison * -- * -- * -- * -- * -- * -- * -- * 
        public int L_ContactId { get; set; }
        public int L_DTypeContact { get; set; }
        public string L_Cnom { get; set; } = string.Empty;
        public string L_Cprénom { get; set; } = string.Empty;
        public string L_AdresseMail { get; set; } = string.Empty;
        public string L_TélPortable { get; set; } = string.Empty;
        public string L_TélFixe { get; set; } = string.Empty;
        public string L_Adresse1 { get; set; } = string.Empty;
        public string L_Adresse2 { get; set; } = string.Empty;
        public string L_Ville { get; set; } = string.Empty;
        public string L_Pays { get; set; } = string.Empty;
        public int? L_NuméroPostal { get; set; }
    }
}
