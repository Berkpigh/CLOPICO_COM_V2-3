import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FetchGetAllNumeroPostal, FetchGetOneClientInfo, FetchPostOneClientInfo } from "../../services/apis";
import { userInfo } from "../../../authentication/models";
import { getUserInfoFromLocalDb } from '../../../authentication/services/localstorage.infrastructure';
import { useClientInfoContext } from "../../cliinfcontext";
import { ClientData, ClientInfo, F_ContactData, FLKeys, L_ContactData, NumPost, NumPostList } from "../../models";
import { BASE_URL } from "../../../../core/infrastructures/https/http-handler";

export const UpdateClientInfo = () => 
{
  const clicontext = useClientInfoContext()
  console.log('clicontext.value .', clicontext.value)
// ***  ***  ***  ***  *** FONCTIONS RELATIVES A l'OBTENTION DES DATA 
  const [clientInfoState, setClientInfoState] = useState<ClientInfo>({
      clientId: 0,
      ownerId: "",
      nom: "",
      prénom: "",
      dateContact: new(Date),
      f_ContactId: 0,
      f_DTypeContact: 0,
      f_Cnom: "",
      f_Cprénom: "",
      f_AdresseMail: "",
      f_TélPortable: "",
      f_TélFixe: "",
      f_Adresse1: "",
      f_Adresse2: "",
      f_Ville: "",
      f_Pays: "",
      f_NuméroPostal: 0,

      l_ContactId: 0,
      l_DTypeContact: 0,
      l_Cnom: "",
      l_Cprénom: "",
      l_AdresseMail: "",
      l_TélPortable: "",
      l_TélFixe: "",
      l_Adresse1: "",
      l_Adresse2: "",
      l_Ville: "",
      l_Pays: "",
      l_NuméroPostal: 0,
      ok: false
    });
  const [clientInfoDataUnmodified, setClientInfoDataUnmodified] = useState<ClientInfo>({
    clientId: 0,
    ownerId: "",
    nom: "",
    prénom: "",
    dateContact: new(Date),
    f_ContactId: 0,
    f_DTypeContact: 0,
    f_Cnom: "",
    f_Cprénom: "",
    f_AdresseMail: "",
    f_TélPortable: "",
    f_TélFixe: "",
    f_Adresse1: "",
    f_Adresse2: "",
    f_Ville: "",
    f_Pays: "",
    f_NuméroPostal: 0,

    l_ContactId: 0,
    l_DTypeContact: 0,
    l_Cnom: "",
    l_Cprénom: "",
    l_AdresseMail: "",
    l_TélPortable: "",
    l_TélFixe: "",
    l_Adresse1: "",
    l_Adresse2: "",
    l_Ville: "",
    l_Pays: "",
    l_NuméroPostal: 0,
    ok: false
  });
  const [clientDataState, setClientDataState] = useState<ClientData>({
    clientId: 0,
    ownerId: "",
    nom: "",
    prénom: "",
    dateContact: new(Date)
  })
  const [clientDataUnmodified, setClientDataUnmodified] = useState<ClientData>({
    clientId: 0,
    ownerId: "",
    nom: "",
    prénom: "",
    dateContact: new(Date)
  })
  const [f_contactDataState, setF_ContactDataState] = useState<F_ContactData>({
    f_ContactId: 0,
    f_DTypeContact: 0,
    f_Cnom: "",
    f_Cprénom: "",
    f_AdresseMail: "",
    f_TélPortable: "",
    f_TélFixe: "",
    f_Adresse1: "",
    f_Adresse2: "",
    f_Ville: "",
    f_Pays: "",
    f_NuméroPostal: 0,
  });
  const [f_contactDataUnmodified, setF_ContactDataUnmodified] = useState<F_ContactData>({
    f_ContactId: 0,
    f_DTypeContact: 0,
    f_Cnom: "",
    f_Cprénom: "",
    f_AdresseMail: "",
    f_TélPortable: "",
    f_TélFixe: "",
    f_Adresse1: "",
    f_Adresse2: "",
    f_Ville: "",
    f_Pays: "",
    f_NuméroPostal: 0,
  });
  const [l_contactDataState, setL_ContactDataState] = useState<L_ContactData>({
    l_ContactId: 0,
    l_DTypeContact: 0,
    l_Cnom: "",
    l_Cprénom: "",
    l_AdresseMail: "",
    l_TélPortable: "",
    l_TélFixe: "",
    l_Adresse1: "",
    l_Adresse2: "",
    l_Ville: "",
    l_Pays: "",
    l_NuméroPostal: 0,
  });
  const [l_contactDataUnmodified, setL_ContactDataUnmodified] = useState<L_ContactData>({
    l_ContactId: 0,
    l_DTypeContact: 0,
    l_Cnom: "",
    l_Cprénom: "",
    l_AdresseMail: "",
    l_TélPortable: "",
    l_TélFixe: "",
    l_Adresse1: "",
    l_Adresse2: "",
    l_Ville: "",
    l_Pays: "",
    l_NuméroPostal: 0,
  });
  const [flKeyState, setFlkeyState] = useState<FLKeys>({
    f_contactId: 0,
    l_contactId: 0,
    ok: false
  })
  const [nPListState, setNPListState] = useState<NumPostList>([])

  const [fvillePartial, setFvillePartial] = useState<NumPost>({
    localité: "",
    numéroPostal: 0,
    canton: "",
    statutLivraison: 0
  })
  const [lvillePartial, setLvillePartial] = useState<NumPost>({
    localité: "",
    numéroPostal: 0,
    canton: "",
    statutLivraison: 0
  })

  const [fraisLivYes, setFraisLivYes] = useState<boolean>(false)
  const [livAState, setLivAState] = useState<string>("")
  const [livraisonTitle, setLivraisonTitle] = useState<string>("")
  const [loadedState, setLoadedState] = useState<boolean>(false)
  const [cdModState, setCdModState] = useState<boolean>(false)
  const [fcModState, setFcModState] = useState<boolean>(false)
  const [lcModState, setLcModState] = useState<boolean>(false)
  const [totModState, setTotModState] = useState<boolean>(false)
  const [selectedLivMod, setSelectedLivMod] = useState<string>("1")
  const [hideLivState, setHideLivState] = useState<boolean>(false)
  const [enableOrderState, setEnableOrderState] = useState<boolean>(false)

  const [nomOk, setNomOK] = useState<boolean>(true)
  const [prénomOk, setPrénomOK] = useState<boolean>(true)
  const [uiMail, setUiMail] = useState<string>("")

  const [fcontactIdState, setFcontactIdState] = useState<number>(2)
  const [f_cnomOk, setF_cnomOK] = useState<boolean>(true)
  const [f_cprénomOk, setF_cprénomOK] = useState<boolean>(true)
  const [f_mailOk, setF_mailOK] = useState<boolean>(true)
  const [f_télOk, setF_télOK] = useState<boolean>(true)
  const [f_adrOk, setF_adrOK] = useState<boolean>(true)
  const [f_villeOk, setF_villeOK] = useState<boolean>(true)
  const [f_npOk, setF_npOK] = useState<boolean>(true)
  
  const [lcontactIdState, setLcontactIdState] = useState<number>(2)
  const [l_cnomOk, setL_cnomOK] = useState<boolean>(true)
  const [l_cprénomOk, setL_cprénomOK] = useState<boolean>(true)
  const [l_mailOk, setL_mailOK] = useState<boolean>(true)
  const [l_télOk, setL_télOK] = useState<boolean>(true)
  const [l_adrOk, setL_adrOK] = useState<boolean>(true)
  const [l_villeOk, setL_villeOK] = useState<boolean>(true)
  const [l_npOk, setL_npOK] = useState<boolean>(true)

  const navigate = useNavigate()
  
// --- * --- * --- * Déclarationde variables
  let url: string = BASE_URL
  let ciurl: string = url + "ClientInfo/"
  let npurl: string = url + "NumerosPostaux"
  let ui: userInfo | null = { email: "", clientid: 0}
  let mes: string = ''
  const adrcave: L_ContactData = {
    l_ContactId: 9007199254740990,
    l_DTypeContact: 2,
    l_Cnom: "CLOPICO",
    l_Cprénom: "Cave de",
    l_AdresseMail: "pierre.berkovits@clopico.com",
    l_TélPortable: "+41 79 475 24 07",
    l_TélFixe: "",
    l_Adresse1: "Chemin du Molan, 10",
    l_Adresse2: "",
    l_Ville: "Tannay",
    l_Pays: "VD",
    l_NuméroPostal: 1290,
  }
  const updateOnly: boolean = clicontext.value
  

// *** - *** - *** - *** - *** -  Fetch G E T
// --- * --- * --- * Obtention du n° de client et de l'email
  const getCliMailFromLS = () => {
    ui = getUserInfoFromLocalDb()
    if(ui == null){ ui = { email: "", clientid: 0 } }
    return ui
  }
  const getUrl = (ui: userInfo | null) => {
    if(ui != null) {return ciurl + ui.clientid}
    return ciurl
  }
  const setClientInfo = (ok: boolean, pclientInfo: ClientInfo) => {
    if (ok) {
      setClientInfoState(pclientInfo)
      setClientInfoDataUnmodified(pclientInfo)
      setClientDataState({
      clientId: pclientInfo.clientId,
      ownerId: pclientInfo.ownerId,
      nom: pclientInfo.nom,
      prénom: pclientInfo.prénom,
      dateContact: pclientInfo.dateContact,
      }),
      setClientDataUnmodified({
        clientId: pclientInfo.clientId,
        ownerId: pclientInfo.ownerId,
        nom: pclientInfo.nom,
        prénom: pclientInfo.prénom,
        dateContact: pclientInfo.dateContact,
      }),
      setF_ContactDataState({
      f_ContactId: pclientInfo.f_ContactId,
      f_DTypeContact: pclientInfo.f_DTypeContact,
      f_Cnom: pclientInfo.f_Cnom,
      f_Cprénom: pclientInfo.f_Cprénom,
      f_AdresseMail: pclientInfo.f_AdresseMail,
      f_TélPortable: pclientInfo.f_TélPortable,
      f_TélFixe: pclientInfo.f_TélFixe,
      f_Adresse1: pclientInfo.f_Adresse1,
      f_Adresse2: pclientInfo.f_Adresse2,
      f_Ville: pclientInfo.f_Ville,
      f_Pays: pclientInfo.f_Pays,
      f_NuméroPostal: pclientInfo.f_NuméroPostal,
      }),
      setF_ContactDataUnmodified({
        f_ContactId: pclientInfo.f_ContactId,
        f_DTypeContact: pclientInfo.f_DTypeContact,
        f_Cnom: pclientInfo.f_Cnom,
        f_Cprénom: pclientInfo.f_Cprénom,
        f_AdresseMail: pclientInfo.f_AdresseMail,
        f_TélPortable: pclientInfo.f_TélPortable,
        f_TélFixe: pclientInfo.f_TélFixe,
        f_Adresse1: pclientInfo.f_Adresse1,
        f_Adresse2: pclientInfo.f_Adresse2,
        f_Ville: pclientInfo.f_Ville,
        f_Pays: pclientInfo.f_Pays,
        f_NuméroPostal: pclientInfo.f_NuméroPostal,        
      })
      setL_ContactDataState({
      l_ContactId: pclientInfo.l_ContactId,
      l_DTypeContact: pclientInfo.l_DTypeContact,
      l_Cnom: pclientInfo.l_Cnom,
      l_Cprénom: pclientInfo.l_Cprénom,
      l_AdresseMail: pclientInfo.l_AdresseMail,
      l_TélPortable: pclientInfo.l_TélPortable,
      l_TélFixe: pclientInfo.l_TélFixe,
      l_Adresse1: pclientInfo.l_Adresse1,
      l_Adresse2: pclientInfo.l_Adresse2,
      l_Ville: pclientInfo.l_Ville,
      l_Pays: pclientInfo.l_Pays,
      l_NuméroPostal: pclientInfo.l_NuméroPostal
      })
      setL_ContactDataUnmodified({
        l_ContactId: pclientInfo.l_ContactId,
        l_DTypeContact: pclientInfo.l_DTypeContact,
        l_Cnom: pclientInfo.l_Cnom,
        l_Cprénom: pclientInfo.l_Cprénom,
        l_AdresseMail: pclientInfo.l_AdresseMail,
        l_TélPortable: pclientInfo.l_TélPortable,
        l_TélFixe: pclientInfo.l_TélFixe,
        l_Adresse1: pclientInfo.l_Adresse1,
        l_Adresse2: pclientInfo.l_Adresse2,
        l_Ville: pclientInfo.l_Ville,
        l_Pays: pclientInfo.l_Pays,
        l_NuméroPostal: pclientInfo.l_NuméroPostal
      })
    }
    setFlkeyState({f_contactId: 0, l_contactId: 0, ok: false})
    valuateLivState()
    setLoadedState(true)
  }
  type CallbackGetClinfFunction = (result: ClientInfo) => void
  const getOneclinf = async (callback: CallbackGetClinfFunction) => {
      ui = getCliMailFromLS()
      ciurl = getUrl(ui)
      await FetchGetOneClientInfo(ciurl)
      .then((res) => {callback(res)})
  }
  function handleGetClinfCallback(result: ClientInfo) {
      setClientInfo(result.ok, result)
      if(ui?.email != null) {setUiMail(ui?.email)} else {setUiMail("")}
  }
  type CallbackGetNPFunction = (result: NumPostList) => void
  const getAllNP = async (callback: CallbackGetNPFunction) => {
    await FetchGetAllNumeroPostal(npurl)
    .then((res) => {callback(res)})
  }
  function handleGetNPCallback(result: NumPostList) {
    setNPListState(result)
  }

  useEffect(() => {
    getOneclinf(handleGetClinfCallback)
    getAllNP(handleGetNPCallback)
  }, [loadedState])

/*
// *** - *** - *** - *** - *** -  Fetch P O S T
*/
  type CallbackPostFunction = (result: FLKeys) => void
  const postOneclinf = async (clientInf: ClientInfo, callback: CallbackPostFunction) => {
    ui = getCliMailFromLS()
    ciurl = getUrl(ui)
    await FetchPostOneClientInfo(clientInf, ciurl)
      .then((res) => {callback(res)})
  }
  function handlePostCallback(result: FLKeys) {
    setFlkeyState(result)
    if(result.ok) { setEnableOrderState(true)}
    if(flKeyState.ok) { mes = "Informations correctement mises à jour" }
  }
  switch (true) {
    case (flKeyState.ok && clientInfoState.ok) :
      mes = 'Informations correctement mises à jour'
      break
    case clientInfoState.ok :
      mes = 'Informations de compte'
      break
    break
    case !clientInfoState.ok :
      mes = 'Informations de compte non trouvées'
    break
    case !flKeyState.ok :
      mes = 'Problème survenu lors de la mises à jour'
    }
/*
// *** === *** === * FONCTIONS RELATIVES AU FORMULAIRE *** === *** === 
*/
// --- * --- * --- * Fonctions générales
// --- * --- * --- * Validation initiale
  const validateCliFCLC = () => {
    validateUnmodifiedCliData(clientDataState)
    validateUnmodifiedFCData(f_contactDataState)
    validateUnmodifiedLCData(l_contactDataState)
    if(!validateCliData) {return false}
    if(!validateFconData) {return false}
    if(!validateLconData) {return false}
    return true
  }
  const valuateLivState = () => {
    setLivAState('Livré à : ')
    setFraisLivYes(false)
    switch (true) {
      case  (selectedLivMod == "1" && lvillePartial.statutLivraison == 0) :
        setLivraisonTitle("adresse de livraison")
        break
      case  (selectedLivMod == "1" && lvillePartial.statutLivraison == 1) :
        setFraisLivYes(true)
        setLivraisonTitle("adresse de livraison avec frais")
        break
      case  (selectedLivMod == "0" && fvillePartial.statutLivraison == 0) :
        setLivraisonTitle("adresse de facturation")
        break
      case  (selectedLivMod == "0" && fvillePartial.statutLivraison == 1) :
        setFraisLivYes(true)
        setLivraisonTitle("adresse de facturation avec frais")
        break
      case  (selectedLivMod == "3") :
        setLivraisonTitle("Prélèvement à la cave")
        setLivAState("")   
    }
  }
  const findNP = (pFL: string, loc: string) => {
    let res: NumPost = {
      numéroPostal: 0,
      localité: "",
      canton: "",
      statutLivraison: 0
    }
    let end: number = loc.length
    let result: NumPost| undefined  = nPListState.find(({localité}) => localité === loc)
    if(result != undefined) { 
      if(pFL == "F") {setFvillePartial(res) } else {setLvillePartial(res)}
      res = result
      return res
    }
    result = nPListState.find(({localité}) => localité.substring(0,end) === loc)
    if(result != undefined) { res = result }
    if(pFL == "F") {setFvillePartial(res) } else {setLvillePartial(res)}
    return res
  }
  const checkEmail = (pm: string) => {
    if(pm.length < 1) { return false }
    let pmparts: string[] = pm.split("@")
    if(pmparts.length < 2)  { return false }
    pm = pmparts[1]
    let pmparts2: string[] = pm.split(".")
    if(pmparts2.length < 2)  { return false }
    return true
  }
  const updateLcontactId = (plid: number) => {
    if(selectedLivMod != "1") { setLcontactIdState(1); return }
    setLcontactIdState(plid)
  }
  const veryfyAll = () => {
// test si état initial
    if(fcontactIdState == 2) {setFcontactIdState(f_contactDataState.f_ContactId)}
    if(lcontactIdState == 2) {updateLcontactId(l_contactDataState.l_ContactId)}
//
    validateCliFCLC()
  }
  const checkTotModState = (pCFL: string, pstate: boolean) => {
    switch (pCFL) {
      case "C" :
        setCdModState(pstate)
        if(!pstate && !fcModState && !lcModState) { setTotModState(true) }
        break
      case "F" :
        setFcModState(pstate)
        if(cdModState && !pstate! && !lcModState) { setTotModState(true) }
        break
      case "L" :
        setLcModState(pstate)
        if(!cdModState && !fcModState && !pstate) { setTotModState(true) }
        break
    }
  }
// --- * --- * --- * Concerne CLIENTDATA
// --- * --- * --- * changeEvents CLIENTDATA
  const updPrenom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: ClientData = {
        clientId: clientDataState.clientId,
        ownerId: clientDataState.ownerId,
        nom: clientDataState.nom,
        prénom: e.target.value,
        dateContact: clientDataState.dateContact
      };
      setClientDataState(newState);
      if(e.target.value.length < 3) { setPrénomOK(false) } else { setPrénomOK(true) }
  }
  const updNom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: ClientData = {
      clientId: clientDataState.clientId,
      ownerId: clientDataState.ownerId,
      nom: e.target.value,
      prénom: clientDataState.prénom,
      dateContact: clientDataState.dateContact
    };
    setClientDataState(newState)
    if(e.target.value.length < 3) { setNomOK(false) } else { setNomOK(true) }
  }
  const handleSelEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let dtc: number = parseInt(value)
    updF_DTypeContact(dtc)    
    setSelectedLivMod(value);
    setHideLivState(false)
    switch (dtc) {
      case 0 :
        setHideLivState(true)
        break
      case 1 :
        setL_ContactDataState(l_contactDataUnmodified)
        break
      case 3 :
        setL_ContactDataState(adrcave)
    }
  };
// --- * --- * --- * Validations CLIENTDATA
  const validateCliData = () => {
    if(!prénomOk || !nomOk) {return false} else {return true}
  }
  const validateUnmodifiedCliData = (cliunmod: ClientData) => {
    if(cliunmod.prénom.length < 3) { setPrénomOK(false) } else {setPrénomOK(true)}
    if(cliunmod.nom.length < 3) { setNomOK(false) } else {setNomOK(true)}
  }
// --- * --- * --- * button clicks CLIENTDATA
  const modCdState = () => { 
    if(!fcModState && !lcModState)
    {
      veryfyAll()
      setCdModState(true)
    }
  }
  const okCdState = () => {
    valuateLivState()
    if(validateCliData()) {
      setClientDataUnmodified(clientDataState)
      checkTotModState("C", false)
    }
  }
  const cancCdState = () => { 
    setClientDataState(clientDataUnmodified) 
    validateUnmodifiedCliData(clientDataUnmodified)
    checkTotModState("C", false)
  }
  /*
  // === * === * === * === * Concerne F_CONTACTDATA
  */
  // --- * --- * --- * changeEvents F_CONTACTDATA
  const updF_DTypeContact = (pdtc: number) => {
    const newState: F_ContactData = {
      f_ContactId: f_contactDataState.f_ContactId,
      f_DTypeContact: pdtc,
      f_Cnom: f_contactDataState.f_Cnom,
      f_Cprénom: f_contactDataState.f_Cprénom,
      f_AdresseMail: f_contactDataState.f_AdresseMail,
      f_TélPortable: f_contactDataState.f_TélPortable,
      f_TélFixe: f_contactDataState.f_TélFixe,
      f_Adresse1: f_contactDataState.f_Adresse1,
      f_Adresse2: f_contactDataState.f_Adresse2,
      f_Ville: f_contactDataState.f_Ville,
      f_Pays: f_contactDataState.f_Pays,
      f_NuméroPostal: f_contactDataState.f_NuméroPostal,
    };
    setF_ContactDataState(newState);
  }
  const updF_Cnom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: F_ContactData = {
      f_ContactId: f_contactDataState.f_ContactId,
      f_DTypeContact: parseInt(selectedLivMod),
      f_Cnom: e.target.value,
      f_Cprénom: f_contactDataState.f_Cprénom,
      f_AdresseMail: f_contactDataState.f_AdresseMail,
      f_TélPortable: f_contactDataState.f_TélPortable,
      f_TélFixe: f_contactDataState.f_TélFixe,
      f_Adresse1: f_contactDataState.f_Adresse1,
      f_Adresse2: f_contactDataState.f_Adresse2,
      f_Ville: f_contactDataState.f_Ville,
      f_Pays: f_contactDataState.f_Pays,
      f_NuméroPostal: f_contactDataState.f_NuméroPostal,
    };
    setF_ContactDataState(newState);
    if(e.target.value.length < 3) { setF_cnomOK(false) } else { setF_cnomOK(true) }
  }
  const updF_Cprénom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: F_ContactData = {
      f_ContactId: f_contactDataState.f_ContactId,
      f_DTypeContact: parseInt(selectedLivMod),
      f_Cnom: f_contactDataState.f_Cnom,
      f_Cprénom: e.target.value,
      f_AdresseMail: f_contactDataState.f_AdresseMail,
      f_TélPortable: f_contactDataState.f_TélPortable,
      f_TélFixe: f_contactDataState.f_TélFixe,
      f_Adresse1: f_contactDataState.f_Adresse1,
      f_Adresse2: f_contactDataState.f_Adresse2,
      f_Ville: f_contactDataState.f_Ville,
      f_Pays: f_contactDataState.f_Pays,
      f_NuméroPostal: f_contactDataState.f_NuméroPostal,
    };
    setF_ContactDataState(newState);
    if(e.target.value.length < 3) { setF_cprénomOK(false) } else { setF_cprénomOK(true) }
  }
  const updF_AdresseMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: F_ContactData = {
      f_ContactId: f_contactDataState.f_ContactId,
      f_DTypeContact: parseInt(selectedLivMod),
      f_Cnom: f_contactDataState.f_Cnom,
      f_Cprénom: f_contactDataState.f_Cprénom,
      f_AdresseMail: e.target.value,
      f_TélPortable: f_contactDataState.f_TélPortable,
      f_TélFixe: f_contactDataState.f_TélFixe,
      f_Adresse1: f_contactDataState.f_Adresse1,
      f_Adresse2: f_contactDataState.f_Adresse2,
      f_Ville: f_contactDataState.f_Ville,
      f_Pays: f_contactDataState.f_Pays,
      f_NuméroPostal: f_contactDataState.f_NuméroPostal,
    };
    setF_ContactDataState(newState);
    let ok: boolean = true
    ok = checkEmail(e.target.value)
    setF_mailOK(ok)
  }
  const updF_TélPortable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: F_ContactData = {
      f_ContactId: f_contactDataState.f_ContactId,
      f_DTypeContact: parseInt(selectedLivMod),
      f_Cnom: f_contactDataState.f_Cnom,
      f_Cprénom: f_contactDataState.f_Cprénom,
      f_AdresseMail: f_contactDataState.f_AdresseMail,
      f_TélPortable: e.target.value,
      f_TélFixe: f_contactDataState.f_TélFixe,
      f_Adresse1: f_contactDataState.f_Adresse1,
      f_Adresse2: f_contactDataState.f_Adresse2,
      f_Ville: f_contactDataState.f_Ville,
      f_Pays: f_contactDataState.f_Pays,
      f_NuméroPostal: f_contactDataState.f_NuméroPostal,
    };
    setF_ContactDataState(newState);
    let tel: string = e.target.value.replaceAll(" ","")
    if(parseInt(tel) == undefined || tel.length < 11) { setF_télOK(false) } else { setF_télOK(true) }
  }
  const updF_TélFixe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: F_ContactData = {
      f_ContactId: f_contactDataState.f_ContactId,
      f_DTypeContact: parseInt(selectedLivMod),
      f_Cnom: f_contactDataState.f_Cnom,
      f_Cprénom: f_contactDataState.f_Cprénom,
      f_AdresseMail: f_contactDataState.f_AdresseMail,
      f_TélPortable: f_contactDataState.f_TélPortable,
      f_TélFixe: e.target.value,
      f_Adresse1: f_contactDataState.f_Adresse1,
      f_Adresse2: f_contactDataState.f_Adresse2,
      f_Ville: f_contactDataState.f_Ville,
      f_Pays: f_contactDataState.f_Pays,
      f_NuméroPostal: f_contactDataState.f_NuméroPostal,
    };
    setF_ContactDataState(newState);
  }
  const updF_Adresse1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: F_ContactData = {
      f_ContactId: f_contactDataState.f_ContactId,
      f_DTypeContact: parseInt(selectedLivMod),
      f_Cnom: f_contactDataState.f_Cnom,
      f_Cprénom: f_contactDataState.f_Cprénom,
      f_AdresseMail: f_contactDataState.f_AdresseMail,
      f_TélPortable: f_contactDataState.f_TélPortable,
      f_TélFixe: f_contactDataState.f_TélFixe,
      f_Adresse1: e.target.value,
      f_Adresse2: f_contactDataState.f_Adresse2,
      f_Ville: f_contactDataState.f_Ville,
      f_Pays: f_contactDataState.f_Pays,
      f_NuméroPostal: f_contactDataState.f_NuméroPostal,
    };
    setF_ContactDataState(newState);
    if(e.target.value.length < 4) { setF_adrOK(false) } else { setF_adrOK(true) }
  }
  const updF_Adresse2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: F_ContactData = {
      f_ContactId: f_contactDataState.f_ContactId,
      f_DTypeContact: parseInt(selectedLivMod),
      f_Cnom: f_contactDataState.f_Cnom,
      f_Cprénom: f_contactDataState.f_Cprénom,
      f_AdresseMail: f_contactDataState.f_AdresseMail,
      f_TélPortable: f_contactDataState.f_TélPortable,
      f_TélFixe: f_contactDataState.f_TélFixe,
      f_Adresse1: f_contactDataState.f_Adresse1,
      f_Adresse2: e.target.value,
      f_Ville: f_contactDataState.f_Ville,
      f_Pays: f_contactDataState.f_Pays,
      f_NuméroPostal: f_contactDataState.f_NuméroPostal,
    };
    setF_ContactDataState(newState);
  }
  const updF_Ville = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result: NumPost = findNP("F", e.target.value)
    const newState: F_ContactData = {
      f_ContactId: f_contactDataState.f_ContactId,
      f_DTypeContact: parseInt(selectedLivMod),
      f_Cnom:f_contactDataState.f_Cnom,
      f_Cprénom: f_contactDataState.f_Cprénom,
      f_AdresseMail: f_contactDataState.f_AdresseMail,
      f_TélPortable: f_contactDataState.f_TélPortable,
      f_TélFixe: f_contactDataState.f_TélFixe,
      f_Adresse1: f_contactDataState.f_Adresse1,
      f_Adresse2: f_contactDataState.f_Adresse2,
      f_Ville: e.target.value,
      f_Pays: result.canton,
      f_NuméroPostal: result.numéroPostal,
    };
    setF_ContactDataState(newState);
    if(newState.f_NuméroPostal == 0) { setF_villeOK(false); setF_npOK(false)}
                           else { setF_villeOK(true); setF_npOK(true) }
  }

// ---* ---* ---* ---* Validations F_CONTACTDATA
  const validateFconData = () => {
    if(!f_cprénomOk) {return false}
    if(!f_cnomOk) {return false}
    if(!f_mailOk) {return false}
    if(!f_télOk) {return false}
    if(!f_adrOk) {return false}
    if(!f_villeOk) {return false}
    if(!f_npOk) {return false}
    return true
  }
  const validateUnmodifiedFCData = (f_cunmod: F_ContactData) => {
    if(f_cunmod.f_Cprénom.length < 3) { setF_cprénomOK(false) } else {setF_cprénomOK(true)}
    if(f_cunmod.f_Cnom.length < 3) { setF_cnomOK(false) } else {setF_cnomOK(true)}
    if(f_cunmod.f_AdresseMail.length < 1) { setF_mailOK(false) } else {setF_mailOK(true)}
    let tel: string = f_cunmod.f_TélPortable.trim()
    if(parseInt(tel) == undefined || tel.length < 11) { setF_télOK(false) } else { setF_télOK(true) }
    if(f_cunmod.f_Adresse1.length < 4) { setF_adrOK(false) } else {setF_adrOK(true)}
    if(f_cunmod.f_NuméroPostal == 0) { setF_villeOK(false); setF_npOK(false)}
                           else { setF_villeOK(true); setF_npOK(true) }
  }
  //  ---* ---* ---* ---* button clicks F_CONTACTDATA
  const modFcState = () => {
    if(!cdModState && !lcModState)
    {
      //////////const res: NumPost = findNP("F", f_contactDataState.f_Ville)
      veryfyAll()
      setFcModState(true)
    }
  }
  const okFcState = () => {
    adoptFVillePartial()
    valuateLivState()
    if(validateFconData()){
      setFcontactIdState(0)
      setF_ContactDataUnmodified(f_contactDataState)
      checkTotModState("F", false)
    }
  }
  const cancFcState = () => {
    setF_ContactDataState(f_contactDataUnmodified)
    setFcontactIdState(f_contactDataUnmodified.f_ContactId) 
    validateUnmodifiedFCData(f_contactDataUnmodified)
    checkTotModState("F", false)
  }
  const adoptFVillePartial = () => {
    if(fvillePartial.localité == ""){ return }
    const newState: F_ContactData = {
      f_ContactId: f_contactDataState.f_ContactId,
      f_DTypeContact: parseInt(selectedLivMod),
      f_Cnom:f_contactDataState.f_Cnom,
      f_Cprénom: f_contactDataState.f_Cprénom,
      f_AdresseMail: f_contactDataState.f_AdresseMail,
      f_TélPortable: f_contactDataState.f_TélPortable,
      f_TélFixe: f_contactDataState.f_TélFixe,
      f_Adresse1: f_contactDataState.f_Adresse1,
      f_Adresse2: f_contactDataState.f_Adresse2,
      f_Ville: fvillePartial.localité,
      f_Pays: fvillePartial.canton,
      f_NuméroPostal: fvillePartial.numéroPostal,
    };
    setF_ContactDataState(newState);
    if(newState.f_NuméroPostal == 0) { setF_villeOK(false); setF_npOK(false)}
                           else { setF_villeOK(true); setF_npOK(true) }
    setFvillePartial({
      localité: "",
      numéroPostal: newState.f_NuméroPostal,
      canton: newState.f_Pays,
      statutLivraison: fvillePartial.statutLivraison
    })
  }
  /*
  // === * === * === * === * Concerne L_CONTACTDATA
  */
  // --- * --- * --- * changeEvents L_CONTACTDATA
  const updL_Cnom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: L_ContactData = {
      l_ContactId: l_contactDataState.l_ContactId,
      l_DTypeContact: parseInt(selectedLivMod),
      l_Cnom: e.target.value,
      l_Cprénom: l_contactDataState.l_Cprénom,
      l_AdresseMail: l_contactDataState.l_AdresseMail,
      l_TélPortable: l_contactDataState.l_TélPortable,
      l_TélFixe: l_contactDataState.l_TélFixe,
      l_Adresse1: l_contactDataState.l_Adresse1,
      l_Adresse2: l_contactDataState.l_Adresse2,
      l_Ville: l_contactDataState.l_Ville,
      l_Pays: l_contactDataState.l_Pays,
      l_NuméroPostal: l_contactDataState.l_NuméroPostal,
    };
    setL_ContactDataState(newState);
    if(e.target.value.length < 3) { setL_cnomOK(false) } else { setL_cnomOK(true) }
  }
  const updL_Cprénom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: L_ContactData = {
      l_ContactId: l_contactDataState.l_ContactId,
      l_DTypeContact: parseInt(selectedLivMod),
      l_Cnom: l_contactDataState.l_Cnom,
      l_Cprénom: e.target.value,
      l_AdresseMail: l_contactDataState.l_AdresseMail,
      l_TélPortable: l_contactDataState.l_TélPortable,
      l_TélFixe: l_contactDataState.l_TélFixe,
      l_Adresse1: l_contactDataState.l_Adresse1,
      l_Adresse2: l_contactDataState.l_Adresse2,
      l_Ville: l_contactDataState.l_Ville,
      l_Pays: l_contactDataState.l_Pays,
      l_NuméroPostal: l_contactDataState.l_NuméroPostal,
    };
    setL_ContactDataState(newState);
    if(e.target.value.length < 3) { setL_cprénomOK(false) } else { setL_cprénomOK(true) }
  }
  const updL_AdresseMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: L_ContactData = {
      l_ContactId: l_contactDataState.l_ContactId,
      l_DTypeContact: parseInt(selectedLivMod),
      l_Cnom: l_contactDataState.l_Cnom,
      l_Cprénom: l_contactDataState.l_Cprénom,
      l_AdresseMail: e.target.value,
      l_TélPortable: l_contactDataState.l_TélPortable,
      l_TélFixe: l_contactDataState.l_TélFixe,
      l_Adresse1: l_contactDataState.l_Adresse1,
      l_Adresse2: l_contactDataState.l_Adresse2,
      l_Ville: l_contactDataState.l_Ville,
      l_Pays: l_contactDataState.l_Pays,
      l_NuméroPostal: l_contactDataState.l_NuméroPostal,
    };
    setL_ContactDataState(newState);
    let ok: boolean = true
    ok = checkEmail(e.target.value)
    setL_mailOK(ok)
  }
  const updL_TélPortable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: L_ContactData = {
      l_ContactId: l_contactDataState.l_ContactId,
      l_DTypeContact: parseInt(selectedLivMod),
      l_Cnom: l_contactDataState.l_Cnom,
      l_Cprénom: l_contactDataState.l_Cprénom,
      l_AdresseMail: l_contactDataState.l_AdresseMail,
      l_TélPortable: e.target.value,
      l_TélFixe: l_contactDataState.l_TélFixe,
      l_Adresse1: l_contactDataState.l_Adresse1,
      l_Adresse2: l_contactDataState.l_Adresse2,
      l_Ville: l_contactDataState.l_Ville,
      l_Pays: l_contactDataState.l_Pays,
      l_NuméroPostal: l_contactDataState.l_NuméroPostal,
    };
    setL_ContactDataState(newState);
  }
  const updL_TélFixe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: L_ContactData = {
      l_ContactId: l_contactDataState.l_ContactId,
      l_DTypeContact: parseInt(selectedLivMod),
      l_Cnom: l_contactDataState.l_Cnom,
      l_Cprénom: l_contactDataState.l_Cprénom,
      l_AdresseMail: l_contactDataState.l_AdresseMail,
      l_TélPortable: l_contactDataState.l_TélPortable,
      l_TélFixe: e.target.value,
      l_Adresse1: l_contactDataState.l_Adresse1,
      l_Adresse2: l_contactDataState.l_Adresse2,
      l_Ville: l_contactDataState.l_Ville,
      l_Pays: l_contactDataState.l_Pays,
      l_NuméroPostal: l_contactDataState.l_NuméroPostal,
    };
    setL_ContactDataState(newState);
  }
  const updL_Adresse1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: L_ContactData = {
      l_ContactId: l_contactDataState.l_ContactId,
      l_DTypeContact: parseInt(selectedLivMod),
      l_Cnom: l_contactDataState.l_Cnom,
      l_Cprénom: l_contactDataState.l_Cprénom,
      l_AdresseMail: l_contactDataState.l_AdresseMail,
      l_TélPortable: l_contactDataState.l_TélPortable,
      l_TélFixe: l_contactDataState.l_TélFixe,
      l_Adresse1: e.target.value,
      l_Adresse2: l_contactDataState.l_Adresse2,
      l_Ville: l_contactDataState.l_Ville,
      l_Pays: l_contactDataState.l_Pays,
      l_NuméroPostal: l_contactDataState.l_NuméroPostal,
    };
    setL_ContactDataState(newState);
  }
  const updL_Adresse2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState: L_ContactData = {
      l_ContactId: l_contactDataState.l_ContactId,
      l_DTypeContact: parseInt(selectedLivMod),
      l_Cnom: l_contactDataState.l_Cnom,
      l_Cprénom: l_contactDataState.l_Cprénom,
      l_AdresseMail: l_contactDataState.l_AdresseMail,
      l_TélPortable: l_contactDataState.l_TélPortable,
      l_TélFixe: l_contactDataState.l_TélFixe,
      l_Adresse1: l_contactDataState.l_Adresse1,
      l_Adresse2: e.target.value,
      l_Ville: l_contactDataState.l_Ville,
      l_Pays: l_contactDataState.l_Pays,
      l_NuméroPostal: l_contactDataState.l_NuméroPostal,
    };
    setL_ContactDataState(newState);
  }
  const updL_Ville = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result: NumPost = findNP("L", e.target.value)
    const newState: L_ContactData = {
      l_ContactId: l_contactDataState.l_ContactId,
      l_DTypeContact: parseInt(selectedLivMod),
      l_Cnom:l_contactDataState.l_Cnom,
      l_Cprénom: l_contactDataState.l_Cprénom,
      l_AdresseMail: l_contactDataState.l_AdresseMail,
      l_TélPortable: l_contactDataState.l_TélPortable,
      l_TélFixe: l_contactDataState.l_TélFixe,
      l_Adresse1: l_contactDataState.l_Adresse1,
      l_Adresse2: l_contactDataState.l_Adresse2,
      l_Ville: e.target.value,
      l_Pays: result.canton,
      l_NuméroPostal: result.numéroPostal,
    };
    setL_ContactDataState(newState);
    if(newState.l_NuméroPostal == 0) { setL_villeOK(false); setL_npOK(false)}
                                else { setL_villeOK(true); setL_npOK(true) }
  }
// ---* ---* ---* ---* Validations L_CONTACTDATA
  const validateLconData = () => {
    if(selectedLivMod != "1") {return true}
    if(!l_cprénomOk) {return false}
    if(!l_cnomOk) {return false}
    if(!l_mailOk) {return false}
    if(!l_télOk) {return false}
    if(!l_adrOk) {return false}
    if(!l_villeOk) {return false}
    if(!l_npOk) {return false}
    return true
  }
  const validateUnmodifiedLCData = (l_cunmod: L_ContactData) => {
    if(l_cunmod.l_Cprénom.length < 3) { setL_cprénomOK(false) } else {setL_cprénomOK(true)}
    if(l_cunmod.l_Cnom.length < 3) { setL_cnomOK(false) } else {setL_cnomOK(true)}
    if(l_cunmod.l_AdresseMail.length < 1) { setL_mailOK(false) } else {setL_mailOK(true)}
    let tel: string = l_cunmod.l_TélPortable.trim()
    if(parseInt(tel) == undefined || tel.length < 11) { setL_télOK(false) } else { setL_télOK(true) }
    if(l_cunmod.l_Adresse1.length < 4) { setL_adrOK(false) } else {setL_adrOK(true)}
    if(l_cunmod.l_NuméroPostal == 0) { setL_villeOK(false); setL_npOK(false)}
                                else { setL_villeOK(true); setL_npOK(true) }
  }
// ---* ---* ---* ---* button clicks L_CONTACTDATA
  const adoptLVillePartial = () => {
    if(lvillePartial.localité == ""){ return }
    const newState: L_ContactData = {
      l_ContactId: l_contactDataState.l_ContactId,
      l_DTypeContact: parseInt(selectedLivMod),
      l_Cnom:l_contactDataState.l_Cnom,
      l_Cprénom: l_contactDataState.l_Cprénom,
      l_AdresseMail: l_contactDataState.l_AdresseMail,
      l_TélPortable: l_contactDataState.l_TélPortable,
      l_TélFixe: l_contactDataState.l_TélFixe,
      l_Adresse1: l_contactDataState.l_Adresse1,
      l_Adresse2: l_contactDataState.l_Adresse2,
      l_Ville: lvillePartial.localité,
      l_Pays: lvillePartial.canton,
      l_NuméroPostal: lvillePartial.numéroPostal,
    };
    setL_ContactDataState(newState);
    if(newState.l_NuméroPostal == 0) { setL_villeOK(false); setL_npOK(false)}
                          else { setL_villeOK(true); setL_npOK(true) }
    setLvillePartial({
      localité: "",
      numéroPostal: newState.l_NuméroPostal,
      canton: newState.l_Pays,
      statutLivraison: lvillePartial.statutLivraison
    })
  }
  const modLcState = () => {
    if(!cdModState && !fcModState && (selectedLivMod != "3"))
    {
      veryfyAll()
      setLcModState(true)
    }
  }
  const okLcState = () => {
      adoptLVillePartial()
      valuateLivState()
      if(validateLconData()){
        updateLcontactId(0)
        setL_ContactDataUnmodified(l_contactDataState)
        checkTotModState("L", false)
      }
  }
    const cancLcState = () => { 
      setL_ContactDataState(l_contactDataUnmodified)
      updateLcontactId(l_contactDataUnmodified.l_ContactId) 
      validateUnmodifiedLCData(l_contactDataUnmodified)
      checkTotModState("L", false)
    }
/*
// === * === * === * === * L'ENSEMBLE DES DATA
*/
  const modTotState = () => {
    if(!validateCliFCLC()) {return}
    let newState: ClientInfo = {
      clientId: clientDataState.clientId,
      ownerId: clientDataState.ownerId,
      nom: clientDataState.nom,
      prénom: clientDataState.prénom,
      dateContact: clientDataState.dateContact,

      f_ContactId: fcontactIdState,
      f_DTypeContact: f_contactDataState.f_DTypeContact,
      f_Cnom: f_contactDataState.f_Cnom,
      f_Cprénom: f_contactDataState.f_Cprénom,
      f_AdresseMail: f_contactDataState.f_AdresseMail,
      f_TélPortable: f_contactDataState.f_TélPortable,
      f_TélFixe: f_contactDataState.f_TélFixe,
      f_Adresse1: f_contactDataState.f_Adresse1,
      f_Adresse2: f_contactDataState.f_Adresse2,
      f_Ville: f_contactDataState.f_Ville,
      f_Pays: f_contactDataState.f_Pays,
      f_NuméroPostal: f_contactDataState.f_NuméroPostal,

      l_ContactId: lcontactIdState,
      l_DTypeContact: 2,
      l_Cnom: l_contactDataState.l_Cnom,
      l_Cprénom: l_contactDataState.l_Cprénom,
      l_AdresseMail: l_contactDataState.l_AdresseMail,
      l_TélPortable: l_contactDataState.l_TélPortable,
      l_TélFixe: l_contactDataState.l_TélFixe,
      l_Adresse1: l_contactDataState.l_Adresse1,
      l_Adresse2: l_contactDataState.l_Adresse2,
      l_Ville: l_contactDataState.l_Ville,
      l_Pays: l_contactDataState.l_Pays,
      l_NuméroPostal: l_contactDataState.l_NuméroPostal,

      ok: true
    }   
    setClientInfoState(newState)
    postOneclinf(newState, handlePostCallback)
  }
  const cancTotState = () => {
    setClientInfo(true, clientInfoDataUnmodified)
  }
  const goOrder = () => {
    navigate("/")
  }
//=====================================================================================================
// ***  ***  ***  ***  *** RENDER ***  ***  ***  ***  ***  *** 
//
  return (
  <div >
  <Container >

  {/* --- * --- * --- * --- * TITRE * --- * --- * --- * --- */}

    <Row as='div' className="divh10"></Row>
    <Row>
      <Col sm={1}></Col>
      <Col sm={5}><h1 className="all disinline">{mes}</h1></Col>
      <Col sm={1}>

      {/* className={`${totModState ? "bgcyel" : "bggreen"}`} */}

        <Button className={`${!totModState ? "btn btn-secondary px-4" : "btn bgcyel px-4"}`}
        type='submit' onClick={modTotState}
        disabled={!totModState}><strong>Enregistrer</strong></Button>
      </Col>
      <Col sm={1}></Col>
      <Col sm={1}>
        <Button className={`${!totModState ? "btn btn-secondary px-4" : "bggreen px-4"}`} 
          disabled={!totModState} onClick={cancTotState}><strong>Annuler</strong></Button>
      </Col>
      <Col sm={1}></Col>
      <Col sm={1}>
      { updateOnly && (
        <Button className={`${!enableOrderState ? "btn btn-secondary" : "bggreen"}`} 
          disabled={!enableOrderState} onClick={goOrder}><strong>Commander</strong></Button>)}
      </Col>
    </Row>

    {/* --- * --- * --- * --- * FORMULAIRE * --- * --- * --- * --- */}

    <Form>

    {/* --- * --- * --- * --- * CLIENTDATA * --- * --- * --- * --- */}

      <Row as='div' className="divh10"></Row>
      <Row>
        <Col sm={12}>
          <Row>
            <Col sm={4}></Col>
            <Col sm={1}>
              <Button className={`${cdModState ? "btn btn-secondary px-4" : "btn bgcyel px-4"}`}
                disabled={cdModState} onClick={modCdState} size="sm">Modifier</Button>
            </Col>
            <Col sm={1}></Col>
            <Col sm={1}>
              <Button className={`${!cdModState ? "btn btn-secondary px-4" : "bggreen px-4"}`}
                disabled={!cdModState} onClick={okCdState} size="sm">Ok</Button>
            </Col>
            <Col sm={1}></Col>
            <Col sm={1}>
              <Button className={`${!cdModState ? "btn btn-secondary px-4" : "bggreen px-4"}`}
                disabled={!cdModState} onClick={cancCdState} size="sm">Annuler</Button>
            </Col>
          </Row>
          <Row as='div' className="divh10"></Row>
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Col sm={1} lg={1}></Col>
            <Form.Label className={`${!prénomOk ? "text-danger" : ""}`} column sm={4}>Prénom *</Form.Label>
            <Col sm={6} lg={3}>
              <Form.Control className={`${!prénomOk ? "text-danger" : ""}`} 
                onChange={updPrenom} disabled={!cdModState} type="text" value={clientDataState.prénom}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Col sm={1} lg={1}></Col>
            <Form.Label className={`${!nomOk ? "text-danger" : ""}`} column sm={4}>Nom *</Form.Label>
            <Col sm={6} lg={3}>
              <Form.Control className={`${!nomOk ? "text-danger" : ""}`}
                onChange={updNom} disabled={!cdModState} type="text" value={clientDataState.nom}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Col lg={1}></Col>
            <Form.Label column sm={4}>Enregistré le</Form.Label>
            <Col sm={6} lg={3}>
              <Form.Control type="text" disabled value={clientDataState.dateContact}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Col  lg={1}></Col>
            <Form.Label column sm={4}>Avec l'adress mail</Form.Label>
            <Col sm={6} lg={3}>
              <Form.Control type="text" disabled value={uiMail}/>
            </Col>
          </Form.Group>
          <Row>
            <Col lg={1}></Col>
            {/* <Col sm={4}></Col> */}
            <Form.Label className="alr" column sm={4}>Comment/où livrer</Form.Label>
            <Col sm={6} lg={3}>
              <Form.Select 
                  title="Sélectioner où livrer"
                  disabled={!cdModState}
                  onChange={handleSelEvent}
                  aria-label="Sélectioner le genre de livraison"
                  value={selectedLivMod}>
                <option value="0">Adresse de facturation</option>
                <option value="1">Adresse de livraison</option>
                <option value="3">Prélévement à la cave</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
      </Row><Row as='div' className="divh10"></Row>

    {/* --- * --- * --- * --- * F CONTACTDATA * --- * --- * --- * --- */}

      <Row>
        <Col sm={12} lg={6}>
          <Row>
            <Col sm={1}></Col>
            <Col sm={7}><h3 className="all">Facturation</h3></Col>
          </Row>
          <Row>
            <Col sm={2}></Col>
            <Col sm={4}>
              <Button className={`${fcModState ? "btn btn-secondary px-4" : "btn bgcyel px-4"}`}
                disabled={fcModState} onClick={modFcState} size="sm">Modifier</Button>
            </Col>
            <Col sm={1}>
              <Button className={`${!fcModState ? "btn btn-secondary px-4" : "bggreen px-4"}`}
                disabled={!fcModState} onClick={okFcState} size="sm">Ok</Button>
            </Col>
            <Col sm={1}></Col>
            <Col sm={1}>
              <Button className={`${!fcModState ? "btn btn-secondary px-4" : "bggreen px-4"}`}
                disabled={!fcModState}
                onClick={cancFcState} size="sm">
                Annuler</Button>
            </Col>
          </Row>
          <Row as='div' className="divh10"></Row>
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>N° Contactf</Form.Label>
            <Col sm={7}>
              <Form.Control type="text" disabled value={f_contactDataState.f_ContactId}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label className={`${!f_cprénomOk ? "text-danger" : ""}`}  column sm={3}>Prénom *</Form.Label>
            <Col sm={7}>
              <Form.Control className={`${!f_cprénomOk ? "text-danger" : ""}`}
              disabled={!fcModState} onChange={updF_Cprénom} type="text" value={f_contactDataState.f_Cprénom}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label className={`${!f_cnomOk ? "text-danger" : ""}`} column sm={3}>Nom *</Form.Label>
            <Col sm={7}>
              <Form.Control className={`${!f_cnomOk ? "text-danger" : ""}`}
              disabled={!fcModState} onChange={updF_Cnom} type="text" value={f_contactDataState.f_Cnom}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label className={`${!f_mailOk ? "text-danger" : ""}`} column sm={3}>Adresse mail *</Form.Label>
            <Col sm={7}>
              <Form.Control className={`${!f_mailOk ? "text-danger" : ""}`}
              disabled={!fcModState} onChange={updF_AdresseMail} type="email" value={f_contactDataState.f_AdresseMail}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label className={`${!f_télOk ? "text-danger" : ""}`} column sm={3}>Tél. portable *</Form.Label>
            <Col sm={7}>
              <Form.Control className={`${!f_télOk ? "text-danger" : ""}`}
               disabled={!fcModState} onChange={updF_TélPortable} type="text" value={f_contactDataState.f_TélPortable}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>Tél. fixe</Form.Label>
            <Col sm={7}>
              <Form.Control onChange={updF_TélFixe} type="text"
              disabled={!fcModState} value={f_contactDataState.f_TélFixe}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label className={`${!f_adrOk ? "text-danger" : ""}`} column sm={3}>Adresse postale *</Form.Label>
            <Col sm={7}>
              <Form.Control className={`${!f_adrOk ? "text-danger" : ""}`} 
              disabled={!fcModState} onChange={updF_Adresse1} type="text" value={f_contactDataState.f_Adresse1}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>Adresse (suite)</Form.Label>
            <Col sm={7}>
              <Form.Control onChange={updF_Adresse2} type="text"
              disabled={!fcModState} value={f_contactDataState.f_Adresse2}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-0 text-end" controlId="formHorizontalEmail">
            <Form.Label className={`${!f_villeOk ? "text-danger" : ""}`} column sm={3}>Localité *</Form.Label>
            <Col sm={7}>
              <Form.Control className={`${!f_villeOk ? "text-danger" : ""}`}
              disabled={!fcModState} onChange={updF_Ville} type="text" value={f_contactDataState.f_Ville}/>
            </Col>
          </Form.Group>
          <Row>
            <Col sm={3}>
            </Col>
            <Col sm={7}>
              <Form.Control className="mb-1" disabled aria-label="Sélectioner en cliquant"
                      size="sm" value={fvillePartial.localité} />
            </Col>
          </Row>
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>N° postal - Canton</Form.Label>
            <Col sm={2}>
              <Form.Control className={`${!f_npOk ? "text-danger" : ""}`}
              disabled type="text" value={f_contactDataState.f_NuméroPostal}/>
            </Col>
            <Col sm={1}></Col>
            <Col sm={4}>
              <Form.Control className={`${!f_npOk ? "text-danger" : ""}`}
              disabled type="text" value={f_contactDataState.f_Pays}/>
            </Col>
          </Form.Group>
        </Col>

    {/* --- * --- * --- * --- * L CONCTACTDATA * --- * --- * --- * --- */}

        <Col sm={12} lg={6}>
          <Row>
            <Col sm={8}>
                <h3 className={`${fraisLivYes ? "text-danger all disinline" : "all disinline"}`}>{livAState}{livraisonTitle}</h3>
            </Col>
          </Row>
          <Row as='div' className="divh10"></Row>
          <Row>
            <Col sm={2}></Col>
            <Col sm={4}>
              {!hideLivState && (
              <Button className={`${lcModState ? "btn btn-secondary px-4" : "btn bgcyel px-4"}`}
                disabled={lcModState} onClick={modLcState} size="sm">Modifier</Button>)}
            </Col>
            <Col sm={1}>
              {!hideLivState && (
              <Button className={`${!lcModState ? "btn btn-secondary px-4" : "bggreen px-4"}`}
                disabled={!lcModState} onClick={okLcState} size="sm">Ok</Button>)}
            </Col>
            <Col sm={1}></Col>
            <Col sm={1}>
              {!hideLivState && (
              <Button className={`${!lcModState ? "btn btn-secondary px-4" : "bggreen px-4"}`}
                disabled={!lcModState} onClick={cancLcState} size="sm">Annuler</Button>)}
            </Col>
          </Row>
          <Row as='div' className="divh10"></Row>
          {!hideLivState && (
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>N° Contactl</Form.Label>
            <Col sm={7}>
              <Form.Control type="text" disabled value={l_contactDataState.l_ContactId}/>
            </Col>
          </Form.Group>)}
          {!hideLivState && (
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label className={`${!l_cprénomOk ? "text-danger" : ""}`} column sm={3}>Prénom *</Form.Label>
            <Col sm={7}>
              <Form.Control className={`${!l_cprénomOk ? "text-danger" : ""}`}
               disabled={!lcModState} onChange={updL_Cprénom} type="text" value={l_contactDataState.l_Cprénom}/>
            </Col>
          </Form.Group>)}
          {!hideLivState && (
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label className={`${!l_cnomOk ? "text-danger" : ""}`} column sm={3}>Nom *</Form.Label>
            <Col sm={7}>
              <Form.Control className={`${!l_cnomOk ? "text-danger" : ""}`}
              disabled={!lcModState} onChange={updL_Cnom} type="text" value={l_contactDataState.l_Cnom}/>
            </Col>
          </Form.Group>)}
          {!hideLivState && (
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label className={`${!l_mailOk ? "text-danger" : ""}`} column sm={3}>Adresse mail *</Form.Label>
            <Col sm={7}>
              <Form.Control className={`${!l_mailOk ? "text-danger" : ""}`}
              disabled={!lcModState} onChange={updL_AdresseMail} type="email" value={l_contactDataState.l_AdresseMail}/>
            </Col>
          </Form.Group>)}
          {!hideLivState && (
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label className={`${!l_télOk ? "text-danger" : ""}`} column sm={3}>Tél. portable *</Form.Label>
            <Col sm={7}>
              <Form.Control className={`${!l_télOk ? "text-danger" : ""}`}
              disabled={!lcModState} onChange={updL_TélPortable} type="text" value={l_contactDataState.l_TélPortable}/>
            </Col>
          </Form.Group>)}
          {!hideLivState && (
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>Tél. fixe</Form.Label>
            <Col sm={7}>
              <Form.Control onChange={updL_TélFixe} type="text"
              disabled={!lcModState} value={l_contactDataState.l_TélFixe}/>
            </Col>
          </Form.Group>)}
          {!hideLivState && (
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label className={`${!l_adrOk ? "text-danger" : ""}`} column sm={3}>Adresse postale *</Form.Label>
            <Col sm={7}>
              <Form.Control className={`${!l_adrOk ? "text-danger" : ""}`}
              disabled={!lcModState} onChange={updL_Adresse1} type="text" value={l_contactDataState.l_Adresse1}/>
            </Col>
          </Form.Group>)}
          {!hideLivState && (
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>Adresse (suite)</Form.Label>
            <Col sm={7}>
              <Form.Control onChange={updL_Adresse2} type="text" 
              disabled={!lcModState} value={l_contactDataState.l_Adresse2}/>
            </Col>
          </Form.Group>)}
          {!hideLivState && (
          <Form.Group as={Row} className="mb-0 text-end" controlId="formHorizontalEmail">
            <Form.Label className={`${!l_villeOk ? "text-danger" : ""}`} column sm={3}>Localité *</Form.Label>
            <Col sm={7}>
              <Form.Control className={`${!l_villeOk ? "text-danger" : ""}`}
              disabled={!lcModState} onChange={updL_Ville} type="text" value={l_contactDataState.l_Ville}/>
            </Col>
          </Form.Group>)}
          {!hideLivState && (
          <Row>
            <Col sm={3}></Col>
            <Col sm={7}>
              <Form.Control className="mb-1" disabled aria-label="Sélectioner en cliquant"
                        size="sm" value={lvillePartial.localité} />
            </Col>
          </Row>)}
          {!hideLivState && (
          <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>N° postal - Canton</Form.Label>
            <Col sm={2}>
              <Form.Control className={`${!l_npOk ? "text-danger" : ""}`}
              disabled type="text" value={l_contactDataState.l_NuméroPostal}/>
            </Col>
            <Col sm={1}></Col>
            <Col sm={4}>
              <Form.Control className={`${!l_npOk ? "text-danger" : ""}`}
              disabled type="text" value={l_contactDataState.l_Pays}/>
            </Col>
          </Form.Group>)}
        </Col>
      </Row>
    </Form>
  </Container>
  </div>
  )
}
