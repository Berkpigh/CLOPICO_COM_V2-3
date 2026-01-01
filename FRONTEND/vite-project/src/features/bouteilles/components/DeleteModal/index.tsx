import { Modal, Button, Row, Col, Form, Card } from  "react-bootstrap"
import { useState, useEffect } from "react"
import { oneBouteilleImage } from "../../models"

type DeleteModalProps = {
  show: boolean
  image: oneBouteilleImage
  deleteOkState: (id: number) => void
  deleteCancelState: () => void
}
export const DeleteModal = (props:DeleteModalProps) => {
    const handleCancel = () => {
      props.deleteCancelState()
    } 
    const handleOk = () => {
      props.deleteOkState(props.image.bouteilleImageId)
    }
    
    return (
//    <Modal show={props.item.show} onHide={handleClose}>
      <>
    <Modal
      size="lg"
      show={props.show}
      onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Suppression de cette image de bouteille</Modal.Title>
        </Modal.Header>
          <Form>
            <Row>
               <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
                <Col sm={1} lg={1}></Col>
                <Form.Label  column sm={4}>N° d'image *</Form.Label>
                <Col sm={6} lg={2}>
                  <Form.Control type="number" value={props.image.bouteilleImageId} readOnly/>
                </Col>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
                <Col sm={1} lg={1}></Col>
                <Form.Label  column sm={4}>URL *</Form.Label>
                <Col sm={6} lg={6}>
                  <Form.Control type="text" value={props.image.imageUrl} readOnly/>
                </Col>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
                <Col sm={1} lg={1}></Col>
                <Form.Label  column sm={4}>Description *</Form.Label>
                <Col sm={6} lg={6}>
                  <Form.Control type="text" value={props.image.imageDesc} readOnly/>
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
                <Card><Card.Img src={props.image.imageUrl} variant="top"></Card.Img></Card>
              </Col>
            </Row>
      </Modal>
      </>
    )
}
