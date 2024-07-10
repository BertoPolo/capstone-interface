import { Button, Form, Spinner, Container, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { resetCart } from "../slices/cart/cartSlice";

const CheckOutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()

    const { cart, totalAmount } = useSelector((state) => state.cartSlice);
    const email = useSelector((state) => state.usersSlice.email)

    const [isCharging, setIsCharging] = useState(false)

    const dispatch = useDispatch()

    const notifyOk = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 2000,
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
        <Container className="d-flex justify-content-center mt-5">
            <Card className="w-100 p-4 shadow-sm" style={{ maxWidth: '500px' }}>
                <Form onSubmit={handleSubmit}>
                    <h4 className="mb-3">Payment Details</h4>
                    <p>Amount to pay: <b>{totalAmount} €</b></p>
                    <Form.Group className="mb-3">
                        <CardElement className="form-control p-2" />
                    </Form.Group>

                    <div className="d-flex justify-content-around">
                        <Button variant="success" type="submit" disabled={!stripe || !elements}>
                            Pay
                        </Button>
                        <Button variant="danger" onClick={() => navigate("/resume")}>
                            Cancel
                        </Button>
                    </div>
                </Form>
                {isCharging && <Spinner animation="border" variant="success" className="position-absolute" />}
            </Card>
        </Container>
    );
};
export default CheckOutForm