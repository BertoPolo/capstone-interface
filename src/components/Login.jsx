/** @format */

import { Form, Button, Col, Row } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeIsLogged } from "../slices/users/usersSlice"


const Login = () => {
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [isRemember, setIsRemember] = useState(false)
  const isLogged = useSelector((state) => state.usersSlice.isLogged);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = () => {
    dispatch(changeIsLogged(true))
    navigate("/home")
  }

  return (
    <>
      <h1 className="h1">Stuff to Route</h1>
      <Row>
        <Col className="login-container">
          <p> Aren't You registered yet?</p>
          <Button onClick={() => navigate("/home")}>Click here to enter without login</Button>
        </Col>

        <Col>
          <Form className="login-container" onSubmit={handleSubmit}>
            <div className="login-modal">
              <h4 className="mb-3">Login</h4>
              <Form.Group>
                <Form.Control type="text" placeholder="Username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Control type="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Check type="checkbox" label="Remember me" className="login-small-font" onClick={() => setIsRemember(!isRemember)} />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={(!usernameInput) || (!passwordInput)} >
                Enter
              </Button>

              <Link className="login-small-font d-block mb-3 mt-3" to="/forgotPassword">
                <b> Forgot the password?</b>
              </Link>

              <Link className="login-small-font d-block" to="/newUser">
                <b> Join Us!</b>
              </Link>

            </div>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default Login
