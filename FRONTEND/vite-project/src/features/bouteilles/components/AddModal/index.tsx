import { Modal, Button, Row, Col, Form, Card } from  "react-bootstrap"
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
      props.addOkState(newImage)
    }
    let newImage: oneBouteilleImage = {
      bouteilleImageId  : 0,
      bouteilleId  : 0,
      imageDesc  : "",
      imageUrl  : ""
    } 
    return (
//    <Modal show={props.item.show} onHide={handleClose}>
      <>
    <Modal
      size="lg"
      show={props.show}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout d'une image de bouteille</Modal.Title>
        </Modal.Header>
          <Form>
            <Row>
               <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
                <Col sm={1} lg={1}></Col>
                <Form.Label  column sm={4}>N° d'image *</Form.Label>
                <Col sm={6} lg={1}>
                  <Form.Control type="number" value={newImage.bouteilleImageId} required/>
                </Col>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
                <Col sm={1} lg={1}></Col>
                <Form.Label  column sm={4}>URL *</Form.Label>
                <Col sm={6} lg={6}>
                  <Form.Control type="text" value={newImage.imageUrl} required/>
                </Col>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Row} className="mb-1 text-end" controlId="formHorizontalEmail">
                <Col sm={1} lg={1}></Col>
                <Form.Label  column sm={4}>Description *</Form.Label>
                <Col sm={6} lg={6}>
                  <Form.Control type="text" value={newImage.imageDesc} required/>
                </Col>
              </Form.Group>
            </Row>
          </Form>
             <Row>
              <Col sm={1} lg={1}>
                <Button variant="secondary" onClick={handleCancel}>Abandon</Button>
              </Col>
              <Col sm={1} lg={1}></Col>
              <Col sm={1} lg={1}>
                <Button variant="primary" onClick={handleOk}>OK</Button>
              </Col>
            </Row>
            <Row>
              <Card>
                <Card.Img src={newImage.imageUrl} variant="top"></Card.Img>
              </Card>
            </Row>
      </Modal>
      </>
    )
}