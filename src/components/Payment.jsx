import { Button, Form, Container, Row, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { useSelector, useDispatch } from "react-redux"
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { resetCart } from "../slices/cart/cartSlice";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()

    const { cart, totalAmount } = useSelector((state) => state.cartSlice);
    const email = useSelector((state) => state.usersSlice.email)

    const [isCharging, setIsCharging] = useState(false)


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

    const sendPurchase = async (id) => {

        setIsCharging(true)
        const body = {
            id: id,
            amount: totalAmount,
            email: email
        }
        try {
            const res = await fetch(
                `${process.env.REACT_APP_SERVER}users/purchase`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );
            if (res.ok) setIsCharging(false)
        } catch (error) {
            console.log(error);
        }

    }

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
            const { id } = paymentMethod

            await sendPurchase(id)
            dispatch(resetCart())
            notifyOk("Purchase completed successfully! check your mail") //not displaying
            setTimeout(() => navigate("/home"), 4000)

        } else console.log(error)
    };

    return (
        <>
            
            <Form onSubmit={handleSubmit} className="card w-50 p-4">
                {<p>Amount to pay: <b>{totalAmount} €</b></p>}
                <Form.Group>
                    <CardElement className="form-control" />
                </Form.Group>
                <Button variant="success" type="submit" disabled={!stripe || !elements}>
                    Pay
                </Button>
                <Button variant="danger" onClick={() => navigate("/resume")}>Cancel</Button>
            </Form>
            {isCharging && <Spinner animation="border" variant="success" className="position-absolute" />}

        </>
    );
};
const stripePromise = loadStripe('pk_test_51M7N28L6wRylHOkEIZqRROabOb52Tnb7aL1cOEDgTXnpVBqOI6g0Qx58t4qQAyNkmtNMSMh56VnYleYQ847luNTi00k8qYmCNh');

const Payment = () => (
    <Elements stripe={stripePromise}>
        <Container className="mt-4">
            <Row>
                <div className="d-flex justify-content-center w-100">
                    <CheckoutForm />

                </div>
            </Row>
        </Container>
    </Elements>
);


export default Payment

