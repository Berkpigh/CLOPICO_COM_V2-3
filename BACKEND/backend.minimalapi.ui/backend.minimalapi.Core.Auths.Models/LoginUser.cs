using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Auths.Models
{
    public class LoginUser
    {
        #region Properties
        public string Login { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        #endregion
    }
}
