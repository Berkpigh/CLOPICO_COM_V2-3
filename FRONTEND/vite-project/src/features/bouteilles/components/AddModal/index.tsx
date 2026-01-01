import { Modal, Button, Row, Col, Form, Card } from  "react-bootstrap"
import { useState, useEffect } from "react"
import { oneBouteilleImage } from "../../models"

type AjoutModalProps = {
  show: boolean
  addOkState: (image: oneBouteilleImage) => void
  addCancelState: () => void
}
export const AddModal = (props:AjoutModalProps) => {
    const handleCancel = () => {
      props.addCancelState()
    } 
    const handleOk = () => {
      props.addOkState(newImageState)
    }
    const [newImageState, setNewImageState] =  useState<oneBouteilleImage>({
      bouteilleImageId  : 0,
      bouteilleId  : 0,
      imageDesc  : "",
      imageUrl  : ""
    })
    const initState = () => {
      const newState: oneBouteilleImage = {
        bouteilleImageId  : 0,
        bouteilleId  : 0,
        imageDesc  : "",
        imageUrl  : ""
      }
      setNewImageState(newState)
    }
    const updImageId = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newState: oneBouteilleImage = {
        bouteilleImageId  : Number(e.target.value),
        bouteilleId  : newImageState.bouteilleId,
        imageDesc  : newImageState.imageDesc,
        imageUrl  : newImageState.imageUrl
      }
      setNewImageState(newState)
    }
    const updImageDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newState: oneBouteilleImage = {
        bouteilleImageId  : newImageState.bouteilleImageId,
        bouteilleId  : newImageState.bouteilleId,
        imageDesc  : e.target.value,
        imageUrl  : newImageState.imageUrl
      }
      setNewImageState(newState)
    }
    const updImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newState: oneBouteilleImage = {
        bouteilleImageId  : newImageState.bouteilleImageId,
        bouteilleId  : newImageState.bouteilleId,
        imageDesc  : newImageState.imageDesc,
        imageUrl  : e.target.value
      }
      setNewImageState(newState)
    }
    useEffect(() => {
        initState()
    }, [])
    
    return (
//    <Modal show={props.item.show} onHide={handleClose}>
      <>
    <Modal
      size="lg"
      show={props.show}
      onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout d'une image de bouteille</Modal.Title>
        </Modal.Header>
          <Form>
            <Row>
               <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
                <Col sm={1} lg={1}></Col>
                <Form.Label  column sm={4}>N° d'image *</Form.Label>
                <Col sm={6} lg={2}>
                  <Form.Control type="number" value={newImageState.bouteilleImageId} required
                    onChange={updImageId}/>
                </Col>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
                <Col sm={1} lg={1}></Col>
                <Form.Label  column sm={4}>URL *</Form.Label>
                <Col sm={6} lg={6}>
                  <Form.Control type="text" value={newImageState.imageUrl} required
                    onChange={updImageUrl}/>
                </Col>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
                <Col sm={1} lg={1}></Col>
                <Form.Label  column sm={4}>Description *</Form.Label>
                <Col sm={6} lg={6}>
                  <Form.Control type="text" value={newImageState.imageDesc} required
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
                <Button variant="primary" onClick={handleOk}>OK</Button>
              </Col>
            </Row>
            <Row>
              <Col sm={5}>
                <Card><Card.Img src={newImageState.imageUrl} variant="top"></Card.Img></Card>
              </Col>
            </Row>
      </Modal>
      </>
    )
}