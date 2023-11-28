import { Container, Row } from "react-bootstrap"
import React, { Suspense } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const LazyCheckoutForm = React.lazy(() => import('./Payment_CheckOutForm'));


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = () => (
    <Elements stripe={stripePromise}>
        <Container className="mt-4">
            <Row>
                <div className="d-flex justify-content-center w-100">
                    <Suspense fallback={<div>Loading...</div>}>
                        <LazyCheckoutForm />
                    </Suspense>

                </div>
            </Row>
        </Container>
    </Elements>
);


export default Payment

