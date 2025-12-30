using backend.minimalapi.Core.Cli.Models;
using backend.minimalapi.Core.Cli.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.minimalapi.Core.Cli.IF
{
    public interface IGetAllNPService
    {
        IEnumerable<NumPosShort> GetAllNPServiceNPs();
    }
}
