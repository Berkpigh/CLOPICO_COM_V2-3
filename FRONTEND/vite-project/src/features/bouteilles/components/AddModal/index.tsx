import { Modal, Button, Row } from  "react-bootstrap"
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
    <Modal show={props.show}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
            C'est le foutoir
          <Row>
          <Button variant="secondary" onClick={handleCancel}>
            Abandon
          </Button>
          </Row>
          <Button variant="primary" onClick={handleOk}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}