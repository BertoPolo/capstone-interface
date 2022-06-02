import { Form, Button } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

const Login = () => {
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [isRemember, setIsRemember] = useState(false)

  const navigate = useNavigate()
  const handleSubmit = () => {
    navigate("/home")
  }

  return (
    <Form className="login-container">
      <div className="login-modal">
        <h4 className="mb-3">Login</h4>
        <Form.Group>
          <Form.Control type="text" placeholder="Username" onChange={(e) => setUsernameInput(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordInput(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Check type="checkbox" label="Remember me" className="login-small-font" onClick={() => setIsRemember(!isRemember)} />
        </Form.Group>
        <Link className="login-small-font d-block mb-3" to="/forgotPassword">
          <b> Forgot the password?</b>
        </Link>

        {usernameInput && passwordInput ? (
          <Button variant="primary" onClick={() => handleSubmit()}>
            Enter
          </Button>
        ) : (
          <Button variant="secondary" disabled>
            Enter
          </Button>
        )}
      </div>
      <Link className="login-small-font d-block mb-3 mt-2" to="/newUser">
        <b> Not registered yet?</b>
      </Link>
    </Form>
  )
}

export default Login
