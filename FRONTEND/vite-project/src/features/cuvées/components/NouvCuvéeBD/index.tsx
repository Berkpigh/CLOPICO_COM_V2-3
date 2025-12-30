import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BASE_URL } from "../../../../core/infrastructures/https/http-handler";
import { Bouteille1, Bouteille2, Mes_Error, MesE, Nouv_Bouteille, Nouv_Cuvée, Nouv_Produit, nouvbout, OneCuvée, pbt1, Tres } from "../../models";
import { FetchPostNouvCuv } from "../../services/apis";

export const NouvCuvéeBD = () =>  {

// * --- * --- * --- * --- Etats divers
  const [existingIdState, setExistingIdState] = useState<boolean>(false)
  const [prodIndexState, setProdIndexState] = useState<number>(0)
  const [twoBoutState, setTwoBoutState] = useState<boolean>(true)
// * --- * --- * --- * --- Erreur plus globales
  const [error1State, setError1State] = useState<boolean>(false)
  const [error2State, setError2State] = useState<boolean>(false)
  const [error3State, setError3State] = useState<boolean>(false)
  const [errorMsgState, setErrorMsgState] = useState<MesE>([
    { MessageE: "" }, { MessageE: "" }, { MessageE: "" } 
  ])

// * --- * --- * --- * --- Erreur id's
  const [bot1ErrorState, setBot1ErrorState] = useState<boolean>(false)
  const [pbt11ErrorState, setPbt11ErrorState] = useState<boolean>(false)
  const [pbt12ErrorState, setPbt12ErrorState] = useState<boolean>(false)
  const [pbt13ErrorState, setPbt13ErrorState] = useState<boolean>(false)
  const [bot2ErrorState, setBot2ErrorState] = useState<boolean>(false)
  const [pbt21ErrorState, setPbt21ErrorState] = useState<boolean>(false)
  const [pbt22ErrorState, setPbt22ErrorState] = useState<boolean>(false)
  const [pbt23ErrorState, setPbt23ErrorState] = useState<boolean>(false)
// * --- * --- * --- * --- Stockage
  const [oneCuvState, setOneCuvState] = useState<OneCuvée>({
    CuvéeId: 0,
    AnnéeCuvée: 2021,
    TypeCuvée: "Cuve",
    LibelléCuvée: "string"
  })
  const [bouteille1State, setBouteille1State] = useState<Bouteille1>({
    BouteilleId: 0,
    Capacité: 75
  })
  const [bouteille2State, setBouteille2State] = useState<Bouteille2>({
    BouteilleId: 0,
    Capacité: 50
  })
  const [pbt1State, setPbt1State] = useState<pbt1>([
    {
      ProduitId: 0,
      NombreBouteilles: 1,
      QuantitéMinimum:0
    },
    {
      ProduitId: 0,
      NombreBouteilles: 6,
      QuantitéMinimum:0
    },
    {
      ProduitId: 0,
      NombreBouteilles: 6,
      QuantitéMinimum:2
    }
  ])
  const [pbt2State, setPbt2State] = useState<pbt1>([
    {
      ProduitId: 0,
      NombreBouteilles: 1,
      QuantitéMinimum:0
    },
    {
      ProduitId: 0,
      NombreBouteilles: 12,
      QuantitéMinimum:0
    },
    {
      ProduitId: 0,
      NombreBouteilles: 12,
      QuantitéMinimum:2
    }
  ])
/*
/* *** - *** - *** - *** - *** -  Constantes
*/
  let url: string = BASE_URL
  let ciurl: string = url + "Dcuvée/"
/*
// *** - *** - *** - *** - *** -  Messages d'erreur
*/  
  let errmsgs: string[] = [
    "Bt1: incohérence nbBout/capacité",
    "Bt2: incohérence nbBout/capacité",
    "Bt1: séparée et min > 0",
    "Bt1: + d'une bt séparée",
    "Bt1: 1 d'un min > 0",
    "Bt2: séparée et min > 0",
    "Bt2: + d'une bt séparée",
    "Bt2: 1 d'un min > 0",
    "Bt1: id de produit dupliqués",
    "Bt2: id de produit dupliqués",
    "incohérence entre id's"
  ]

/*
// *** - *** - *** - *** - *** -  Fetch P O S T
*/

  type CallbackPostFunction = (result: Tres) => void
  const postOneNouvCuv = async (cuv: Nouv_Cuvée, callback: CallbackPostFunction) => {
    await FetchPostNouvCuv(cuv, ciurl)
      .then((res) => {callback(res)})
  }
  function handlePostCallback(result: Tres) {
    let mes: Mes_Error = {  MessageE: ""}
    initMessages()
    setError1State(false)
    if(result.Result) {
      mes = { MessageE: "Informations correctement mises à jour" }
      createNewErrorMsgState(0, mes)
    } else {
      mes = { MessageE: "Problème survenu lors de la mise à jour" }
      createNewErrorMsgState(0, mes)
      setError1State(true)

      mes = { MessageE: result.Location }
      createNewErrorMsgState(1, mes)
      setError2State(true)
    }
  }
/*
// *** === *** === * FONCTIONS RELATIVES AU FORMULAIRE *** === *** === 
*/
// --- * --- * --- * Fonctions générales
  const submitCuv = () => {
//    console.log("1: ", error1State)
//    console.log("2: ", error2State)
//    console.log("3: ", error3State)

    if(testAll() > -1){return}
    if(bot1ErrorState || pbt11ErrorState || pbt12ErrorState || pbt13ErrorState){ return }
    if((twoBoutState) && (bot2ErrorState || pbt21ErrorState || pbt22ErrorState || pbt23ErrorState)){ return }
/*        
// *--- L'enregistrement est lancé
*/
    let CuvToRecord: Nouv_Cuvée = {
        CuvéeId: 0,
        AnnéeCuvée: 0,
        TypeCuvée: "",
        LibelléCuvée: "",
        Dbouteilles : []
    }
    const prods1: pbt1 = [
      {
        ProduitId: pbt1State[0].ProduitId,
        NombreBouteilles: pbt1State[0].NombreBouteilles,
        QuantitéMinimum: pbt1State[0].QuantitéMinimum
      },
      {
        ProduitId: pbt1State[1].ProduitId,
        NombreBouteilles: pbt1State[1].NombreBouteilles,
        QuantitéMinimum: pbt1State[1].QuantitéMinimum
      },
      {
        ProduitId: pbt1State[2].ProduitId,
        NombreBouteilles: pbt1State[2].NombreBouteilles,
        QuantitéMinimum: pbt1State[2].QuantitéMinimum
      }
    ]

    const bots1: Nouv_Bouteille = {
      BouteilleId: bouteille1State.BouteilleId,
      Capacité: bouteille1State.Capacité,
      Dproduits: prods1
    }

    if(twoBoutState){
      const prods2: pbt1 = [
        {
          ProduitId: pbt2State[0].ProduitId,
          NombreBouteilles: pbt2State[0].NombreBouteilles,
          QuantitéMinimum: pbt2State[0].QuantitéMinimum
        },
        {
          ProduitId: pbt2State[1].ProduitId,
          NombreBouteilles: pbt2State[1].NombreBouteilles,
          QuantitéMinimum: pbt2State[1].QuantitéMinimum
        },
        {
          ProduitId: pbt2State[2].ProduitId,
          NombreBouteilles: pbt2State[2].NombreBouteilles,
          QuantitéMinimum: pbt2State[2].QuantitéMinimum
        }
      ]
      const bots2: Nouv_Bouteille = {
        BouteilleId: bouteille2State.BouteilleId,
        Capacité: bouteille2State.Capacité,
        Dproduits: prods2 
      }
      const nou2bouts: nouvbout = [
        {
          BouteilleId: bots1.BouteilleId,
          Capacité: bots1.Capacité,
          Dproduits: bots1.Dproduits
        },
        {
          BouteilleId: bots2.BouteilleId,
          Capacité: bots2.Capacité,
          Dproduits: bots2.Dproduits
        }
      ]
      CuvToRecord = {
        CuvéeId: oneCuvState.CuvéeId,
        AnnéeCuvée: oneCuvState.AnnéeCuvée,
        TypeCuvée: oneCuvState.TypeCuvée,
        LibelléCuvée: oneCuvState.LibelléCuvée,
        Dbouteilles : nou2bouts 
      }
    } else {
      const nou1bout: nouvbout = [
        {
          BouteilleId: bots1.BouteilleId,
          Capacité: bots1.Capacité,
          Dproduits: bots1.Dproduits
        }
      ]
      CuvToRecord = {
        CuvéeId: oneCuvState.CuvéeId,
        AnnéeCuvée: oneCuvState.AnnéeCuvée,
        TypeCuvée: oneCuvState.TypeCuvée,
        LibelléCuvée: oneCuvState.LibelléCuvée,
        Dbouteilles : nou1bout 
      }
    }
    postOneNouvCuv(CuvToRecord, handlePostCallback)
  }
  const handle1Focus0 = () => {
    setProdIndexState(0)
    setPbt11ErrorState(false);
    ValidateProdId(1, 0, pbt1State[0].ProduitId)
  }
  const handle1Focus1 = () => {
    setProdIndexState(1)
    setPbt12ErrorState(false);
    ValidateProdId(1, 1, pbt1State[1].ProduitId)
  }
  const handle1Focus2 = () => {
    setProdIndexState(2)
    setPbt13ErrorState(false);
    ValidateProdId(1, 2, pbt1State[2].ProduitId)
  }
  const handle2Focus0 = () => { 
    setProdIndexState(0)
    setPbt21ErrorState(false);
  }
  const handle2Focus1 = () => {
    setProdIndexState(1)
    setPbt22ErrorState(false);
  }
  const handle2Focus2 = () => {
    setProdIndexState(2)
    setPbt23ErrorState(false);
  }
// --- * --- * --- * Validations inter-articles
  const createNewErrorMsgState = (ind: number, newmese: Mes_Error) => {
    if(ind < 3){
      const newMesEState = errorMsgState.map((state, index) => {
        if(index == ind) {
          return newmese
        } else {
          return state
        }
      })
      setErrorMsgState(newMesEState)
    }
  }
  const addMessage = (ind:number, msg: string) => {
    const newmese : Mes_Error = {
      MessageE: msg
    }
    createNewErrorMsgState(ind, newmese)
    switch (ind) {
      case 0:
        setError1State(true)
        break
      case 1:
        setError2State(true)
        break
      case 2:
        setError3State(true)
        break
    }
  }
  const initMessages = () => {
    setError1State(false)               
    setError2State(false)               
    setError3State(false)
    let ind: number = 0
    errorMsgState.forEach( (msg) => {
      msg.MessageE = ""
      createNewErrorMsgState(ind, msg)
      ind++
    })               
  }
  const testAll = () => {
    let mes:number = testCapacitéNbBt() +
                      testNbtNbtMin() +
                      testIds(existingIdState)

    initMessages()
    let i: number = errmsgs.length
    let ind: number = -1
    let power: number = 0
    do {
      power = (2 ** i)
      if(mes >= power){
        ind++
        addMessage(ind, errmsgs[i])
        mes = mes - (2 ** i)
      }
      i--
    } while (mes > 0)
    return ind
  }
  const testCapacitéNbBt = () => {
// *--- Bouteille 1
    let mes: number = 0
    let cap: number = bouteille1State.Capacité
    let ok: boolean = true
    pbt1State.forEach((prod) => {
      if(ok) {
        if((cap == 50)){
          if((prod.NombreBouteilles != 1) && (prod.NombreBouteilles != 12)){
           ok = false
           mes++
          } 
        } else {
          if((prod.NombreBouteilles != 1) && (prod.NombreBouteilles != 6)){
           ok = false
           mes++
          } 
        }
      }
    })
    setTwoBoutState(true)
    cap = bouteille2State.Capacité
    if(cap == 0){ setTwoBoutState(false) ; return mes }
// *--- Bouteille 2
    ok = true
    pbt2State.forEach((prod) => {
      if(ok) {
        if((cap == 50)){
          if((prod.NombreBouteilles != 1) && (prod.NombreBouteilles != 12)){
           ok = false
           mes = mes + 2
          } 
        } else {
          if((prod.NombreBouteilles != 1) && (prod.NombreBouteilles != 6)){
           ok = false
           mes = mes + 2
          } 
        }
      }
    })
    return mes
  }
  const testNbtNbtMin = () => {
// *--- Bouteille 1
    let mes: number = 0
    let countsep: number = 0
    let quantpos: number = 0
    pbt1State.forEach((prod) => {
      if(prod.NombreBouteilles == 1){
        countsep++
        if(prod.QuantitéMinimum > 0){
           mes = mes + 4
        } 
      } else {
        if(prod.QuantitéMinimum > 0){ quantpos++ }
      } 
    })
    if(countsep > 1){ mes = mes + 8}
    if(quantpos > 1){ mes = mes + 16}

    if(!twoBoutState){ return mes }
// *--- Bouteille 2
    countsep = 0
    quantpos = 0
    pbt2State.forEach((prod) => {
      if(prod.NombreBouteilles == 1){
        countsep++
        if(prod.QuantitéMinimum > 0){
           mes = mes + 32
        } 
      } else {
        if(prod.QuantitéMinimum > 0){ quantpos++ }
      } 
    })
    if(countsep > 1){ mes = mes + 64}
    if(quantpos > 1){ mes = mes + 128}
    return mes
  }
  const testDupProdId = () => {
    let mes: number = 0
// *--- Bouteille 1
    if((pbt1State[0].ProduitId == pbt1State[1].ProduitId) ||
      (pbt1State[0].ProduitId == pbt1State[2].ProduitId) ||
      (pbt1State[1].ProduitId == pbt1State[2].ProduitId)) { mes = 256}
    if(twoBoutState) {
// *--- Bouteille 2
      if((pbt2State[0].ProduitId == pbt2State[1].ProduitId) ||
        (pbt2State[0].ProduitId == pbt2State[2].ProduitId) ||
        (pbt2State[1].ProduitId == pbt2State[2].ProduitId) ||
        (bouteille1State.BouteilleId == bouteille2State.BouteilleId)) { mes = mes + 512}
    }
    return mes
  }
  const testBtProdIds = (exist: Boolean, bt: number) => {
    let mes: number = 0
    let ok: boolean = true
    if(exist){
// *--- existingId = true
      switch (bt) {
        case 1:
          // *--- Bouteille 1
          if((oneCuvState.CuvéeId < 1) || (bouteille1State.BouteilleId < 1)){ mes = 1024; return mes } else {
            const bt1id: number = bouteille1State.BouteilleId
            const prbt1ids: number = (bt1id * 10000) + 100
            pbt1State.forEach((prod) => {
              if(prod.ProduitId < prbt1ids){ ok = false }
            })
          }
          if(!ok) { mes = 1024 }
          break
        default:
          // *--- Bouteille 2
          if((oneCuvState.CuvéeId < 1) || (bouteille2State.BouteilleId < 1)){ mes = 1024; return mes } else {
            const bt2id: number = bouteille2State.BouteilleId
            const prbt2ids: number = (bt2id * 10000) + 100
            pbt2State.forEach((prod) => {
              if(prod.ProduitId < prbt2ids){ ok = false }
            })
          }
          if(!ok) { mes = 1024 }
      }
    } else {
// *--- existingId = false
      switch (bt) {
        case 1:
          if((oneCuvState.CuvéeId > 0) || (bouteille1State.BouteilleId > 0)){ mes = 1024; return mes } else {
            pbt1State.forEach((prod) => {
              if(prod.ProduitId> 0){
                ok = false
              }
            })
          }
          if(!ok) { mes = 1024; return mes }
          break
        default:
          if((oneCuvState.CuvéeId > 0) || (bouteille2State.BouteilleId > 0)){ mes = 1024; return mes } else {
            pbt2State.forEach((prod) => {
              if(prod.ProduitId> 0){
                ok = false
              }
            })
          }
          if(!ok) { mes = 1024; return mes }
      }
    }
    return mes
  }
  const testIds = (exist: boolean) => {
    let mes: number = 0
    mes = testBtProdIds(exist, 1)
    if(mes > 0){ return mes}
    if(twoBoutState) { mes = testBtProdIds(exist, 2)}
    if(mes == 0) { mes = testDupProdId(); }
    return mes
  }

// --- * --- * --- * Validations des id's
  const ValidateBouteilleIds = (exist: boolean, bt: number, btid: number) => {
    if(bt == 1){
      setBot1ErrorState(false)
      if((exist) && (btid < 1002)){setBot1ErrorState(true)}
      if((!exist) && (btid != 0)){setBot1ErrorState(true)}
      return
    }
    setBot2ErrorState(false)
    if((exist) && (btid < 1002)){setBot2ErrorState(true)}
    if((!exist) && (btid != 0)){setBot1ErrorState(true)}
  }
  const ValidateAllIds = (existid: boolean) => {
    ValidateBouteilleIds(existid, 1, bouteille1State.BouteilleId)
    ValidateBouteilleIds(existid, 2, bouteille2State.BouteilleId)
    setPbt11ErrorState(false);
    setPbt12ErrorState(false);
    setPbt13ErrorState(false);
    const bt1id: number = bouteille1State.BouteilleId
    const prbt1ids: number = (bt1id * 10000) + 100

    if(existid){
      if(pbt1State[0].ProduitId < prbt1ids){ setPbt11ErrorState(true)};
      if(pbt1State[1].ProduitId < prbt1ids){ setPbt12ErrorState(true)};
      if(pbt1State[2].ProduitId < prbt1ids){ setPbt13ErrorState(true)};
    } else {
      if(pbt1State[0].ProduitId != 0){ setPbt11ErrorState(true)};
      if(pbt1State[1].ProduitId != 0){ setPbt12ErrorState(true)};
      if(pbt1State[2].ProduitId != 0){ setPbt13ErrorState(true)};
    }
    setTwoBoutState(true);
    setPbt21ErrorState(false);
    setPbt22ErrorState(false);
    setPbt23ErrorState(false);
    if(bouteille2State.Capacité == 0){
      setTwoBoutState(false)
      return
    };
    const bt2id: number = bouteille2State.BouteilleId
    const prbt2ids: number = (bt2id * 10000) + 100
    if(existid){
      if(pbt2State[0].ProduitId < prbt2ids){ setPbt21ErrorState(true)};
      if(pbt2State[1].ProduitId < prbt2ids){ setPbt22ErrorState(true)};
      if(pbt2State[2].ProduitId < prbt2ids){ setPbt23ErrorState(true)};
    } else {
      if(pbt2State[0].ProduitId != 0){ setPbt21ErrorState(true)};
      if(pbt2State[1].ProduitId != 0){ setPbt22ErrorState(true)};
      if(pbt2State[2].ProduitId != 0){ setPbt23ErrorState(true)};
    }
  }
// --- * --- * --- * Concerne Validation Produits
//
  const ValidateProdId = (bt: number, ind: number, id: number) => {
    let btid: number = 0
    if(bt == 1){ btid = bouteille1State.BouteilleId } else { btid = bouteille2State.BouteilleId }
    const prbtids: number = (btid * 100000) + 100
    SetPbtError(bt, ind, false)
    if((existingIdState) && (id < prbtids)){
      SetPbtError(bt, ind, true);
    }
    if((!existingIdState) && (id != 0)){
      SetPbtError(bt, ind, true);
    }
  }
  const SetPbtError = (bt: number, ind: number, truefalse: boolean) => {
    switch (bt){
      case 1 :
        switch (ind) {
          case 0 :
            setPbt11ErrorState(truefalse);
            break;
          case 1 :
            setPbt12ErrorState(truefalse);
            break;
          case 2 :
            setPbt13ErrorState(truefalse);
            break;
        }
        break
      default:
        switch (ind) {
          case 0 :
            setPbt21ErrorState(truefalse);
            break;
          case 1 :
            setPbt22ErrorState(truefalse);
            break;
          case 2 :
            setPbt23ErrorState(truefalse);
            break;
        }
    }
  }
// --- * --- * --- * Concerne Cuvée
//
  const updCuvId = (e: React.ChangeEvent<HTMLInputElement>) => {
    let ok: boolean = false
    let ocid: number = 0  
    setExistingIdState(false)
    if(Number(e.target.value) != 0){ 
      setExistingIdState(true)
      ok = true
      ocid = Number(e.target.value)
    }
    const newState: OneCuvée = {
        CuvéeId: ocid,
        AnnéeCuvée: oneCuvState.AnnéeCuvée,
        TypeCuvée: oneCuvState.TypeCuvée,
        LibelléCuvée: oneCuvState.TypeCuvée + " " + oneCuvState.AnnéeCuvée
    };
    setOneCuvState(newState);
    ValidateAllIds(ok)
  }
  const updAnnée = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState: OneCuvée = {
        CuvéeId: oneCuvState.CuvéeId,
        AnnéeCuvée: Number(e.target.value),
        TypeCuvée: oneCuvState.TypeCuvée,
        LibelléCuvée: oneCuvState.TypeCuvée + " " + Number(e.target.value)
      };
      setOneCuvState(newState);
  }
  const updType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState: OneCuvée = {
        CuvéeId: oneCuvState.CuvéeId,
        AnnéeCuvée: oneCuvState.AnnéeCuvée,
        TypeCuvée: e.target.value,
        LibelléCuvée: e.target.value + " " + oneCuvState.AnnéeCuvée
      };
      setOneCuvState(newState);
  }
// --- * --- * --- * Concerne Bouteille 1
// 
  const updBouteilleId1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let bt1id: number = Number(e.target.value)
    setBot1ErrorState(false)  
    const newState: Bouteille1 = {
        BouteilleId: bt1id,
        Capacité: bouteille1State.Capacité
    };
    setBouteille1State(newState);
    ValidateBouteilleIds(existingIdState, 1, bt1id)
  }
  const updCapacité1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState: Bouteille1 = {
        BouteilleId: bouteille1State.BouteilleId,
        Capacité: Number(e.target.value)
      };
      setBouteille1State(newState);
  }
// --- * --- * --- * Concerne Produits Bouteille 1
//
  const createNewPbt1State = (ind: number, newprod: Nouv_Produit) => {
    const newPbtState = pbt1State.map((state, index) => {
      if(index == ind) { return newprod } else { return state }
    })
    setPbt1State(newPbtState)
  }
  const updProdIdBt1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let prid: number = Number(e.target.value)
    const newState: Nouv_Produit = {
        ProduitId: prid,
        NombreBouteilles: pbt1State[prodIndexState].NombreBouteilles,
        QuantitéMinimum: pbt1State[prodIndexState].QuantitéMinimum
    };
    createNewPbt1State(prodIndexState, newState)
    ValidateProdId(1, prodIndexState, prid)
  }
  const updNbBtBt1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState: Nouv_Produit = {
        ProduitId: pbt1State[prodIndexState].ProduitId,
        NombreBouteilles: Number(e.target.value),
        QuantitéMinimum: pbt1State[prodIndexState].QuantitéMinimum
    };
    createNewPbt1State(prodIndexState, newState)
  }
  const updMinBtBt1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState: Nouv_Produit = {
        ProduitId: pbt1State[prodIndexState].ProduitId,
        NombreBouteilles: pbt1State[prodIndexState].NombreBouteilles,
        QuantitéMinimum: Number(e.target.value)
    };
    createNewPbt1State(prodIndexState, newState)
  }

// --- * --- * --- * Concerne Bouteille 2
// 
  const updBouteilleId2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let bt2id: number = Number(e.target.value) 
    setBot2ErrorState(false)  
    const newState: Bouteille2 = {
        BouteilleId: bt2id,
        Capacité: bouteille2State.Capacité
    }
    setBouteille2State(newState);
    ValidateBouteilleIds(existingIdState, 2, bt2id)
  }
  const updCapacité2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState: Bouteille2 = {
        BouteilleId: bouteille2State.BouteilleId,
        Capacité: Number(e.target.value)
    };
    setBouteille2State(newState);
    setTwoBoutState(false)
    if(Number(e.target.value) > 0){ setTwoBoutState(true) }
  }
// --- * --- * --- * Concerne Produits Bouteille 2
//
  const createNewPbt2State = (ind: number, newprod: Nouv_Produit) => {
    const newPbtState = pbt2State.map((state, index) => {
      if(index == ind) {
        return newprod
      } else {
        return state
      }
    })
    setPbt2State(newPbtState)
  }
  const updProdIdBt2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let prid: number = 0  
    prid = Number(e.target.value)
    const newState: Nouv_Produit = {
        ProduitId: prid,
        NombreBouteilles: pbt2State[prodIndexState].NombreBouteilles,
        QuantitéMinimum: pbt2State[prodIndexState].QuantitéMinimum
      };
      createNewPbt2State(prodIndexState, newState)
      ValidateProdId(2, prodIndexState, Number(e.target.value))
  }
  const updNbBtBt2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState: Nouv_Produit = {
        ProduitId: pbt2State[prodIndexState].ProduitId,
        NombreBouteilles: Number(e.target.value),
        QuantitéMinimum: pbt2State[prodIndexState].QuantitéMinimum
      };
      createNewPbt2State(prodIndexState, newState)
  }
  const updMinBtBt2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState: Nouv_Produit = {
        ProduitId: pbt2State[prodIndexState].ProduitId,
        NombreBouteilles: pbt2State[prodIndexState].NombreBouteilles,
        QuantitéMinimum: Number(e.target.value)
      };
      createNewPbt2State(prodIndexState, newState)
  }

{/* --- * --- * --- * --- * RENDER * --- * --- * --- * --- */}

  return (
    <Container>
    {/* --- * --- * --- * --- * FORMULAIRE * --- * --- * --- * --- */}
      <Form>

    {/* --- * --- * --- * --- * TITRE * --- * --- * --- * --- */}

      <Row as='div' className="divh10"></Row>
      <Row>
        <Col sm={3}>
          <Form.Group className="" controlId="errmsgs">
              <Form.Control readOnly type= "text" value={errorMsgState[0].MessageE}
                className={`${error1State ? "colred border border-danger" : "colblack border border-success"}`}
              />
          </Form.Group>
         </Col>
        <Col sm={3}><h2 className="all disinline">Nouvelle Cuvée</h2></Col>
        <Col sm={1}>
          <Button size="sm" className="bggreen px-4" 
            type='button' onClick={submitCuv}>Enregistrer </Button>
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <Form.Group className="" controlId="errmsgs">
              <Form.Control readOnly type= "text" value={errorMsgState[1].MessageE}
                className={`${error2State ?  "colred border border-danger" : "colblack"}`}
              />
          </Form.Group>
         </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <Form.Group className="" controlId="errmsgs">
              <Form.Control readOnly type= "text" value={errorMsgState[2].MessageE}
                className={`${error3State ?  "colred border border-danger" : "colblack"}`}
              />
          </Form.Group>
        </Col>
      </Row>
    {/* --- * --- * --- * --- * CUVEE * --- * --- * --- * --- */}

        <Row as='div' className="divh10"></Row>
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Form.Label column sm={1} className="text-start">N°</Form.Label>            
          <Form.Label column sm={2} className="text-start">Annéee</Form.Label>            
          <Form.Label column sm={2} className="text-start">Type</Form.Label>            
          <Form.Label column sm={2} className="text-start">Libellé</Form.Label>            
          {/* <Col sm={1}><Button size="sm" className="bggreen px-4">+</Button></Col> */}
        </Form.Group>
        <Row as='div' className="divh1  0"></Row>
        <Row as='div' className="divh10">
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Col sm={1}>
            <Form.Control onChange={updCuvId}  type="number" value={oneCuvState.CuvéeId}/>
          </Col>
          <Col sm={2}>
            <Form.Select onChange={updAnnée} value={oneCuvState.AnnéeCuvée}>
              <option>Année</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
              <option value="2033">2033</option>
              <option value="2034">2034</option>
              <option value="2035">2035</option>
            </Form.Select>
          </Col>
          <Col sm={2}>
            {/* <Form.Control type="text" value={nouvCuvState?.TypeCuvée}/> */}
            <Form.Select onChange={updType} value={oneCuvState.TypeCuvée}>
              <option>Type</option>
              <option value="Cep de l'Héritage">Cep de l'Héritage</option>
              <option value="Cuve">Cuve</option>
              <option value="Barriqué">Barriqué</option>
              <option value="Rosé">Rosé</option>
            </Form.Select>
          </Col>
          <Col sm={3}>
            <Form.Control disabled type="text" value={oneCuvState.LibelléCuvée}/>
          </Col>
        </Form.Group>
        </Row>

  {/* --- * --- * --- * --- * Bouteille 1 * --- * --- * --- * --- */}

        <Row as='div' className="divh20"></Row>
        <Row as='div' className="divh20"></Row>
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Form.Label column sm={1} className="text-start"><strong>BOUTEILLE</strong></Form.Label>            
          <Form.Label column sm={2} className="text-start">N°</Form.Label>            
          <Form.Label column sm={2} className="text-start">Capacité cl.</Form.Label>            
          {/* <Col sm={1}><Button size="sm" className="bggreen px-4">Suite </Button></Col> */}
          {/* <Col sm={1}><Button size="sm" className="bggreen px-4">+</Button></Col> */}
        </Form.Group>
        {/* <Row as='div' className="divh10"></Row> */}
        <Row as='div' className="divh10">
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Col sm={1}></Col>
          <Col sm={2}>
            <Form.Control onChange={updBouteilleId1} type="number" value={bouteille1State.BouteilleId}
              className={`${bot1ErrorState ? "bgcred" : "bggreen"}`}
            />
          </Col>
          <Col sm={1}>
            <Form.Select onChange={updCapacité1} value={bouteille1State.Capacité}>
              <option>Capacité cl.</option>
              <option value="50">50 cl.</option>
              <option value="75">75 cl.</option>
              <option value="100">100 cl.</option>
            </Form.Select>
          </Col>
        </Form.Group>
        </Row>

  {/* --- * --- * --- * --- * Bouteille 1 - Produit 1* --- * --- * --- * --- */}

        <Row as='div' className="divh20"></Row>
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Form.Label column sm={1} className="text-start"><strong>Produit</strong></Form.Label>            
          <Form.Label column sm={2} className="text-start">N°</Form.Label>            
          <Form.Label column sm={2} className="text-start">Nb.bt.</Form.Label>            
          <Form.Label column sm={1} className="text-start">Nb.min.</Form.Label>            
        </Form.Group>
        {/* <Row as='div' className="divh10"></Row> */}
        <Row as='div' className="divh20">
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Col sm={1}></Col>
          <Col sm={2}>
            <Form.Control onFocus={handle1Focus0} onChange={updProdIdBt1} type="number" value={pbt1State[0].ProduitId}
              className={`${pbt11ErrorState ? "bgcred" : "bggreen"}`}
            />
          </Col>
          <Col sm={2}>
            <Form.Select onChange={updNbBtBt1}> value={pbt1State[0].NombreBouteilles}
              <option value="1">1 bt.</option>
              <option value="6">6 bt.</option>
              <option value="12">12 bt.</option>
            </Form.Select>
          </Col>
          <Col sm={1}>
            <Form.Select onChange={updMinBtBt1}> value={pbt1State[0].QuantitéMinimum}
              <option value="0">0</option>
              <option value="2">2</option>
              <option value="5">5</option>
            </Form.Select>
          </Col>            
        </Form.Group>
        </Row>

  {/* --- * --- * --- * --- * Bouteille 1 - Produit 2* --- * --- * --- * --- */}

        <Row as='div' className="divh20"></Row>
        <Row as='div' className="divh20">
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Col sm={1}></Col>
          <Col sm={2}>
            <Form.Control onFocus={handle1Focus1} onChange={updProdIdBt1} type="number" value={pbt1State[1].ProduitId}
              className={`${pbt12ErrorState ? "bgcred" : "bggreen"}`}
          />
          </Col>
          <Col sm={2}>
            <Form.Select onChange={updNbBtBt1}> value={pbt1State[1].NombreBouteilles}
              <option value="1">1 bt.</option>
              <option value="6">6 bt.</option>
              <option value="12">12 bt.</option>
            </Form.Select>
          </Col>
          <Col sm={1}>
            <Form.Select onChange={updMinBtBt1}> value={pbt1State[1].QuantitéMinimum}
              <option value="0">0</option>
              <option value="2">2</option>
              <option value="5">5</option>
            </Form.Select>
          </Col>            
        </Form.Group>
        </Row>

  {/* --- * --- * --- * --- * Bouteille 1 - Produit 3* --- * --- * --- * --- */}

        <Row as='div' className="divh20"></Row>
        <Row as='div' className="divh20">
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Col sm={1}></Col>
          <Col sm={2}>
            <Form.Control onFocus={handle1Focus2} onChange={updProdIdBt1} type="number" value={pbt1State[2].ProduitId}
              className={`${pbt13ErrorState ? "bgcred" : "bggreen"}`}
            />
          </Col>
          <Col sm={2}>
            <Form.Select onChange={updNbBtBt1}> value={pbt1State[2].NombreBouteilles}
              <option value="1">1 bt.</option>
              <option value="6">6 bt.</option>
              <option value="12">12 bt.</option>
            </Form.Select>
          </Col>
          <Col sm={1}>
            <Form.Select onChange={updMinBtBt1} value={pbt1State[2].QuantitéMinimum}>
              <option value="0">0</option>
              <option value="2">2</option>
              <option value="5">5</option>
            </Form.Select>
          </Col>            
        </Form.Group>
        </Row>

  {/* --- * --- * --- * --- * Bouteille 2 * --- * --- * --- * --- */}

        <Row as='div' className="divh20"></Row>
        <Row as='div' className="divh20"></Row>
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Form.Label column sm={1} className="text-start"><strong>BOUTEILLE</strong></Form.Label>            
          <Form.Label column sm={2} className="text-start">N°</Form.Label>            
          <Form.Label column sm={2} className="text-start">Capacité cl.</Form.Label>            
          {/* <Col sm={1}><Button size="sm" className="bggreen px-4">Suite </Button></Col> */}
          {/* <Col sm={1}><Button size="sm" className="bggreen px-4">+</Button></Col> */}
        </Form.Group>
        {/* <Row as='div' className="divh10"></Row> */}
        <Row as='div' className="divh10">
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Col sm={1}></Col>
          <Col sm={2}>
            <Form.Control onChange={updBouteilleId2} type="number" value={bouteille2State.BouteilleId}
              className={`${bot2ErrorState ? "bgcred" : "bggreen"}`}
            />
          </Col>
          <Col sm={1}>
            <Form.Select onChange={updCapacité2} value={bouteille2State.Capacité}>
              <option value="0">0</option>
              <option value="50">50 cl.</option>
              <option value="75">75 cl.</option>
              <option value="100">100 cl.</option>
            </Form.Select>
          </Col>
        </Form.Group>
        </Row>

  {/* --- * --- * --- * --- * Bouteille 2 - Produit 1* --- * --- * --- * --- */}

        <Row as='div' className="divh20"></Row>
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Form.Label column sm={1} className="text-start"><strong>Produit</strong></Form.Label>            
          <Form.Label column sm={2} className="text-start">N°</Form.Label>            
          <Form.Label column sm={2} className="text-start">Nb.bt.</Form.Label>            
          <Form.Label column sm={1} className="text-start">Nb.min.</Form.Label>            
          {/* <Col sm={1}><Button size="sm" className="bggreen px-4">Suite </Button></Col> */}
          {/* <Col sm={1}><Button size="sm" className="bggreen px-4">+</Button></Col> */}
        </Form.Group>
        {/* <Row as='div' className="divh10"></Row> */}
        <Row as='div' className="divh20">
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Col sm={1}></Col>
          <Col sm={2}>
            <Form.Control onFocus={handle2Focus0} onChange={updProdIdBt2} type="number" value={pbt2State[0].ProduitId}
              className={`${pbt21ErrorState ? "bgcred" : "bggreen"}`}
            />
          </Col>
          <Col sm={2}>
            <Form.Select onChange={updNbBtBt2} value={pbt2State[0].NombreBouteilles}>
              <option value="1">1 bt.</option>
              <option value="6">6 bt.</option>
              <option value="12">12 bt.</option>
            </Form.Select>
          </Col>
          <Col sm={1}>
            <Form.Select onChange={updMinBtBt2} value={pbt2State[0].QuantitéMinimum}>
              <option value="0">0</option>
              <option value="2">2</option>
              <option value="5">5</option>
            </Form.Select>
          </Col>            
        </Form.Group>
        </Row>

  {/* --- * --- * --- * --- * Bouteille 2 - Produit 2* --- * --- * --- * --- */}

        <Row as='div' className="divh20"></Row>
        <Row as='div' className="divh20">
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Col sm={1}></Col>
          <Col sm={2}>
            <Form.Control onFocus={handle2Focus1} onChange={updProdIdBt2} type="number" value={pbt2State[1].ProduitId}
              className={`${pbt22ErrorState ? "bgcred" : "bggreen"}`}
            />
          </Col>
          <Col sm={2}>
            <Form.Select onChange={updNbBtBt2} value={pbt2State[1].NombreBouteilles}>
              <option value="1">1 bt.</option>
              <option value="6">6 bt.</option>
              <option value="12">12 bt.</option>
            </Form.Select>
          </Col>
          <Col sm={1}>
            <Form.Select onChange={updMinBtBt2} value={pbt2State[1].QuantitéMinimum}>
              <option value="0">0</option>
              <option value="2">2</option>
              <option value="5">5</option>
            </Form.Select>
          </Col>            
        </Form.Group>
        </Row>

  {/* --- * --- * --- * --- * Bouteille 2 - Produit 3* --- * --- * --- * --- */}

        <Row as='div' className="divh20"></Row>
        <Row as='div' className="divh20">
        <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
          <Col sm={1}></Col>
          <Col sm={2}>
            <Form.Control onFocus={handle2Focus2} onChange={updProdIdBt2} type="number" value={pbt2State[2].ProduitId}
              className={`${pbt23ErrorState ? "bgcred" : "bggreen"}`}
            />
          </Col>
          <Col sm={2}>
            <Form.Select onChange={updNbBtBt2} value={pbt2State[2].NombreBouteilles}>
              <option value="1">1 bt.</option>
              <option value="6">6 bt.</option>
              <option value="12">12 bt.</option>
            </Form.Select>
          </Col>
          <Col sm={1}>
            <Form.Select onChange={updMinBtBt2} value={pbt2State[2].QuantitéMinimum}>
              <option value="0">0</option>
              <option value="2">2</option>
              <option value="5">5</option>
            </Form.Select>
          </Col>            
        </Form.Group>
        </Row>
      </Form>
    </Container>
  )
}