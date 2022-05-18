import { Container, Row, Col, Form, Button } from "react-bootstrap"
// import { Navigate, useNavigate } from "react-router-dom"

//TODO
//disable button if username is empty
//center all
//forms=>smaller

const Login = () => {
  // const navigate = useNavigate()
  // const handleSubmit = () => {
  //   navigate("/")
  // }

  return (
    <Container>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>User name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enter
        </Button>
      </Form>
    </Container>
  )
}

export default Login
