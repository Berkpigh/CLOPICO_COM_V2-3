using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.minimalapi.Core.Cli.Models;
using backend.minimalapi.Core.Cli.Models.Models;

namespace backend.minimalapi.Core.Cli.IF
{
    /// <summary>
    /// Contrat pour récupérer la liste des clients
    /// </summary>
    public interface IGetAllClientService
    {
        IEnumerable<Dclient> GetAllClient();
        Dclient GetOneClient(long clientid);
        IList<ClientInfo> GetAllClientInfo();
        ClientInfo GetOneClientInfo(long clientid);
        FLKeys PostOneClientInfo(ClientInfo clientInfo);
        Boolean PostOneContact(Dcontact dcontact, Boolean save);
    }
}
