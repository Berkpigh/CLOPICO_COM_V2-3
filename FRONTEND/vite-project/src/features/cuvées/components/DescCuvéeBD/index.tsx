import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../../../../core/infrastructures/https/http-handler";
import { storedesc, storedescinitial } from "../../../../redux/slices/desctoupdateSlice";
import { AppDispatch, RootState } from "../../../../redux/store/storeRedux";
import { IOneCuv, LCuvée, MesE, Mes_Error, TresL } from "../../models";
import { FetchGetListeCuvéeBD } from "../../services/apis";

export const DescCuvéeBD = () =>  {
    const etatdesc = useSelector((state: RootState) => state.etatdesc.loaded);
    console.log("etatdesc: ",etatdesc)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()


    const [error1State, setError1State] = useState<boolean>(false)
    const [errorMsgState, setErrorMsgState] = useState<MesE>([
    { MessageE: "" }, { MessageE: "" }, { MessageE: "" } 
    ])
//    const [lOneCuvOnlyState, setLOneCuvOnlyState] = useState<LOneCuvOnly>([])
    const [listCuvéeState, setListCuvéeState] = useState<LCuvée>(
        [
            {
                cuvéeId: 0,
                annéeCuvée: 0,
                typeCuvée: "",
                libelléCuvée: "",
                descCuvée: [
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
            }
    ])
    const [loadedState, setLoadedState] = useState<boolean>(false)
/*
/* *** - *** - *** - *** - *** -  Constantes
*/
    let url: string = BASE_URL
    let ciurl: string = url + "DcuvéeBD/"
/*
// *** - *** - *** - *** - *** -  Messages d'erreur
*/  
  let errmsgs: string[] = [
    "Problème à l'obtention de la liste",
  ]
/*
// *** - *** - *** - *** - *** -  Fetch G E T
// --- * --- * --- * Obtention de la liste des cuvées
*/
  type CallbackGetLCuvDBFunction = (result: TresL) => void
  const getListeCuvéeBD = async (callback: CallbackGetLCuvDBFunction) => {
      await FetchGetListeCuvéeBD(ciurl)
      .then((res) => {callback(res)})
  }
  function handleGetLCuvCallback(result: TresL) {
    setLoadedState(true)
    initMessages()
    if(result.ok) {
      setListCuvéeState(result.lcuv)
      //loadCuvOnly(result.lcuv)
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
  const updateDesc = (cuvée: IOneCuv) => {
    dispatch(storedescinitial())
    dispatch(storedesc(cuvée))
    navigate("/upddesccuvee")
  };
/*
// *--- *--- *--- *--- *--- Lancement api
*/
  useEffect(() => {
    getListeCuvéeBD(handleGetLCuvCallback)
  }, [loadedState])

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
                <Col sm={3}><h2 className="all disinline">Liste des Cuvée</h2></Col>
            </Row>
        {/* --- * --- * --- * --- * LISTE DES CUVEES * --- * --- * --- * --- */}
            <Row as='div' className="divh10"></Row>
            <Row>
                <Col sm={1}><Form.Group ><Form.Label><strong>N°</strong></Form.Label></Form.Group></Col>
                <Col sm={1}><Form.Group ><Form.Label><strong>Année</strong></Form.Label></Form.Group></Col>
                <Col sm={2}><Form.Group ><Form.Label><strong>Type</strong></Form.Label></Form.Group></Col>
                <Col sm={3}><Form.Group ><Form.Label><strong>Libellé</strong></Form.Label></Form.Group></Col>
                <Col sm={2}><Form.Group ><Form.Label><strong>Voir descriptions</strong></Form.Label></Form.Group></Col>
            </Row>

            <Row as='div' className="divh10"></Row>
            <div>
              {
              listCuvéeState.map((cuvée, index) => <Row key={index}>
                <Col sm={1}>{cuvée.cuvéeId}</Col>
                <Col sm={1}>{cuvée.annéeCuvée}</Col>
                <Col sm={2}>{cuvée.typeCuvée}</Col>
                <Col sm={3}>{cuvée.libelléCuvée}</Col>
                <Col sm={2}><Button onClick={() => updateDesc(cuvée)} type="button" variant="success" size="sm">{cuvée.libelléCuvée}</Button></Col>
                </Row>
                )
              }
            </div>
        </Form>
    </Container>
    )
  }