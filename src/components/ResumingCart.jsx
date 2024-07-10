import { Button, Dropdown, Container, Row, Col, Image } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import MyNavbar from "./MyNavbar"
import { setItemsQuantity, removeItem, setTotalAmount } from "../slices/cart/cartSlice";



const ResumingCart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cart, totalAmount } = useSelector((state) => state.cartSlice);

    let totalCartAmount = 0
    let shippingFees = 0

    return (
        <>
            <MyNavbar />
            <Container className="pt-4">
                <Row className="bg-resume d-flex justify-content-around">
                    <Col xs={2}><b>Product</b></Col>
                    <Col xs={4}><b>Description</b></Col>
                    <Col ><b>Price</b></Col>
                    <Col xs={2}><b>Quantity</b></Col>
                    <Col xs={1}><b></b></Col>
                    <Col><b>Subtotal</b></Col>

                </Row>
                <Row>
                    {cart.map(element => {
                        totalCartAmount += element.price * element.quantity

                        return (

                            <Container key={element._id} className="mt-2 bg-resume">
                                <Row >
                                    {/*Product img*/}  <Col xs={2} className="px-0 d-flex justify-content-center"><Image style={{ width: "40%" }} src={element.image}></Image></Col>
                                    {/*Description */} <Col xs={4}><span>{element.title}<p className="m-0 reference">{element._id}</p></span></Col>
                                    {/* Price*/}       {element.isOutlet ? <Col ><span>{element.outletPrice}€</span></Col> : <Col ><span>{element.price}€</span></Col>}
                                    {/* Quantity*/}    <Col xs={2}><span>  <Dropdown>
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
                                    </Dropdown></span></Col>
                                    {/* Delete icon*/}  <Col xs={1}><span><i className="bi bi-trash3 pointer bg-danger p-1 text-white rounded" onClick={() => dispatch(removeItem(element._id))}></i></span></Col>
                                    {/* Total  */} <Col ><span>{(element.price * element.quantity).toFixed(2)}</span></Col>
                                </Row>
                            </Container>
                        )
                    })}

                </Row>

                <Row className="mt-3">
                    <Button variant="outline-dark" onClick={() => navigate("/home")}>Continue shopping</Button>
                </Row>


                <Container className="d-flex flex-column mb-2 mt-4 p-4 border rounded" style={{ maxWidth: '300px', position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'white' }}>
                    <Row className="w-100">
                        <Col xs={6}>
                            <h6>Cart total</h6>
                        </Col>
                    </Row>
                    <hr className="w-100" />

                    <Row className="w-100">
                        <Col xs={6}>
                            <p>Subtotal</p>
                        </Col>
                        <Col xs={6} className="text-right">
                            <p>{totalCartAmount.toFixed(2)}€</p>
                        </Col>
                    </Row>
                    <hr className="w-100" />

                    <Row className="w-100">
                        <Col xs={6}>
                            <p>Shipping</p>
                        </Col>
                        <Col xs={6} className="text-right">
                            <p>{shippingFees === 0 ? "Free" : shippingFees + "€"}</p>
                        </Col>
                    </Row>
                    <hr className="w-100" />

                    <Row className="w-100">
                        <Col xs={6}>
                            <span className="softBolding">TOTAL</span>
                        </Col>
                        <Col xs={6} className="text-right">
                            <span className="softBolding">{(totalCartAmount + shippingFees).toFixed(2)}€</span>
                        </Col>
                    </Row>
                    <Button className="w-100 mt-3 submitButton" onClick={() => { navigate("/payment"); dispatch(setTotalAmount(totalCartAmount.toFixed(2))) }}>Checkout</Button>
                </Container>
            </Container>
        </>
    )
}
export default ResumingCart