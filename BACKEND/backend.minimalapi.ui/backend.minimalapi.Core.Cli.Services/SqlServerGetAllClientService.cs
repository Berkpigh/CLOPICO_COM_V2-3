using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.minimalapi.Core.Cli.IF;
using backend.minimalapi.Core.Cli.Models;
using backend.minimalapi.Core.Cli.Models.Models;
using backend.minimalapi.Core.Cli.Services;
using Microsoft.IdentityModel.Tokens;
using static System.Net.Mime.MediaTypeNames;

namespace backend.minimalapi.Core.Cli.Services
{
    public class SqlServerGetAllClientService : IGetAllClientService
    {
        private readonly ClientDbContext _dbContext;
        private readonly Dcontact dcontactcave = new()
        {
            ContactId = 0,
            ClientId = 0,
            DtypeContactId = 3,
            Cnom = "CLOPICO",
            Cprénom = "Cave de",
            AdresseMail = "pierre.berkovits@clopico.com",
            TélPortable = "+41 79 475 24 07",
            TélFixe = "",
            Adresse1 = "Chemin du Molan, 10",
            Adresse2 = "",
            Ville = "Tannay",
            Pays = "VD",
            NuméroPostal = 1295,
        };

        #region Constructors
        public SqlServerGetAllClientService(ClientDbContext context)
        {
            _dbContext = context;
        }
        #endregion

        #region Public methods
        // -- * -- * -- * CLIENT -- * -- * -- * -- * -- * -- * -- * -- * 
        public IEnumerable<Dclient> GetAllClient()
        {
            var query = from item in _dbContext.Dclients
                        select item;

            return query.ToList();
        }
        public Dclient GetOneClient(long clientId)
        {
            Dclient cli = new();
            var dcli = _dbContext.Dclients
                        .Where(c => c.ClientId == clientId)
                        .FirstOrDefault();
            if (dcli == null) { return cli; }
            return dcli;
        }
        // -- * -- * -- * CLIENTINFO -- * -- * -- * -- * -- * -- * -- * -- * 
        public IList<ClientInfo> GetAllClientInfo()
        {
            IEnumerable<Dclient> cli = GetAllClient();
            IList<ClientInfo> result = new List<ClientInfo>();
            foreach (var client in cli) {
                ClientInfo info = new ClientInfo();
                info = (ClientInfo)GetOneClientInfo(client.ClientId);
                result.Add(info);
            }

            return result;
        }
        public ClientInfo GetOneClientInfo(long clientid)
        {
            ClientInfo clientInfo = new ();
            Dclient dcli = (Dclient)GetOneClient(clientid);
            if (!(dcli.ClientId >0)) { return clientInfo; }
            // --- * --- * Facturation
            var dcf = _dbContext.Dcontacts
                        .Where(c => c.ClientId == clientid && (c.DtypeContactId == 0 || 
                                                                c.DtypeContactId == 1))
                        .OrderByDescending(d => d.ContactId)
                        .FirstOrDefault();
            // --- * --- * Livraison
            var dcl = _dbContext.Dcontacts
                        .Where(c => c.ClientId == clientid && c.DtypeContactId == 2)
                        .OrderByDescending(d => d.ContactId)
                        .FirstOrDefault();
            // --- * --- * Prélèvement à la cave
            var dcc = _dbContext.Dcontacts
                        .Where(c => c.ClientId == clientid && c.DtypeContactId == 3)
                        .OrderByDescending(d => d.ContactId)
                        .FirstOrDefault();

            Dcontact dcontactF = new();
            if (dcf == null) { dcf = dcontactF; }

            Dcontact dcontactL = new();
            if (dcl == null) { dcl = dcontactL; }

            // --- * --- * Création de l'adresse de prélèvement à la cave si elle n'existe pas pour ce client
            Dcontact dcontactC = new();
            if (dcc == null)
            {
                dcontactC = dcontactcave;
                dcontactC.ClientId = clientid;
                _dbContext.Add(dcontactC);
                _dbContext.SaveChanges();
                var dccnew = _dbContext.Dcontacts
                            .Where(c => c.ClientId == clientid && c.DtypeContactId == 3)
                            .OrderByDescending(d => d.ContactId)
                            .FirstOrDefault();
                dcontactC = new();
                if (dccnew != null) 
                {
                    dcontactC = dccnew;
                    dcontactC.DtypeContactId = 2;
                    _dbContext.Update(dcontactC);
                    _dbContext.SaveChanges();
                }
            }
            // -- * -- * -- * Client -- * -- * -- * -- * -- * -- * -- * -- * 
            clientInfo.ClientId = clientid;
            clientInfo.OwnerId = dcli.OwnerId;
            clientInfo.Nom=dcli.Nom;
            clientInfo.Prénom=dcli.Prénom;
            clientInfo.DateContact=dcli.DateContact;
            // -- * -- * -- * ClientContact -- * -- * -- * -- * -- * -- * -- * -- * 
            clientInfo.F_ContactId =dcf.ContactId;
            clientInfo.F_DTypeContact =dcf.DtypeContactId;
            clientInfo.F_Cnom=dcf.Cnom;
            clientInfo.F_Cprénom=dcf.Cprénom;
            clientInfo.F_Adresse1 = dcf.Adresse1;
            clientInfo.F_Adresse2 = dcf.Adresse2;
            clientInfo.F_AdresseMail = dcf.AdresseMail;
            clientInfo.F_TélPortable=dcf.TélPortable;
            clientInfo.F_TélFixe=dcf.TélFixe;
            clientInfo.F_Ville=dcf.Ville;
            clientInfo.F_Pays=dcf.Pays;
            clientInfo.F_NuméroPostal=dcf.NuméroPostal;

            clientInfo.L_ContactId = dcl.ContactId;
            clientInfo.L_DTypeContact = dcl.DtypeContactId;
            clientInfo.L_Cnom = dcl.Cnom;
            clientInfo.L_Cprénom = dcl.Cprénom;
            clientInfo.L_Adresse1 = dcl.Adresse1;
            clientInfo.L_Adresse2 = dcl.Adresse2;
            clientInfo.L_AdresseMail = dcl.AdresseMail;
            clientInfo.L_TélPortable = dcl.TélPortable;
            clientInfo.L_TélFixe = dcl.TélFixe;
            clientInfo.L_Ville = dcl.Ville;
            clientInfo.L_Pays = dcl.Pays;
            clientInfo.L_NuméroPostal = dcl.NuméroPostal;

            return clientInfo;
        }
        public FLKeys PostOneClientInfo(ClientInfo clientInfo)
        {
            bool mod = false;
            bool newc = false;
            bool newfc = false;
            bool newlc = false;
            bool livcav = false;

            FLKeys fLKeys = new FLKeys{
                    F_ContactId = clientInfo.F_ContactId,
                    L_ContactId = clientInfo.L_ContactId,
                    Ok = false
            };
            // -- * -- * -- * Check client
            Dclient cli = GetOneClient(clientInfo.ClientId);
            if (cli.ClientId < 1) { return fLKeys; }
            if (cli.Nom != clientInfo.Nom || cli.Prénom != clientInfo.Prénom)
            {
                cli.Nom = clientInfo.Nom;
                cli.Prénom = clientInfo.Prénom;
                _dbContext.Dclients.Update(cli);
                mod = true;
                newc = true;    
            }
            // -- * -- * -- * Check F_Contact : les flKeys.X_ContactID doivent être créés
            // -- * -- * ATTENTION : si clientInfo.F_DTypeContact = 3 alors
            // -- * -- *             on le met à zéro et on met l'adresse de la cave comme adresse de livraison
            if (clientInfo.F_DTypeContact == 3)
            {
                clientInfo.F_DTypeContact = 0;
                livcav |= true;
                // ** -  ** -  ** - Recherche dur contact "Prélèvement à la cave" pour ce client
                var dcc = _dbContext.Dcontacts
                            .Where(c => c.ClientId == clientInfo.ClientId &&
                                                        c.DtypeContactId == 2 &&
                                                        c.Cnom == dcontactcave.Cnom &&
                                                        c.Cprénom == dcontactcave.Cprénom)
                            .OrderByDescending(d => d.ContactId)
                            .FirstOrDefault();
                // --*--*--* valorisation de l'adresse de livraison (prélèvement)
                if (dcc != null) { fLKeys.L_ContactId = dcc.ContactId; }
            }
            if (fLKeys.F_ContactId == 0)
            {
                Dcontact fcon = new Dcontact
                {
                    ClientId = clientInfo.ClientId,
                    DtypeContactId = (short)clientInfo.F_DTypeContact,
                    Cnom = clientInfo.F_Cnom,
                    Cprénom = clientInfo.F_Cprénom,
                    AdresseMail = clientInfo.F_AdresseMail,
                    TélPortable = clientInfo.F_TélPortable,
                    TélFixe = clientInfo.F_TélFixe,
                    Adresse1 = clientInfo.F_Adresse1,
                    Adresse2 = clientInfo.F_Adresse2,
                    Ville = clientInfo.F_Ville,
                    Pays = clientInfo.F_Pays,
                    NuméroPostal = clientInfo.F_NuméroPostal
                };
                fLKeys.Ok = PostOneContact(fcon, false);
                if (!fLKeys.Ok) { return fLKeys; }
                newfc = true;
                mod = true;
            }
            // -- * -- * -- * Check L_Contact
            // -- * -- * -- * Cas du prélèvement à la cave
            if (fLKeys.L_ContactId == 0)
            {
                Dcontact lcon = new Dcontact
                {
                    ClientId = clientInfo.ClientId,
                    DtypeContactId = (short)clientInfo.L_DTypeContact,
                    Cnom = clientInfo.L_Cnom,
                    Cprénom = clientInfo.L_Cprénom,
                    AdresseMail = clientInfo.L_AdresseMail,
                    TélPortable = clientInfo.L_TélPortable,
                    TélFixe = clientInfo.L_TélFixe,
                    Adresse1 = clientInfo.L_Adresse1,
                    Adresse2 = clientInfo.L_Adresse2,
                    Ville = clientInfo.L_Ville,
                    Pays = clientInfo.L_Pays,
                    NuméroPostal = clientInfo.L_NuméroPostal
                };
                fLKeys.Ok = PostOneContact(lcon, false);
                if (!fLKeys.Ok) { return fLKeys; }
                newlc = true;
                mod = true;
            }
            // -- * -- * -- * SaveChanges
            if (mod)
            {
                _dbContext.SaveChanges();
            }
            // -- * -- * -- * il n'y a PAS eu aucun changement ou seulement de CLI
            if (!mod || (newc && !newfc && !newlc))
            { 
                bool fcidem = false;
                if ((clientInfo.F_DTypeContact == 0) && !livcav) { fcidem = true; }
                if (fcidem)
                // -- * -- * -- * Livraison = facturation
                {
                    fLKeys.F_ContactId = clientInfo.F_ContactId;
                    fLKeys.L_ContactId = clientInfo.F_ContactId;
                }
                else
                {
                    fLKeys.F_ContactId = clientInfo.F_ContactId;
                    fLKeys.L_ContactId = clientInfo.L_ContactId;
                }
                fLKeys.Ok = true;
                if (!mod) { return fLKeys; }
            }
            // -- * -- * -- * il n'y a eu au moins un changement (F_CONTACT ou L_CONTACT)
            if (newfc || newlc)
            // -- * -- * -- * Obtention des nouveaux n° de contacts
            {
                ClientInfo newcli = GetOneClientInfo(clientInfo.ClientId);
                fLKeys.Ok = true;
                if (newcli.F_ContactId == 0) { fLKeys.Ok = false; }

                fLKeys.F_ContactId = newcli.F_ContactId;

                if (!livcav)
                // -- *  -- * -- * En cas de prélèvement on ne touche plus à l'adresse de livraison
                {
                    // -- *  -- * -- * Valorisation de l'adresse de livraison
                    if (newcli.L_ContactId == 0) 
                    {
                        // -- *  -- * -- * Livraison = facturation
                        fLKeys.L_ContactId = newcli.F_ContactId;
                    }
                    else
                    {
                        // -- *  -- * -- * Livraison != facturation
                        fLKeys.L_ContactId = newcli.L_ContactId;
                    }
                }
            } 
            return fLKeys;
        }
        // -- * -- * -- * CONTACT -- * -- * -- * -- * -- * -- * -- * -- * 
        public Boolean PostOneContact(Dcontact dcontact, bool save)
        {
            if (dcontact == null) { return false; }
            dcontact.ContactId = 0;
            _dbContext.Add(dcontact);
            if (save) { _dbContext.SaveChanges(); }
            return true;
        }
        #endregion
    }
}
