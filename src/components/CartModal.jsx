import { Modal, Button, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItem, setItemsQuantity } from "../slices/cart/cartSlice";

const CartModal = ({ handleClose, show }) => {
    const cart = useSelector((state) => state.cartSlice.cart);
    const isLogged = useSelector((state) => state.usersSlice.isLogged);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let totalCartAmount = 0;
    return (
        <Modal show={show} onHide={handleClose}>
            <div className="cartModal">
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>

                <Modal.Body className="cartText">
                    {cart.map((element) => {
                        totalCartAmount += element.price * element.quantity;
                        return (
                            <div key={element._id} className="cart-item">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>{element.title}</span>
                                    <div className="d-flex align-items-center">
                                        <span className="mx-3">{element.price}€</span>

                                        <Dropdown>
                                            <Dropdown.Toggle size="sm" variant="outline-dark" id="dropdown-basic">
                                                {element.quantity}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {[...Array(9).keys()].map(i => (
                                                    <Dropdown.Item key={i + 1} onClick={() => dispatch(setItemsQuantity([element._id, i + 1]))}>
                                                        {i + 1}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <i className="bi bi-trash3 pointer ml-3 text-danger" onClick={() => dispatch(removeItem(element._id))}></i>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        );
                    })}
                    <div className="d-flex justify-content-between mt-3 totalCart">
                        <span>Total</span>
                        <span>{totalCartAmount.toFixed(2)}€</span>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        {isLogged ? (
                            <Button className="submitButton fourteen-font" disabled={cart.length === 0} onClick={() => { handleClose(); navigate("/resume"); }}>
                                Go to checkout
                            </Button>
                        ) : (
                            <Button variant="warning" onClick={() => { handleClose(); navigate("/"); }}>
                                Go login first
                            </Button>
                        )}
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default CartModal;
