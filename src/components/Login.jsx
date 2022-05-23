import { Form, Button } from "react-bootstrap"
// import { Navigate, useNavigate } from "react-router-dom"

//TODO
//disable button if username is empty

const Login = () => {
  // const navigate = useNavigate()
  // const handleSubmit = () => {
  //   navigate("/home")
  // }

  return (
    <Form className="login-container">
      <div className="login-modal">
        <h4 className="mb-3">Login</h4>
        <Form.Group>
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>

        <Form.Group>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group>
          <Form.Check type="checkbox" label="Remember me" className="login-small-font" />
        </Form.Group>
        <p className="login-small-font">Forgot the password?</p>

        <Button variant="primary" type="submit">
          Enter
        </Button>
      </div>
    </Form>
  )
}

export default Login
