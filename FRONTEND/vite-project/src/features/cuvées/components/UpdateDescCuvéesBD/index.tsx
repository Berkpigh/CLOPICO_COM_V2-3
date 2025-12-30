import { useSelector } from "react-redux";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { RootState } from "../../../../redux/store/storeRedux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IOneCuvWithDesc, IOneDesc, LDescs, Mes_Error, MesE } from "../../models";
import { BASE_URL } from "../../../../core/infrastructures/https/http-handler";
import { FetchPostOneCuvDesc } from "../../services/apis"

export const UpdateDescCuvéesBD = () => {
    const navigate = useNavigate()
//    const [renderState, setRenderState] = useState<boolean>(false)
    const [descIndexState, setDescIndexState] = useState<number>(0)
    const [etatCuvWithDescState, setEtatCuvWithDescState] = useState<IOneCuvWithDesc>({
            cuvéeId: 0,
            annéeCuvée: 0,
            typeCuvée: "",
            libelléCuvée: "",
            descCuvées: [
                {
                    descriptionCuvéeId: 0,
                    cuvéeId: 0,
                    langue: 0,
                    description: "",
                    descriptionLongue: "",
                    nomLangue: ""
                },
                {
                    descriptionCuvéeId: 0,
                    cuvéeId: 0,
                    langue: 0,
                    description: "",
                    descriptionLongue: "",
                    nomLangue: ""
                },
                {
                    descriptionCuvéeId: 0,
                    cuvéeId: 0,
                    langue: 0,
                    description: "",
                    descriptionLongue: "",
                    nomLangue: ""
                },
                {
                    descriptionCuvéeId: 0,
                    cuvéeId: 0,
                    langue: 0,
                    description: "",
                    descriptionLongue: "",
                    nomLangue: ""
                },
                {
                    descriptionCuvéeId: 0,
                    cuvéeId: 0,
                    langue: 0,
                    description: "",
                    descriptionLongue: "",
                    nomLangue: ""
                }
            ]
        },
    )
    const [etatDescState, setEtatDescState] = useState<LDescs>([
                {
                    descriptionCuvéeId: 0,
                    cuvéeId: 0,
                    langue: 0,
                    description: "",
                    descriptionLongue: "",
                    nomLangue: ""
                },
                {
                    descriptionCuvéeId: 0,
                    cuvéeId: 0,
                    langue: 0,
                    description: "",
                    descriptionLongue: "",
                    nomLangue: ""
                },
                {
                    descriptionCuvéeId: 0,
                    cuvéeId: 0,
                    langue: 0,
                    description: "",
                    descriptionLongue: "",
                    nomLangue: ""
                },
                {
                    descriptionCuvéeId: 0,
                    cuvéeId: 0,
                    langue: 0,
                    description: "",
                    descriptionLongue: "",
                    nomLangue: ""
                },
                {
                    descriptionCuvéeId: 0,
                    cuvéeId: 0,
                    langue: 0,
                    description: "",
                    descriptionLongue: "",
                    nomLangue: ""
                }
            ]
    )
    const [error1State, setError1State] = useState<boolean>(false)
    const [errorMsgState, setErrorMsgState] = useState<MesE>([
    { MessageE: "" }, { MessageE: "" }, { MessageE: "" } 
    ])
/*
/* *** - *** - *** - *** - *** -  Constantes
*/
    let url: string = BASE_URL
    let ciurl: string = url + "DcuvéeBD/"
/*
// *** - *** - *** - *** - *** -  Messages d'erreur
*/  
    let errmsgs: string[] = [
        "Problème à l'obtention de la cuvée et de ses descritions",
        "Informations correctement mises à jour",
        "Problème lors de la mise à jour des descriptions"
    ]
/*
// *** - *** - *** - *** - *** -  Fetch P O S T
*/
  type CallbackPostFunction = (result: boolean) => void
  const postOneCuvDesc = async (cuv: IOneCuvWithDesc, callback: CallbackPostFunction) => {
    await FetchPostOneCuvDesc(cuv, ciurl)
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
        if(etatdescloaded){
            setEtatCuvWithDescState(etatdescvalue)
            setEtatDescState(etatdescvalue.descCuvées)
        } else {
            initMessages()
            addMessage(0, errmsgs[0])
        }
    }
    const etatdescloaded = useSelector((state: RootState) => state.etatdesc.loaded);
    const etatdescvalue = useSelector((state: RootState) => state.etatdesc.value);

    useEffect(() => {
        setEtats()
    }, [])
/*
// *--- *--- *--- Traitement de l'événementiel
*/
    const handleFocus = (ind: number) => {
        setDescIndexState(ind)
    }
    const clickEnregistrement = () => {
        const newCuvWithDesc: IOneCuvWithDesc = {
            cuvéeId: etatCuvWithDescState.cuvéeId,
            annéeCuvée: etatCuvWithDescState.annéeCuvée,
            typeCuvée: etatCuvWithDescState.typeCuvée,
            libelléCuvée: etatCuvWithDescState.libelléCuvée,
            descCuvées: etatDescState
        }
        postOneCuvDesc(newCuvWithDesc, handlePostCallback)
    }
    const clickRetour = () => {
        navigate("/desccuvee")
    }
    const clickLangue = (desc: IOneDesc) => {
        console.log("desc: ", desc)
    }
    const createNewEtatDescState = (ind: number, newdesc: IOneDesc) => {
        const newEtatDescState = etatDescState.map((state, index) => {
            if(index == ind) { return newdesc } else { return state }
        })
        setEtatDescState(newEtatDescState)
    }
    const updDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState: IOneDesc = {
            descriptionCuvéeId: etatDescState[descIndexState].descriptionCuvéeId,
            cuvéeId: etatDescState[descIndexState].cuvéeId,
            langue: etatDescState[descIndexState].langue,
            description: e.target.value,
            descriptionLongue: etatDescState[descIndexState].descriptionLongue,
            nomLangue: etatDescState[descIndexState].nomLangue
        }
        createNewEtatDescState(descIndexState, newState)
    }
    const updDesclongue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState: IOneDesc = {
            descriptionCuvéeId: etatDescState[descIndexState].descriptionCuvéeId,
            cuvéeId: etatDescState[descIndexState].cuvéeId,
            langue: etatDescState[descIndexState].langue,
            description: etatDescState[descIndexState].description,
            descriptionLongue: e.target.value,
            nomLangue: etatDescState[descIndexState].nomLangue
        }
        createNewEtatDescState(descIndexState, newState)
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
                <Col sm={3}>
                    <h2 className="all disinline">Mise à jour des descriptions de la cuvée {etatCuvWithDescState.libelléCuvée}</h2>
                </Col>
                <Col sm={1}>
                    <Button type="button" onClick={clickEnregistrement} variant="success" size="lg">Enregistrer</Button>
                </Col>
            </Row>
            <Row>
                <Col sm={5}></Col>
                <Col sm={1}>
                    <Button type="button" onClick={clickRetour} variant="success" size="lg">Retour</Button>
                </Col>
            </Row>
        {/* --- * --- * --- * --- * LISTE DES DESCRIPTIONS * --- * --- * --- * --- */}
            <Row as='div' className="divh10"></Row>
            <Row>
                <Col sm={1}><Form.Group ><Form.Label><strong>Langue</strong></Form.Label></Form.Group></Col>
                <Col sm={6}><Form.Group ><Form.Label><strong>Description</strong></Form.Label></Form.Group></Col>
            </Row>

            <Row as='div' className="divh10"></Row>
            <div>
            {etatDescState.map((desc, index) => 
                <Row key={index} className="mb-1">
                    <Col sm={1}>
                        <Button type="button" onClick={() => {clickLangue(desc)}} variant="success" size="lg">{desc.nomLangue}</Button>
                    </Col>
                    <Col sm={5}>
                        <Form.Control onFocus={() => {handleFocus(index)}} onChange={updDescription} type="text" value={desc.description} 
                            className="colblack border border-success"
                        />
                    </Col>
                        <Row className="mb-1">
                            <Col sm={1}></Col>
                            <Col sm={6}>
                                <Form.Control onFocus={() => {handleFocus(index)}} onChange={updDesclongue} as="textarea" rows={4} value={desc.descriptionLongue} 
                                    className="colblack border border-success"
                                />
                            </Col>
                        </Row>
                </Row>
            )}</div>

        </Form>
    </Container>
    )
}