import { useSelector } from "react-redux";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { RootState } from "../../../../redux/store/storeRedux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IOneBotWithProd, bouteille, oneProduit, LProds, Mes_Error, MesE } from "../../models";
import { BASE_URL } from "../../../../core/infrastructures/https/http-handler";
import { FetchPostOneBotProd } from "../../services/apis"

export const UpdateProduitBouteilles = () => {
    const etatprodloaded = useSelector((state: RootState) => state.etatproduit.loaded);
    const etatprodvalue = useSelector((state: RootState) => state.etatproduit.value);
    const etatBouteille: bouteille = etatprodvalue
    const etatProduits: LProds = etatprodvalue.dproduits
    console.log("etatprodvalue: ", etatprodvalue)
    console.log("etatprodvalue.dproduits: ", etatprodvalue.dproduits)

    const navigate = useNavigate()
//    const [renderState, setRenderState] = useState<boolean>(false)
    const [prodIndexState, setProdIndexState] = useState<number>(0)
    const [etatBotWithProdState, setEtatBotWithProdState] = useState<bouteille>({
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
    const [etatProduitState, setEtatProduitState] = useState<LProds>([
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
        }]
    )
    const [error1State, setError1State] = useState<boolean>(false)
    const [errorMsgState, setErrorMsgState] = useState<MesE>([
    { MessageE: "" }, { MessageE: "" }, { MessageE: "" } 
    ])
/*
// *** - *** - *** - *** - *** -  Fetch P O S T
*/
/*
/* *** - *** - *** - *** - *** -  Constantes
*/
    let url: string = BASE_URL
    let ciurl: string = url + "Dbouteille/"
/*
// *** - *** - *** - *** - *** -  Messages d'erreur
*/  
    let errmsgs: string[] = [
        "Problème à l'obtention de la bouteille et de ses produits",
        "Informations correctement mises à jour",
        "Problème lors de la mise à jour des produits"
    ]
  type CallbackPostFunction = (result: boolean) => void
  const PostOneBotProd = async (bot: IOneBotWithProd, callback: CallbackPostFunction) => {
    await FetchPostOneBotProd(bot, ciurl)
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
        if(etatprodloaded){
            setEtatBotWithProdState(etatBouteille)
            console.log("etatBotWithProdState: ", etatBotWithProdState)
            setEtatProduitState(etatProduits)
            console.log("etatProduitState: ", etatProduitState)
        } else {
            initMessages()
            addMessage(0, errmsgs[0])
        }
    }

    useEffect(() => {
        setEtats()
    }, [])
/*
// *--- *--- *--- Traitement de l'événementiel
*/
    const handleFocus = (ind: number) => {
        setProdIndexState(ind)
    }
    const clickEnregistrement = () => {
        const newBotWithProd: IOneBotWithProd = {
            bouteilleId: etatprodvalue.bouteilleId,
            cuvéeId: etatprodvalue.cuvéeId,
            libelléBouteille: etatprodvalue.libelléBouteille,
            capacité: etatprodvalue.capacité,
            dproduits: etatprodvalue.dproduits
        }
        PostOneBotProd(newBotWithProd, handlePostCallback)
    }
    const clickRetour = () => {
        navigate("/descbouteille")
    }
    const clickAction = (prod: oneProduit) => {
        console.log("prod: ", prod)
    }
    const createNewEtatProdState = (ind: number, newprod: oneProduit) => {
        const newEtatProdState = etatProduitState.map((state, index) => {
            if(index == ind) { return newprod } else { return state }
        })
        setEtatProduitState(newEtatProdState)
    }
    const updDatePeremption = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState: oneProduit = {
            produitId: etatProduitState[prodIndexState].produitId,
            bouteilleId: etatProduitState[prodIndexState].bouteilleId,
            libelléProduit: etatProduitState[prodIndexState].libelléProduit,
            nombreBouteilles: etatProduitState[prodIndexState].nombreBouteilles,
            prixTTC: etatProduitState[prodIndexState].prixTTC,
            fraisPoste: etatProduitState[prodIndexState].fraisPoste,
            quantitéMinimum: etatProduitState[prodIndexState].quantitéMinimum,
            datePeremption: e.target.value,
            dproduitActions: etatProduitState[prodIndexState].dproduitActions
        }
        createNewEtatProdState(prodIndexState, newState)
    }
    const updFraisPoste = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState: oneProduit = {
            produitId: etatProduitState[prodIndexState].produitId,
            bouteilleId: etatProduitState[prodIndexState].bouteilleId,
            libelléProduit: etatProduitState[prodIndexState].libelléProduit,
            nombreBouteilles: etatProduitState[prodIndexState].nombreBouteilles,
            prixTTC: etatProduitState[prodIndexState].prixTTC,
            fraisPoste: Number(e.target.value),
            quantitéMinimum: etatProduitState[prodIndexState].quantitéMinimum,
            datePeremption: etatProduitState[prodIndexState].datePeremption,
            dproduitActions: etatProduitState[prodIndexState].dproduitActions
        }
        createNewEtatProdState(prodIndexState, newState)
    }
    const updPrixCHF = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState: oneProduit = {
            produitId: etatProduitState[prodIndexState].produitId,
            bouteilleId: etatProduitState[prodIndexState].bouteilleId,
            libelléProduit: etatProduitState[prodIndexState].libelléProduit,
            nombreBouteilles: etatProduitState[prodIndexState].nombreBouteilles,
            prixTTC: Number(e.target.value),
            fraisPoste: etatProduitState[prodIndexState].fraisPoste,
            quantitéMinimum: etatProduitState[prodIndexState].quantitéMinimum,
            datePeremption: etatProduitState[prodIndexState].datePeremption,
            dproduitActions: etatProduitState[prodIndexState].dproduitActions
        }
        createNewEtatProdState(prodIndexState, newState)
    }
{/* --- * --- * --- * --- * RENDER * --- * --- * --- * --- */}

  return (
    <Container>
    {/* --- * --- * --- * --- * FORMULAIRE * --- * --- * --- * --- */}
        <Form>

    {/* --- * --- * --- * --- * TITRE * --- * --- * --- * --- */}

            <Row as='div' className="divh10"></Row>
            <Row>
                <Col sm={2}>
                <Form.Group className="" controlId="errmsgs">
                    <Form.Control readOnly type= "text" value={errorMsgState[0].MessageE}
                        className={`${error1State ? "colred border border-danger" : "colblack border border-success"}`}
                    />
                </Form.Group>
                </Col>
                <Col sm={4}>
                    <h2 className="all disinline">
                        Mise à jour des produits de la bouteille n°{etatBotWithProdState.bouteilleId} <br></br>{etatBotWithProdState.libelléBouteille}
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
            <Row as='div' className="divh20"></Row>
            <Row className="align-items-center">
                <Col sm={2}><Form.Group ><Form.Label><strong>N°</strong></Form.Label></Form.Group></Col>
                <Col sm={2}><Form.Group ><Form.Label><strong>Date Péremption</strong></Form.Label></Form.Group></Col>
                <Col sm={1}><Form.Group ><Form.Label><strong>Frais Poste</strong></Form.Label></Form.Group></Col>
                <Col sm={1}><Form.Group ><Form.Label><strong>Prix CHF</strong></Form.Label></Form.Group></Col>
                <Col sm={1}></Col>
                <Col sm={1}><Form.Group ><Form.Label><strong>A c t i o n s</strong></Form.Label></Form.Group></Col>
            </Row>

            <Row as='div' className="divh10"></Row>
            <div>
            {etatProduitState.map((prod, index) => 
                <Row key={index} className="mb-1">
                    <Col sm={4}><Form.Control readOnly type="text" value={prod.libelléProduit} style={{ fontWeight: 'bold' }}/></Col>
                    <Row className="align-items-center mb-1">
                        <Col sm={2}><Form.Control readOnly type="text" value={prod.produitId}/></Col>
                        <Col sm={2}>
                            <Form.Control onFocus={() => {handleFocus(index)}} onChange={updDatePeremption} type="text" value={prod.datePeremption}/>
                         </Col>
                        <Col sm={1}>
                            <Form.Control onFocus={() => {handleFocus(index)}} onChange={updFraisPoste} type="number" value={prod.fraisPoste}/>
                         </Col>
                        <Col sm={2}>
                            <Form.Control onFocus={() => {handleFocus(index)}} onChange={updPrixCHF} type="number" value={prod.prixTTC}/>
                         </Col>
                        <Col sm={1}>
                            <Button type="button" onClick={() => {clickAction(prod)}} variant="success" size="sm">M a j</Button>
                        </Col>
                    </Row>
                </Row>
            )}</div>
{/* className="colblack border border-success" */}

        </Form>
    </Container>
    )
}