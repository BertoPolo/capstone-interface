import { Container, Col, Row } from "react-bootstrap"

const WhatIUsed = () => {


    return (

        <Container>

            <h4><b>Frontend</b></h4>
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
                <li>Bcrypt</li>
                <li>Stripe</li>
                <li>Jsonwebtoken</li>
                <li>Nodemailer</li>
                <li>Cloudinary</li>
            </ul>
        </Container>
    )
}

export default WhatIUsed