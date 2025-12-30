import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../core/infrastructures/https/http-handler";
import { RootState } from "../../../../redux/store/storeRedux";
import { bouteille, Mes_Error, MesE, stock } from "../../models";
import { FetchPostOneBotStock } from "../../services/apis";

export const UpdateStock = () => {
    const etatstockloaded = useSelector((state: RootState) => state.etatstock.loaded);
    const etatstockvalue = useSelector((state: RootState) => state.etatstock.value);
    const etatBouteille: bouteille = etatstockvalue
    const etatStock: stock = etatstockvalue.dstocks[0]
    console.log("etatStock: ", etatStock)

    const navigate = useNavigate()
//    const [renderState, setRenderState] = useState<boolean>(false)
    const [etatBotWithStockState, setEtatBotWithStockState] = useState<bouteille>({
        bouteilleId: 0,
        cuvéeId: 0,
        libelléBouteille: "",
        capacité: 0,
        dbouteilleImages: [
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
    )
    const [etatStockState, setEtatStockState] = useState<stock>(
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
    )
    const [etatLibBout, setEtatLibBout] = useState<string>("")
    const [error1State, setError1State] = useState<boolean>(false)
    const [errorMsgState, setErrorMsgState] = useState<MesE>([
    { MessageE: "" }, { MessageE: "" }, { MessageE: "" } 
    ])
/*
/* *** - *** - *** - *** - *** -  Constantes
*/
    let url: string = BASE_URL
    let ciurl: string = url + "Dstock/"
/*
// *** - *** - *** - *** - *** -  Messages d'erreur
*/  
    let errmsgs: string[] = [
        "Problème à l'obtention de la bouteille et de son stock",
        "Informations correctement mises à jour",
        "Problème lors de la mise à jour du stock"
    ]
/*
// *** - *** - *** - *** - *** -  Fetch P O S T
*/
  type CallbackPostFunction = (result: boolean) => void
  const PostOneBotStock = async (sto: stock, callback: CallbackPostFunction) => {
    await FetchPostOneBotStock(sto, ciurl)
      .then((res) => {callback(res)})
  }
  function handlePostCallback(result: boolean) {
    initMessages()
    setError1State(false)
    let mes: Mes_Error = { MessageE: "" }
    if(result) {
        mes.MessageE = errmsgs[1]
        createNewErrorMsgState(0, mes)
    } else {
        mes.MessageE = errmsgs[2]
        createNewErrorMsgState(0, mes)
        setError1State(true)
    }
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
/*
// *--- *--- *--- Obtention des données du store redux
*/
    const setEtats = () => {
        if(etatstockloaded){

            setEtatBotWithStockState(etatBouteille)
            setEtatStockState(etatStock)
        } else {
            initMessages()
            addMessage(0, errmsgs[0])
        }
    }
    const setLibelle = () => {
        const lib: string = "Bouteille n° " + etatStockState.bouteilleId.toString() + " " + etatBotWithStockState.libelléBouteille
        setEtatLibBout(lib)
    } 

    useEffect(() => {
        setEtats()
        setLibelle()
    }, [])
/*
// *--- *--- *--- Traitement de l'événementiel
*/
    const clickEnregistrement = () => {
        const newStock: stock = {
            stockId: etatStockState.stockId,
            bouteilleId: etatStockState.bouteilleId,
            quantitéEntrée: etatStockState.quantitéEntrée,
            DateEntrée: etatStockState.DateEntrée,
            valeurEntrée: etatStockState.valeurEntrée,
            valeurVendue: etatStockState.valeurVendue,
            valeurSolde: etatStockState.valeurSolde,
            quantitéRéserve: etatStockState.quantitéRéserve,
            quantitéSolde: etatStockState.quantitéSolde
        }
        PostOneBotStock(newStock, handlePostCallback)
    }
    const clickRetour = () => {
        navigate("/descbouteille")
    }
    const clickAction = () => {}
    const updQuantitéEntrée = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState: stock = {
            stockId: etatStockState.stockId,
            bouteilleId: etatStockState.bouteilleId,
            quantitéEntrée: Number(e.target.value),
            DateEntrée: etatStockState.DateEntrée,
            valeurEntrée: etatStockState.valeurEntrée,
            valeurVendue: etatStockState.valeurVendue,
            valeurSolde: etatStockState.valeurSolde,
            quantitéRéserve: etatStockState.quantitéRéserve,
            quantitéSolde: etatStockState.quantitéSolde
        }
        setEtatStockState(newState)
    }
    const updDateEntrée = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState: stock = {
            stockId: etatStockState.stockId,
            bouteilleId: etatStockState.bouteilleId,
            quantitéEntrée: etatStockState.quantitéEntrée,
            DateEntrée: e.target.value,
            valeurEntrée: etatStockState.valeurEntrée,
            valeurVendue: etatStockState.valeurVendue,
            valeurSolde: etatStockState.valeurSolde,
            quantitéRéserve: etatStockState.quantitéRéserve,
            quantitéSolde: etatStockState.quantitéSolde
        }
        setEtatStockState(newState)
    }
    const updValeurEntrée = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState: stock = {
            stockId: etatStockState.stockId,
            bouteilleId: etatStockState.bouteilleId,
            quantitéEntrée: etatStockState.quantitéEntrée,
            DateEntrée: etatStockState.DateEntrée,
            valeurEntrée: Number(e.target.value),
            valeurVendue: etatStockState.valeurVendue,
            valeurSolde: etatStockState.valeurSolde,
            quantitéRéserve: etatStockState.quantitéRéserve,
            quantitéSolde: etatStockState.quantitéSolde
        }
        setEtatStockState(newState)
    }
    const updValeurVendue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState: stock = {
            stockId: etatStockState.stockId,
            bouteilleId: etatStockState.bouteilleId,
            quantitéEntrée: etatStockState.quantitéEntrée,
            DateEntrée: etatStockState.DateEntrée,
            valeurEntrée: etatStockState.valeurEntrée,
            valeurVendue: Number(e.target.value),
            valeurSolde: etatStockState.valeurSolde,
            quantitéRéserve: etatStockState.quantitéRéserve,
            quantitéSolde: etatStockState.quantitéSolde
        }
        setEtatStockState(newState)
    }
    const updValeurSolde = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState: stock = {
            stockId: etatStockState.stockId,
            bouteilleId: etatStockState.bouteilleId,
            quantitéEntrée: etatStockState.quantitéEntrée,
            DateEntrée: etatStockState.DateEntrée,
            valeurEntrée: etatStockState.valeurEntrée,
            valeurVendue: etatStockState.valeurVendue,
            valeurSolde: Number(e.target.value),
            quantitéRéserve: etatStockState.quantitéRéserve,
            quantitéSolde: etatStockState.quantitéSolde
        }
        setEtatStockState(newState)
    }
    const updQuantitéRéserve = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState: stock = {
            stockId: etatStockState.stockId,
            bouteilleId: etatStockState.bouteilleId,
            quantitéEntrée: etatStockState.quantitéEntrée,
            DateEntrée: etatStockState.DateEntrée,
            valeurEntrée: etatStockState.valeurEntrée,
            valeurVendue: etatStockState.valeurVendue,
            valeurSolde: etatStockState.valeurSolde,
            quantitéRéserve: Number(e.target.value),
            quantitéSolde: etatStockState.quantitéSolde
        }
        setEtatStockState(newState)
    }
    const updQuantitéSolde = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState: stock = {
            stockId: etatStockState.stockId,
            bouteilleId: etatStockState.bouteilleId,
            quantitéEntrée: etatStockState.quantitéSolde,
            DateEntrée: etatStockState.DateEntrée,
            valeurEntrée: etatStockState.valeurEntrée,
            valeurVendue: etatStockState.valeurVendue,
            valeurSolde: etatStockState.valeurSolde,
            quantitéRéserve: etatStockState.quantitéRéserve,
            quantitéSolde: Number(e.target.value)
        }
        setEtatStockState(newState)
    }
{/* --- * --- * --- * --- * RENDER * --- * --- * --- * --- */}

  return (
    <Container>
    {/* --- * --- * --- * --- * FORMULAIRE * --- * --- * --- * --- */}
        <Form>

    {/* --- * --- * --- * --- * TITRE * --- * --- * --- * --- */}

            <Row as='div' className="divh10"></Row>
            <Row className="mb-1">
                <Col sm={2}>
                <Form.Group className="" controlId="errmsgs">
                    <Form.Control readOnly type= "text" value={errorMsgState[0].MessageE}
                        className={`${error1State ? "colred border border-danger" : "colblack border border-success"}`}
                    />
                </Form.Group>
                </Col>
                <Col sm={5}>
                    <h2 className="all disinline">
                        Mise à jour du stock de la bouteille n° {etatStockState.bouteilleId.toString() + " " + etatBotWithStockState.libelléBouteille}
                    </h2>
                </Col>
                <Col sm={1}>
                    <Button type="button" onClick={clickEnregistrement} variant="success" size="lg">Enregistrer</Button>
                </Col>
                <Col sm={1}></Col>
                <Col sm={1}>
                    <Button type="button" onClick={clickRetour} variant="success" size="lg">Retour</Button>
                </Col>
            </Row>
        {/* --- * --- * --- * --- * LISTE DES DESCRIPTIONS * --- * --- * --- * --- */}
            <Row as='div' className="divh10"></Row>
            <Row className="mb-1">
                <Col sm={1}><Form.Group ><Form.Label><strong>Qt.Entrée</strong></Form.Label></Form.Group></Col>
                <Col sm={2}><Form.Group ><Form.Label><strong>Date Entrée</strong></Form.Label></Form.Group></Col>
                <Col sm={2}><Form.Group ><Form.Label><strong>Mt. Entrée</strong></Form.Label></Form.Group></Col>
                <Col sm={2}><Form.Group ><Form.Label><strong>Mt. Vente</strong></Form.Label></Form.Group></Col>
                <Col sm={2}><Form.Group ><Form.Label><strong>Val. Solde</strong></Form.Label></Form.Group></Col>
                <Col sm={1}><Form.Group ><Form.Label><strong>Qt.Réserve</strong></Form.Label></Form.Group></Col>
                <Col sm={1}><Form.Group ><Form.Label><strong>Qt.Solde</strong></Form.Label></Form.Group></Col>
            </Row>

            <Row  className="mb-1">
                    <Col sm={1}><Form.Control onChange={updQuantitéEntrée} type="text" value={etatStockState.quantitéEntrée}/></Col>
                    <Col sm={2}><Form.Control onChange={updDateEntrée} type="text" value={etatStockState.DateEntrée}/></Col>
                    <Col sm={2}><Form.Control onChange={updValeurEntrée} type="text" value={etatStockState.valeurEntrée}/></Col>
                    <Col sm={2}><Form.Control onChange={updValeurVendue} type="text" value={etatStockState.valeurVendue}/></Col>
                    <Col sm={2}><Form.Control onChange={updValeurSolde} type="text" value={etatStockState.valeurSolde}/></Col>
                    <Col sm={1}><Form.Control onChange={updQuantitéRéserve} type="text" value={etatStockState.quantitéRéserve}/></Col>
                    <Col sm={1}><Form.Control onChange={updQuantitéSolde} type="text" value={etatStockState.quantitéSolde}/></Col>
            </Row>
{/* className="colblack border border-success" */}

        </Form>
    </Container>
    )
}