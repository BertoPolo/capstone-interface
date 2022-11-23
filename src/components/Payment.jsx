import { Button, Form } from "react-bootstrap"
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const Payment = () => {

    const CheckoutForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async (event) => {
            event.preventDefault();

            if (elements == null) {
                return;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });
        };
        const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

        const App = () => (
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        );
        return (
            <Form onSubmit={handleSubmit}>
                <CardElement />
                <Button type="submit" disabled={!stripe || !elements}>
                    Pay
                </Button>
            </Form>
        );
    };


}
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