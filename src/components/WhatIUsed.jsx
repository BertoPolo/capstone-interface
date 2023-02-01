import { Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const WhatIUsed = () => {

    const navigate = useNavigate()

    return (

        <Container>

            <h4 className="mt-5"><b>Frontend</b></h4>
            <ul>
                <li>Javascript</li>
                <li>ReactJs</li>
                <li>Redux</li>
                <li>Bootstrap</li>
                <br />
                <li>Redux-persist</li>

            </ul>
            <hr />
            <h4><b>Backend</b></h4>
            <ul>
                <li>Javascript</li>
                <li>ExpressJs</li>
                <li>Cors</li>
                <li>Mongoose</li>
                <br />
                <li>Swagger</li>
                <li>Stripe</li>
                <li>JsonWebToken</li>
                <li>Nodemailer</li>
            </ul>

            <Button className="mt-3" variant="danger" onClick={() => navigate("/home")}>Go back</Button >

        </Container>
    )
}

export default WhatIUsed