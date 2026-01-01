import { useEffect, useState } from "react"
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap"
import { oneBouteilleImage } from "../../models"

type UpdateModalProps = {
  show: boolean
  image: oneBouteilleImage
  updateOkState: (image: oneBouteilleImage) => void
  updateCancelState: () => void
}
export const UpdateModal = (props:UpdateModalProps) => {
    let initialState : oneBouteilleImage = props.image
    const handleCancel = () => {
      props.updateCancelState()
    } 
    const handleOk = () => {
      props.updateOkState(updatedImageState)
    }
    const [updatedImageState, setUpdatedImageState] =  useState<oneBouteilleImage>({
      bouteilleImageId: 0,
      bouteilleId: 0,
      imageDesc: "",
      imageUrl: ""
    })
    const [hasChangedState, setHasChangedState] = useState<boolean>(false)
    const updImageId = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newState: oneBouteilleImage = {
        bouteilleImageId  : Number(e.target.value),
        bouteilleId  : updatedImageState.bouteilleId,
        imageDesc  : updatedImageState.imageDesc,
        imageUrl  : updatedImageState.imageUrl
      }
      setUpdatedImageState(newState)
      setHasChangedState(true)
    }
    const updImageDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newState: oneBouteilleImage = {
        bouteilleImageId  : updatedImageState.bouteilleImageId,
        bouteilleId  : updatedImageState.bouteilleId,
        imageDesc  : e.target.value,
        imageUrl  : updatedImageState.imageUrl
      }
      setUpdatedImageState(newState)
      setHasChangedState(true)
    }
    const updImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newState: oneBouteilleImage = {
        bouteilleImageId  : updatedImageState.bouteilleImageId,
        bouteilleId  : updatedImageState.bouteilleId,
        imageDesc  : updatedImageState.imageDesc,
        imageUrl  : e.target.value
      }
      setUpdatedImageState(newState)
      setHasChangedState(true)
    }
    const initialize = () => {setUpdatedImageState(initialState)}
     
    return (
      <>
    <Modal
      size="lg"
      show={props.show}
      onHide={handleCancel}
      onShow={initialize}>
        <Modal.Header closeButton>
          <Modal.Title>Mise à jour de cette image de bouteille</Modal.Title>
        </Modal.Header>
          <Form>
            <Row>
               <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
                <Col sm={1} lg={1}></Col>
                <Form.Label  column sm={4}>N° d'image *</Form.Label>
                <Col sm={6} lg={2}>
                  <Form.Control type="number" value={updatedImageState.bouteilleImageId} required
                    onChange={updImageId}/>
                </Col>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
                <Col sm={1} lg={1}></Col>
                <Form.Label  column sm={4}>URL *</Form.Label>
                <Col sm={6} lg={6}>
                  <Form.Control type="text" value={updatedImageState.imageUrl} required
                    onChange={updImageUrl}/>
                </Col>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
                <Col sm={1} lg={1}></Col>
                <Form.Label  column sm={4}>Description *</Form.Label>
                <Col sm={6} lg={6}>
                  <Form.Control type="text" value={updatedImageState.imageDesc} required
                    onChange={updImageDesc}/>
                </Col>
              </Form.Group>
            </Row>
          </Form>
             <Row>
              <Col sm={1} lg={1}></Col>
              <Col sm={1} lg={1}>
                <Button variant="primary" onClick={handleCancel}>Abandon</Button>
              </Col>
              <Col sm={1} lg={1}></Col>
              <Col sm={1} lg={1}>
                <Button variant="primary" onClick={handleOk}
                  disabled={!hasChangedState}>OK</Button>
              </Col>
            </Row>
            <Row>
              <Col sm={5}>
                <Card><Card.Img src={updatedImageState.imageUrl} variant="top"></Card.Img></Card>
              </Col>
            </Row>
      </Modal>
      </>
    )
}
