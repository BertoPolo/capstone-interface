import { Form, Button } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"

//TODO
//disable button if username is empty

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
        <p className="login-small-font">Forgot the password?</p>

        {usernameInput && passwordInput ? (
          <Button variant="primary" type="submit" onClick={() => handleSubmit}>
            Enter
          </Button>
        ) : (
          <Button variant="secondary" type="submit" disabled>
            Enter
          </Button>
        )}
      </div>
    </Form>
  )
}

export default Login
