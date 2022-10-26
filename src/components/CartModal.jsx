import { Modal, Button, Dropdown } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { removeItem, setItemsQuantity } from "../slices/cart/cartSlice";


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
                        <div key={element._id} className="d-flex">
                            <span ><b>{element.title}</b> </span>
                            <Dropdown>
                                <Dropdown.Toggle size="sm" variant="outline-dark" id="dropdown-basic">
                                    {element.quantity} {/* use useEffect?  */}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => dispatch(setItemsQuantity(1))}>1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => dispatch(setItemsQuantity(2))}>2</Dropdown.Item>
                                    <Dropdown.Item onClick={() => dispatch(setItemsQuantity(3))}>3</Dropdown.Item>
                                    <Dropdown.Item onClick={() => dispatch(setItemsQuantity(4))}>4</Dropdown.Item>
                                    <Dropdown.Item onClick={() => dispatch(setItemsQuantity(5))}>5</Dropdown.Item>
                                    <Dropdown.Item onClick={() => dispatch(setItemsQuantity(6))}>6</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <i className="bi bi-trash3 pointer ml-3" onClick={() => dispatch(removeItem(element._id))}></i>
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
        </Modal >
    )
}

export default CartModal