import { Modal, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart } from "../slices/cart/cartSlice";


const CartModal = ({ handleClose, show }) => {
    const cart = useSelector((state) => state.cartSlice.cart);
    const dispatch = useDispatch();

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>CART</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {cart.map((element) => {
                    return (
                        <div className="" key={element._id}>
                            <span >{element.title} </span>
                            <i className="bi bi-pencil pointer" onClick></i>{/* this is wrong, have to be + and - */}
                            {/* display each items quantity */}
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