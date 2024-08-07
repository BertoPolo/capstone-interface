import { Container, Row, Col } from "react-bootstrap"
import React, { Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const LazyCheckoutForm = React.lazy(() => import('./Payment_CheckOutForm'));



const Payment = () => {
    const [stripeLoaded, setStripeLoaded] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/payment") {
            setStripeLoaded(true);
        }
    }, [location]);

    let stripePromise;
    if (stripeLoaded) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    }

    return (

        <>
            {stripeLoaded && (
                <Elements stripe={stripePromise}>
                    <Container className="mt-5">
                        <Row className="justify-content-center">
                            <Col xs={12} md={8} lg={6}>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <LazyCheckoutForm />
                                </Suspense>
                            </Col>
                        </Row>
                    </Container>
                </Elements>
            )}
        </>
    )
};


export default Payment

