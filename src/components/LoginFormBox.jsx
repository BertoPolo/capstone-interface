import { Container, Form, Button, Col, Row, Spinner, Image } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import { useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';
import { changeIsLogged, addName, addUserName, addAddress, addEmail, addIsAdmin, changeToken } from "../slices/users/usersSlice"
import { resetCart } from "../slices/cart/cartSlice";

const FormBox = () => {
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [isCharging, setIsCharging] = useState(false)
  const [isError, setIsError] = useState(false)

  const { name, token } = useSelector((state) => state.usersSlice);
  const cart = useSelector((state) => state.cartSlice.cart);

  const btnRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const notifyError = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  })
  const notifyOk = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const ableBtn = e => {
    if (btnRef.current) {
      btnRef.current.removeAttribute("disabled");
    }
  }

  const logIn = async (tok) => {

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}users/username/${usernameInput}`,
        {
          headers: {
            "Authorization": "Bearer " + tok
          },
        });

      if (res.ok) {
        const data = await res.json()
        dispatch(addName(data.name))
        dispatch(addUserName(data.username))
        dispatch(addAddress(data.address))
        dispatch(addEmail(data.email))
        dispatch(addIsAdmin(data.isAdmin))
        dispatch(changeIsLogged(true))
        dispatch(resetCart()) // change when cart and user are linked
        setIsCharging(false)


        notifyOk(`Welcome ${data.name}!`)
        navigate("/home")

      } else {
        notifyError("Check your credentials again")
        ableBtn()
        setIsCharging(false)
      }
    } catch (error) {
      console.log(error)
      setIsCharging(false)
      notifyError("An error occurred while logging in");
      ableBtn();
    }
  }


  const createToken = async (e) => {
    e.preventDefault()
    btnRef.current.setAttribute("disabled", "disabled");
    setIsCharging(true)
    try {

      const body = {
        username: usernameInput,
        password: passwordInput
      }

      const response = await fetch(`${process.env.REACT_APP_SERVER}users/login`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),

      });

      if (response.ok) {
        const data = await response.json()
        dispatch(changeToken(data.accessToken))
        logIn(data.accessToken)

      } else {
        notifyError("Check your credentials again")
        ableBtn()
        setIsCharging(false)
        setIsError(true)
        setTimeout(() => setIsError(false), 3000)
      }

    } catch (error) {
      console.log(error)
      notifyError("An error from server side occurred while logging in");
      ableBtn()
      setIsCharging(false)
      setIsError(true)
      setTimeout(() => setIsError(false), 3000)
    }

  }

  return (
    <>
      <Form className="login-container" onSubmit={createToken}>
        <div className="login-modal">

          <h3 className="mb-3 d-flex">Welcome back 👋</h3> {/* is SEO ok? */}

          <p className="d-flex m-0">Saddle up!</p>
          <p className="d-flex justify-content-start ">Your moto essentials are just a login away.</p>
          <Form.Group>
            <div className="d-flex"><Form.Label>Username</Form.Label></div>
            <Form.Control type="text" placeholder="JohnDoe123" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <div className="d-flex"><Form.Label>Password</Form.Label></div>
            <Form.Control type="password" placeholder="****" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
          </Form.Group>

          {/* <Form.Group>
                  <Form.Check type="checkbox" label="Remember me" className="login-small-font" onClick={() => setIsRemember(!isRemember)} />
                </Form.Group> */}

          <div className="text-center">
            <div className="my-2 d-flex justify-content-end">
              <Link className="login-small-font d-block mb-1" to="/forgotPassword">
                <small className="text-red">Forgot password?</small>
              </Link>
            </div>

            <Button className="addToCartButton border-0" type="submit" ref={btnRef} disabled={(!usernameInput) || (!passwordInput)} >
              Login
            </Button>

            <small className="d-flex justify-content-center my-3">Aren't you registered yet?
              <Link className="login-small-font d-block ml-1" to="/register">
                Join Us!
              </Link>
            </small>
            <small className="d-flex justify-content-center my-3">
              <Link className="login-small-font d-block mb-3" to="/home">
                Take a look without login
              </Link>
            </small>

            <small className="text-muted login-small-font">© 2023 ALL RIGHTS RESERVED</small>
          </div>
        </div >
        {isCharging && <Spinner className="position-absolute" animation="border" variant="success" />}
        {isError && <Spinner className="position-absolute" animation="grow" variant="danger" />}
      </Form >
    </>
  )
}

export default FormBox