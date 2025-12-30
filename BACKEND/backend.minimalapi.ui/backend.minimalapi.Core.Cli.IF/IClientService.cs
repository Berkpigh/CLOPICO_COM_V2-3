using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.minimalapi.Core.Cli.Models;


namespace backend.minimalapi.Core.Cli.IF
{
    public interface IClientService
    {
        long getNextClientId();

        long getClientId(string userid);

        void createClient(Dclient dclient);

    }
}
