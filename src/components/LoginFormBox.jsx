import { Container, Form, Button, Col, Row, Spinner, Image } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import { useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';
import { changeIsLogged, addName, addUserName, addAdress, addEmail, addIsAdmin, changeToken } from "../slices/users/usersSlice"
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
        dispatch(addAdress(data.adress))
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
    }

  }

  return (
    <>
      <Form className="login-container" onSubmit={createToken}>
        <div className="login-modal">

          <h4 className="mb-3">Login </h4>
          <Form.Group>
            <Form.Control type="text" placeholder="Username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Control type="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
          </Form.Group>

          {/* <Form.Group>
                  <Form.Check type="checkbox" label="Remember me" className="login-small-font" onClick={() => setIsRemember(!isRemember)} />
                </Form.Group> */}

          <Button variant="primary" type="submit" ref={btnRef} disabled={(!usernameInput) || (!passwordInput)} >
            Enter
          </Button>

          <Link className="login-small-font d-block mb-3 mt-3" to="/forgotPassword">
            <b className="text-danger"> Forgot the password?</b>
          </Link>

          <Link className="login-small-font d-block" to="/newUser">
            <b> Join Us!</b>
          </Link>
        </div>
        {isCharging && <Spinner className="position-absolute" animation="border" variant="success" />}
        {isError && <Spinner className="position-absolute" animation="grow" variant="danger" />}
      </Form>





    </>
  )
}

export default FormBox