using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.minimalapi.Core.Cli.Models
{
    public class Dclient
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long ClientId { get; set; }
        public string OwnerId {  get; set; } = string.Empty;
        public string Nom { get; set; } = string.Empty;
        public string Prénom { get; set; } = string.Empty;
        public DateTime DateContact {  get; set; }
    }
}
