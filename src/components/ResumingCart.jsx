import { Modal, Button, Dropdown, Container, Row, Col, Image } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import MyNavbar from "./MyNavbar"


const ResumingCart = () => {

    const cart = useSelector((state) => state.cartSlice.cart);
    const dispatch = useDispatch();

    let totalAmount

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
                        totalAmount += element.price * element.quantity

                        return (
                            <>


                                <Col xs={2} ><Image style={{ width: "50%" }} src={element.image}></Image></Col>
                                <Col xs={4}><span>{element.title}<span>ref:</span>{element._id}</span></Col>
                                <Col ><span>{element.price}</span></Col>
                                <Col xs={2}><span>  <Dropdown>
                                    <Dropdown.Toggle size="sm" variant="outline-dark" id="dropdown-basic">
                                        {element.quantity}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {/* <Dropdown.Item onClick={() => { dispatch(setItemsQuantity([element._id, 1])); }}>1</Dropdown.Item>
                                            <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 2]))}>2</Dropdown.Item>
                                            <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 3]))}>3</Dropdown.Item>
                                            <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 4]))}>4</Dropdown.Item>
                                            <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 5]))}>5</Dropdown.Item>
                                            <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 6]))}>6</Dropdown.Item>
                                            <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 7]))}>7</Dropdown.Item>
                                            <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 8]))}>8</Dropdown.Item>
                                            <Dropdown.Item onClick={() => dispatch(setItemsQuantity([element._id, 9]))}>9</Dropdown.Item> */}
                                    </Dropdown.Menu>
                                </Dropdown></span></Col>
                                <Col xs={1}><span><i className="bi bi-trash3-fill pointer"></i></span></Col>
                                <Col ><span>{element.price * element.quantity}</span></Col>

                            </>
                        )
                    })}

                </Row>
            </Container>

        </>
    )
}
export default ResumingCart