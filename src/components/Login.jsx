import { Container, Form, Button, Col, Row } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { changeIsLogged, addName, addUserName, addAdress, addEmail, addIsAdmin, changeToken } from "../slices/users/usersSlice"
import { getToken } from "../slices/users/usersSlice"

const Login = () => {
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  // const [isRemember, setIsRemember] = useState(false)

  const { name, token } = useSelector((state) => state.usersSlice);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useEffect(() => {
  //   getToken()

  // }, [])


  const notifyError = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  })
  const notifyOk = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const body = {
        username: usernameInput,
        password: passwordInput
      }
      const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}users/login`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),

      });

      if (response.ok) {
        const tok = await response.json()
        dispatch(changeToken(tok.accessToken))

        const res = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}users/username/${usernameInput}`,
          {
            headers: {
              "Authorization": "Bearer " + token
            },
          });
        if (res.ok) {
          const data = await res.json()
          dispatch(addName(data.name))
          dispatch(addUserName(data.username))
          dispatch(addAdress(data.adress))
          dispatch(addEmail(data.email))
          dispatch(addIsAdmin(data.isAdmin))
          dispatch(changeIsLogged(true))
          navigate("/home")

          notifyOk(`Welcome! ${name}`) // this is not displaying
        }
      } else notifyError("Check your credentials again")
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <Container fluid>

      {/* Toast */}
      <ToastContainer position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />

      <h1 className="h1">Stuff to Route</h1>
      <Row>
        <Col className="login-container loginBG">
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

              {/* <Form.Group>
                <Form.Check type="checkbox" label="Remember me" className="login-small-font" onClick={() => setIsRemember(!isRemember)} />
              </Form.Group> */}

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
    </Container>
  )
}

export default Login
