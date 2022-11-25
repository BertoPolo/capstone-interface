import { Button, Form, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { loadStripe } from '@stripe/stripe-js';
import { useSelector, useDispatch } from "react-redux"
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { resetCart } from "../slices/cart/cartSlice";
// import MyNavbar from "./MyNavbar";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cartSlice.cart);

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (elements == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),

        });
        if (!error) {
            console.log(paymentMethod)
            dispatch(resetCart())
            navigate("/home")
        } else console.log(error)
    };

    return (
        <>
            {/* <MyNavbar /> */}
            <Form onSubmit={handleSubmit} className="card w-50 p-4">
                <Form.Group>
                    <CardElement className="form-control" />
                </Form.Group>
                <Button variant="success" type="submit" disabled={!stripe || !elements}>
                    Pay
                </Button>
                <Button variant="danger" onClick={() => navigate("/resume")}>Cancel</Button>
            </Form>
        </>
    );
};
const stripePromise = loadStripe('pk_test_51M7N28L6wRylHOkEIZqRROabOb52Tnb7aL1cOEDgTXnpVBqOI6g0Qx58t4qQAyNkmtNMSMh56VnYleYQ847luNTi00k8qYmCNh');

const Payment = () => (
    <Elements stripe={stripePromise}>
        <Container className="mt-4">
            <Row>
                <Col className="d-flex justify-content-center">
                    <CheckoutForm />

                </Col>
            </Row>
        </Container>
    </Elements>
);


export default Payment

// import { Button, Dropdown, Container, Form, Col, Row } from "react-bootstrap"
// import { useSelector, useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom";
// import { loadStripe } from '@stripe/stripe-js';
// import {
//     CardElement,
//     Elements,
//     useStripe,
//     useElements,
// } from '@stripe/react-stripe-js';
// import MyNavbar from "./MyNavbar"




// const Payment = () => {

//     // show user adress
//     // button to go to change adress

//     //form to pay
//     //after payment clean cart


//     return (
//         <>
//             <MyNavbar />

//             <Container>
//                 <h2>Payment station</h2>

//                 <p>shipment info . name and adress</p>
//                 <p>total amount</p>
//                 {/* when payed => show some pay ID and show a button to go /home */}
//                 <Form>
//                     <Form.Group>
//                         <Form.Label>card number</Form.Label>
//                         <Form.Control type="text" placeholder="" />
//                     </Form.Group>

//                     <Row>
//                         <Form.Group as={Col}>
//                             <Form.Label>expire month</Form.Label>
//                             <Form.Control className="w-25" type="number" placeholder="" />
//                         </Form.Group>

//                         {/* <span>/</span> */}
//                         <Form.Group as={Col} >
//                             <Form.Label>expire year</Form.Label>
//                             <Form.Control className="w-25" type="number" placeholder="" />
//                         </Form.Group>

//                         <Form.Group as={Col} >
//                             <Form.Label>CVV</Form.Label>
//                             <Form.Control className="w-25" type="number" placeholder="" />
//                         </Form.Group>
//                     </Row>

//                     <Button variant="success">Pay</Button>
//                     <Button variant="danger">Cancel</Button>
//                 </Form>

//             </Container>
//         </>


//     )

// }

// export default Payment