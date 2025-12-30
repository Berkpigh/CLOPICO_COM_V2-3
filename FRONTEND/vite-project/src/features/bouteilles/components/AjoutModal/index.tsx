import { ajoutBouteilleImage } from "../../models"
import { Modal } from  "react-bootstrap"

type AjoutModalProps = {
    item: ajoutBouteilleImage
}
export const AjoutModal = (props:AjoutModalProps) => {
    return (
//    <Modal show={props.item.show} onHide={handleClose}>
    <Modal show={props.item.show}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
            C'est le foutoir
{/* 
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>

 */}        
        </Modal.Footer>
      </Modal>
    )
}