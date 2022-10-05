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
                        <div key={element._id}>
                            <span >{element.title} </span>
                            <i className="bi bi-plus pointer"></i>
                            <span>quantity</span>
                            <i className="bi bi-dash-lg pointer"></i>
                            <i className="bi bi-trash3 pointer ml-3" onClick={() => dispatch(removeFromCart(element))}></i>
                        </div>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Finish your shopping
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CartModal