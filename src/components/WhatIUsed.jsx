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
                <li>Redux-persist</li>
                <li>Bootstrap</li>

            </ul>

            <hr />

            <h4><b>Backend</b></h4>
            <ul>
                <li>Javascript</li>
                <li>ExpressJs</li>
                <li>Cors</li>
                <li>Mongoose</li>
                {/* <br /> */}
                <li >Swagger</li>
                <li>Stripe</li>
                <li>JsonWebToken</li>
                <li>Nodemailer</li>
            </ul>

            <hr />

            <h4><b>Code</b></h4>
            <ul>
                <a className="d-block" target="_blank" rel="noopener noreferrer" href="https://github.com/BertoPolo/capstone_backend">https://github.com/BertoPolo/capstone_backend </a>
                <a className="d-block" target="_blank" rel="noopener noreferrer" href=">https://github.com/BertoPolo/capstone-interface" >https://github.com/BertoPolo/capstone-interface</a>
            </ul>

            <Button className="mt-3" variant="danger" onClick={() => navigate("/home")}>Go back</Button >

        </Container>
    )
}

export default WhatIUsed