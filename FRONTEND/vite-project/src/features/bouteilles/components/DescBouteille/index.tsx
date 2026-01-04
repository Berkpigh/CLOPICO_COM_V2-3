import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "../../../../redux/store/storeRedux";
import { RootState } from "../../../../redux/store/storeRedux";
import { storeproduitinitial, storeproduit } from "../../../../redux/slices/produittoupdateSlice";
import { storestockinitial, storestock } from "../../../../redux/slices/stocktoupdateSlice";
import { storeimageinitial, storeimage } from "../../../../redux/slices/imagetoupdateSlice";

import { BASE_URL } from "../../../../core/infrastructures/https/http-handler";
import { lBouteilles, oneBouteille, resultGetListeBouteille, MesE, Mes_Error } from "../../models";
import { FetchGetListeBouteille } from "../../services/apis";

export const DescBouteille = () => {
    const etatprod = useSelector((state: RootState) => state.etatproduit.loaded);
    const etatstock = useSelector((state: RootState) => state.etatstock.loaded);
    console.log("etatprod: ",etatprod, " etatstock: ",etatstock)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    const [error1State, setError1State] = useState<boolean>(false)
    const [errorMsgState, setErrorMsgState] = useState<MesE>([
      { MessageE: "" }, { MessageE: "" }, { MessageE: "" } 
    ])
//    const [lOneCuvOnlyState, setLOneCuvOnlyState] = useState<LOneCuvOnly>([])
    const [listBouteilleState, setListBouteilleState] = useState<lBouteilles>(
        [
            {
                bouteilleId: 0,
                cuvéeId: 0,
                libelléBouteille: "",
                capacité: 0,
                dbouteilleImages : [
                    {
                        bouteilleImageId: 0,
                        bouteilleId: 0,   
                        imageDesc: "",
                        imageUrl: ""
                    }
                ],
                dproduits: [
                    {
                        produitId: 0,
                        bouteilleId: 0,
                        libelléProduit: "",
                        nombreBouteilles: 0,
                        prixTTC: 0,
                        fraisPoste: 0,
                        quantitéMinimum: 0,
                        datePeremption: "",
                        dproduitActions: [
                            {
                                produitActionId: 0,
                                produitId: 0,
                                actionDesc: "",
                                actionPourcent: 0,
                                débutAction: "",
                                finAction: ""
                            }
                        ]
                    },
                    {
                        produitId: 0,
                        bouteilleId: 0,
                        libelléProduit: "",
                        nombreBouteilles: 0,
                        prixTTC: 0,
                        fraisPoste: 0,
                        quantitéMinimum: 0,
                        datePeremption: "",
                        dproduitActions: [
                            {
                                produitActionId: 0,
                                produitId: 0,
                                actionDesc: "",
                                actionPourcent: 0,
                                débutAction: "",
                                finAction: ""
                            }
                        ]
                    },
                    {
                        produitId: 0,
                        bouteilleId: 0,
                        libelléProduit: "",
                        nombreBouteilles: 0,
                        prixTTC: 0,
                        fraisPoste: 0,
                        quantitéMinimum: 0,
                        datePeremption: "",
                        dproduitActions: [
                            {
                                produitActionId: 0,
                                produitId: 0,
                                actionDesc: "",
                                actionPourcent: 0,
                                débutAction: "",
                                finAction: ""
                            }
                        ]
                    }
                ],
                dstocks: [ 
                  {
                      stockId: 0,
                      bouteilleId: 0,
                      quantitéEntrée: 0,
                      DateEntrée: "",
                      valeurEntrée: 0,
                      valeurVendue: 0,
                      valeurSolde: 0,
                      quantitéRéserve: 0,
                      quantitéSolde: 0
                  }
                ]
            }
    ])
    const [loadedState, setLoadedState] = useState<boolean>(false)
/*
/* *** - *** - *** - *** - *** -  Constantes
*/
    let url: string = BASE_URL
    let ciurl: string = url + "Dbouteille/"
/*
// *** - *** - *** - *** - *** -  Messages d'erreur
*/  
  let errmsgs: string[] = [
    "Problème à l'obtention de la liste",
  ]
// *** - *** - *** - *** - *** -  Fetch G E T
// --- * --- * --- * Obtention de la liste des cuvées
  type CallbackGetLCuvDBFunction = (result: resultGetListeBouteille) => void
  const getListeBouteille = async (callback: CallbackGetLCuvDBFunction) => {
      await FetchGetListeBouteille(ciurl)
      .then((res) => {callback(res)})
  }
  function handleGetLBotCallback(result: resultGetListeBouteille) {
    setLoadedState(true)
    initMessages()
    if(result.ok) {
      setListBouteilleState(result.lBout)
     } else { addMessage(0, errmsgs[0]) }
  }
/*
// *--- *--- *--- Gestion des messages d'erreur
*/
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
/*       case 1:
        setError2State(true)
        break
      case 2:
        setError3State(true)
        break
 */    
    }
  }
  const initMessages = () => {
    setError1State(false)               
/*     
    setError2State(false)               
    setError3State(false)
*/    
    let ind: number = 0
    errorMsgState.forEach( (msg) => {
      msg.MessageE = ""
      createNewErrorMsgState(ind, msg)
      ind++
    })               
  }
  const updateImage = (bout: oneBouteille) => {
    console.log(bout)
    dispatch(storeimageinitial())
    dispatch(storeimage(bout))
    navigate("/updboutimage")
  };
  const updateProduit = (bout: oneBouteille) => {
    console.log(bout)
    dispatch(storeproduitinitial())
    dispatch(storeproduit(bout))
    navigate("/updprodbouteille")
  };
  const updateStock = (bout: oneBouteille) => {
    dispatch(storestockinitial())
    dispatch(storestock(bout))
    navigate("/updstock")
  };
/*
// *--- *--- *--- *--- *--- Lancement api
*/
  useEffect(() => {
    getListeBouteille(handleGetLBotCallback)
  }, [loadedState])
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
                <Col sm={3}><h2 className="all disinline">Liste des Bouteilles</h2></Col>
            </Row>
        {/* --- * --- * --- * --- * LISTE DES BOUTEILLES * --- * --- * --- * --- */}
            <Row as='div' className="divh10"></Row>
            <Row>
                <Col sm={1}><Form.Group ><Form.Label><strong>N°</strong></Form.Label></Form.Group></Col>
                <Col sm={3}><Form.Group ><Form.Label><strong>Libellé</strong></Form.Label></Form.Group></Col>
                <Col sm={1}><Form.Group ><Form.Label><strong>M a j des images</strong></Form.Label></Form.Group></Col>
                <Col sm={1}><Form.Group ><Form.Label><strong>M a j des produits</strong></Form.Label></Form.Group></Col>
                <Col sm={1}><Form.Group ><Form.Label><strong>M a j du stock</strong></Form.Label></Form.Group></Col>
            </Row>

            <Row as='div' className="divh10"></Row>
            <div>
              {
              listBouteilleState.map((bout, index) => <Row key={index} className="align-items-start mb-1">
                <Col sm={1}>{bout.bouteilleId}</Col>
                <Col sm={3}  className="all">{bout.libelléBouteille}</Col>
                <Col sm={1}><Button onClick={() => updateImage(bout)} type="button" variant="success" size="sm">+</Button></Col>
                <Col sm={1}><Button onClick={() => updateProduit(bout)} type="button" variant="success" size="sm">P</Button></Col>
                <Col sm={1}><Button onClick={() => updateStock(bout)} type="button" variant="success" size="sm">S</Button></Col>
                </Row>
                )
              }
            </div>
        </Form>
    </Container>
    )
}