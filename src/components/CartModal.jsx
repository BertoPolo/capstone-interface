import { Modal, Button } from "react-bootstrap"
import { useSelector } from "react-redux"


const CartModal = (handleClose, show) => {
    // const cart = useSelector((state) => state.cartSlice.cart);
    const items = useSelector((state) => state.itemsSlice.items); // just to try.then delete it

    console.log(show)
    return (
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
    )
}

export default CartModal