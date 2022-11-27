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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetCart } from "../slices/cart/cartSlice";
// import MyNavbar from "./MyNavbar";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cartSlice.cart);

    const dispatch = useDispatch()

    const notifyOk = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


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
            notifyOk("Purchase completed successfully!")
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

