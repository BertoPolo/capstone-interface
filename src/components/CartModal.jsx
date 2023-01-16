import { Modal, Button, Dropdown } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { removeItem, setItemsQuantity } from "../slices/cart/cartSlice";


const CartModal = ({ handleClose, show }) => {
    const cart = useSelector((state) => state.cartSlice.cart);
    const isLogged = useSelector((state) => state.usersSlice.isLogged);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    let totalCartAmount = 0
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>CART</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {cart.map((element) => {
                    totalCartAmount += element.price * element.quantity

                    return (
                        <div key={element._id} className="d-flex justify-content-between">
                            <span ><b>{element.title}</b></span>
                            <div className="d-flex">
                                <span className="mr-3"> {element.price}€</span>

                                <Dropdown>
                                    <Dropdown.Toggle size="sm" variant="outline-dark" id="dropdown-basic">
                                        {element.quantity}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => { dispatch(setItemsQuantity([element._id, 1])); }}>1</Dropdown.Item>
                                        <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 2]))}>2</Dropdown.Item>
                                        <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 3]))}>3</Dropdown.Item>
                                        <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 4]))}>4</Dropdown.Item>
                                        <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 5]))}>5</Dropdown.Item>
                                        <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 6]))}>6</Dropdown.Item>
                                        <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 7]))}>7</Dropdown.Item>
                                        <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 8]))}>8</Dropdown.Item>
                                        <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 9]))}>9</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <i className="bi bi-trash3 pointer ml-3" onClick={() => dispatch(removeItem(element._id))}></i>
                            </div>
                        </div>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <u className="mr-auto">{totalCartAmount.toFixed(2)}€</u>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {isLogged ? <Button className="submitButton" disabled={cart.length === 0} onClick={() => { handleClose(); navigate("/resume") }}>
                    Finish your shopping
                </Button> : <Button variant="warning" onClick={() => { handleClose(); navigate("/") }}>
                    Go login first
                </Button>}
            </Modal.Footer>
        </Modal >
    )
}

export default CartModal