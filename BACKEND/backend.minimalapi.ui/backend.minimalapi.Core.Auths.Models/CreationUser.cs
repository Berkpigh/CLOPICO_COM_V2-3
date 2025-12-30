using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Auths.Models
{
    public class CreationUser
    {
        #region Properties
        public string RoleName { get; set; } = string.Empty;
        public string Name {  get; set; } = string.Empty;
        public string FirstName {  get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        #endregion
    }
}
