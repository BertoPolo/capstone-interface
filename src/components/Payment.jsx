import { Modal, Button, Dropdown, Container, Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import Stripe from 'stripe';


const Payment = () => {

    // show user adress
    // button to go to change adress

    //form to pay

    const stripe = new Stripe('sk_test_...');

    (async () => {
        const customer = await stripe.customers.create({
            email: 'customer@example.com',
        });

        console.log(customer.id);
    })();

    return (
        <Container>
            <Form>
                <Form.Control>

                </Form.Control>
            </Form>

        </Container>

    )

}

export default Payment