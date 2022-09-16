import { Modal, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart } from "../slices/cart/cartSlice";


const CartModal = ({ handleClose, show }) => {
    // const cart = useSelector((state) => state.cartSlice.cart);
    const items = useSelector((state) => state.itemsSlice.items); // just to try.then delete it
    const dispatch = useDispatch();

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
                            <i className="bi bi-pencil pointer" onClick></i>
                            <i className="bi bi-trash3 pointer" onClick={dispatch(removeFromCart(element))}></i>
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