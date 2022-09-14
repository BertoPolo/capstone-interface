import { Modal, Button } from "react-bootstrap"

const CartModal = () => {
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>CART</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {items.map((element) => { //change  items for cart
                return (
                    <div className="">
                        <span key={element._id} >{element.title} </span>
                        <i className="bi bi-pencil pointer"></i>
                        <i className="bi bi-trash3 pointer"></i>
                    </div>
                )
            })}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
}

export default CartModal