import { Modal, Button, Dropdown, Container, Row, Col, Image } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import MyNavbar from "./MyNavbar"
import { setItemsQuantity, removeItem } from "../slices/cart/cartSlice";



const ResumingCart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cartSlice.cart);

    let totalCartAmount = 0

    return (
        <>
            <MyNavbar />
            <Container>
                <Row className="bg-primary d-flex justify-content-around">
                    <Col xs={2}><span>Product</span></Col>
                    <Col xs={4}><span>Description</span></Col>
                    <Col ><span>Unit price</span></Col>
                    <Col xs={2}><span>Quantity</span></Col>
                    <Col xs={1}><span></span></Col>
                    <Col ><span>Total</span></Col>

                </Row>
                <Row>
                    {cart.map(element => {
                        totalCartAmount += element.price * element.quantity

                        return (

                            <Container key={element._id} className="mt-2">
                                <Row >
                                    <Col xs={2} className="pr-0 d-flex justify-content-center" ><Image className="" style={{ width: "50%" }} src={element.image}></Image></Col>
                                    <Col xs={4} ><span>{element.title}<span> <br /> ref: </span>{element._id}</span></Col>
                                    <Col ><span>{element.price}</span></Col>
                                    <Col xs={2}><span>  <Dropdown>
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
                                    </Dropdown></span></Col>
                                    <Col xs={1}><span><i className="bi bi-trash3 pointer" onClick={() => dispatch(removeItem(element._id))}></i></span></Col>
                                    <Col ><span>{element.price * element.quantity}</span></Col>
                                </Row>
                            </Container>
                        )
                    })}
                    <Container className="d-flex justify-content-end mb-2">
                        <Row>
                            <p><b>TOTAL </b> {(totalCartAmount).toFixed(2)}€</p>
                        </Row>

                    </Container>

                </Row>
                <Row>
                    <Button variant="success" onClick={() => navigate("/payment")}>Pay station</Button>
                    <Button variant="danger" onClick={() => navigate("/home")}>Continue shopping</Button>
                </Row>
            </Container>

        </>
    )
}
export default ResumingCart