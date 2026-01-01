import { useEffect, useState } from "react";
import { Button, CardGroup, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../core/infrastructures/https/http-handler";
import { RootState } from "../../../../redux/store/storeRedux";
import { IOneBotWithImag, bouteille, LBouteilleImages, oneBouteilleImage, Mes_Error, MesE } from "../../models";
import { FetchGetOneBotImages, FetchPutOneBotImages } from "../../services/apis";
import { BouteilleImageList } from "../BouteilleImageList";
import { AddModal } from "../AddModal"
import { DeleteModal } from "../DeleteModal"
import { UpdateModal } from "../UpdateModal"

export const UpdateBouteilleImage = () => {
    const etatimagloaded = useSelector((state: RootState) => state.etatimage.loaded);
    const etatimagvalue = useSelector((state: RootState) => state.etatimage.value);
    const etatBouteilleImage: bouteille = etatimagvalue
    const etatImages: LBouteilleImages = etatimagvalue.dbouteilleImages
    console.log("etatimagvalue: ", etatimagvalue)
    console.log("etatimagvalue.dbouteilleImages : ", etatimagvalue.dbouteilleImages)

    const navigate = useNavigate()

    const [bouteilleState, setBouteilleState] = useState<bouteille>({
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
    const [bouteilleImagesState, setBouteilleImagesState] = useState<LBouteilleImages>([{
        bouteilleImageId: 0,
        bouteilleId: 0,   
        imageDesc: "",
        imageUrl: ""
    }])
    const [imageToDeleteState, setImageToDeleteState] = useState<oneBouteilleImage>({
      bouteilleImageId  : 0,
      bouteilleId  : 0,
      imageDesc  : "",
      imageUrl  : ""
    })
    const [imageToUpdateState, setImageToUpdateState] = useState<oneBouteilleImage>({
      bouteilleImageId  : 0,
      bouteilleId  : 0,
      imageDesc  : "",
      imageUrl  : ""
    })
    const [showAddState, setShowAddState] = useState<boolean>(false)
    const [showUpdateState, setShowUpdateState] = useState<boolean>(false)
    const [showDeleteState, setShowDeleteState] = useState<boolean>(false)
    const [error1State, setError1State] = useState<boolean>(false)
    const [errorMsgState, setErrorMsgState] = useState<MesE>([
    { MessageE: "" }, { MessageE: "" }, { MessageE: "" } 
    ])

/*
// *** - *** - *** - *** - *** -  Fetch P U T
*/

/*
/* *** - *** - *** - *** - *** -  Constantes
*/
    let url: string = BASE_URL
    let ciurl: string = url + "Dbouteille/"
/*
// *** - *** - *** - *** - *** -  Messages d'erreur
*/  
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
    let errmsgs: string[] = [
        "Problème à l'obtention de la bouteille et de ses produits",
        "Informations correctement mises à jour",
        "Problème lors de la mise à jour des images"
    ]
  type CallbackPutFunction = (result: boolean) => void
    const PutOneBotImages = async (imag: IOneBotWithImag, callback: CallbackPutFunction) => {
    await FetchPutOneBotImages(imag, ciurl)
      .then((res) => {callback(res)})
  }
  function handlePutCallback(result: boolean) {
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
// *--- *--- *--- Obtention des données du store redux
*/
    const setEtats = () => {
        if(etatimagloaded){
            setBouteilleState(etatBouteilleImage)
            setBouteilleImagesState(etatImages)
        } else {
            initMessages()
            addMessage(0, errmsgs[0])
        }
    }

    useEffect(() => {
        setEtats()
    }, [])
    console.log("bouteilleState: ", bouteilleState)
    console.log("bouteilleImagesState: ", bouteilleImagesState)
/*
// *--- *--- *--- Traitement de l'événementiel
*/  
    const updateBouteilleImage = (id: number) => {
        const ImageToUpdate = bouteilleImagesState.find((item) => item.bouteilleImageId == id)
        if(ImageToUpdate){
            setImageToUpdateState(ImageToUpdate)
            setShowUpdateState(true)
        }
    }
    const updateOk = (image: oneBouteilleImage) => {

        setShowUpdateState(false)

    }
    const updateCancel = () => {
            setShowUpdateState(false)
    }
    const deleteBouteilleImage = (id: number) => {
        const ImageToDelete = bouteilleImagesState.find((item) => item.bouteilleImageId == id)
        if(ImageToDelete){
            setImageToDeleteState(ImageToDelete)
            setShowDeleteState(true)
        }
    }
    const deleteOk = (id: number) => {
        const ImageToDeleteIndex = bouteilleImagesState.findIndex((item) => item.bouteilleImageId == id)
        if(ImageToDeleteIndex >= 0)
        {
            let newState: LBouteilleImages = bouteilleImagesState
            let filterNewState: LBouteilleImages = newState.filter(status => status.bouteilleImageId !== id)
            setBouteilleImagesState(filterNewState)
        }
        setShowDeleteState(false)
    }
    const deleteCancel = () => {
        setShowDeleteState(false)
    }
    const recordBouteilleImages = () => {
    }
    const addBouteilleImage = () => { 
        setShowAddState(true)
    }
    const addOk = (image: oneBouteilleImage) => {
        image.bouteilleId = bouteilleState.bouteilleId
        setBouteilleImagesState([...bouteilleImagesState, image])
        setShowAddState(false)
    }
    const addCancel = () => {
        setShowAddState(false)
    }
    const cancelBouteilleImages = () => {
    }
    return (
    <Container>
    {/* --- * --- * --- * --- * FORMULAIRE * --- * --- * --- * --- */}
        <Form>
    {/* --- * --- * --- * --- * TITRE * --- * --- * --- * --- */}

            <Row as='div' className="divh10"></Row>
            <Row>
                <Col sm={6}>
                <Form.Group className="" controlId="errmsgs">
                    <Form.Control readOnly type= "text" value={errorMsgState[0].MessageE}
                        className={`${error1State ? "colred border border-danger" : "colblack border border-success"}`}
                    />
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={5}><h4 className="all disinline">Photos de la bouteille&nbsp;&nbsp;{bouteilleState.bouteilleId}&nbsp;&nbsp;{bouteilleState.libelléBouteille}</h4></Col>
            </Row>
            <Row>
                <Col sm={5}>
                    <CardGroup>
                        <BouteilleImageList items={bouteilleImagesState} 
                            updateBout={updateBouteilleImage}
                            deleteBout={deleteBouteilleImage}>
                        </BouteilleImageList>
                    </CardGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={1}>
                    <Button className="all" variant="success" type="button" onClick={recordBouteilleImages}>OK</Button>
                </Col>
                <Col sm={1}></Col>
                <Col sm={1}>
                    <Button className="alc" variant="success" type="button" onClick={addBouteilleImage}>Ajout</Button>
                </Col>
                <Col sm={1}></Col>
                <Col sm={1}>
                    <Button className="alr" variant="success" type="button" onClick={cancelBouteilleImages}>Abandon</Button>
                </Col>
            </Row>
        </Form>
        <AddModal show={showAddState} addOkState={addOk} addCancelState={addCancel}/>
        <DeleteModal show={showDeleteState} image={imageToDeleteState} deleteOkState={deleteOk} deleteCancelState={deleteCancel}/>
        <UpdateModal show={showUpdateState} image={imageToUpdateState} updateOkState={updateOk} updateCancelState={updateCancel}/>
    </Container>
    )
}