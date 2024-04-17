import { Container, Button, Col, Row, Image } from "react-bootstrap"
import FormBox from "./LoginFormBox";

const Login = () => {


  return (
    <>
      {/*  REMOVE DUPLICATED CODE! */}

      {/* ONLY extra-small screens */}
      <Container fluid className="d-sm-none loginBG">
        <h1 className="h1XsScreen">Stuff to Route</h1>

        <div className="transparencywWhiteBox p-3 mt-5">
          <FormBox />
          {/* option for not registered users */}
        </div>

      </Container>

      {/* SINCE small screens */}
      <Container fluid className="d-none d-sm-block">
        <Row>
          {/* option for not registered users */}
          <Col className="d-flex flex-column">
            <Image className="mb-4 mt-2 ml-auto mr-auto " src="/assets/STR_LOGIN.avif" style={{ maxHeight: "20vh", maxWidth: "25vw" }} alt="Login Logo" />
            <FormBox />
          </Col>

          <Col className="login-container loginBG"></Col>
        </Row>
      </Container>

    </>)
}

export default Login
