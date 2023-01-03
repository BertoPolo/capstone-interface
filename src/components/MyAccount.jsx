import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import MyNavbar from "./MyNavbar"
import { changeIsLogged, addName, addUserName, addAdress, addEmail, addIsAdmin, changeToken } from "../slices/users/usersSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyAccount = () => {
  const navigate = useNavigate("")
  const dispatch = useDispatch()

  const { name, username, adress, email, token } = useSelector((state) => state.usersSlice);

  const [nameInput, setNameInput] = useState(name)
  const [userNameInput, setUserNameInput] = useState(username)
  const [emailInput, setEmailInput] = useState(email)
  const [adressInput, setAdressInput] = useState(adress)
  const [passwordInput, setPasswordInput] = useState("")
  const [passwordAgainInput, setPasswordAgainInput] = useState("")

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


  const changeData = async (e) => {
    e.preventDefault()

    let body = {
      name: nameInput,
      username: userNameInput,
      email: emailInput,
      adress: adressInput,
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}users/me/data`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token

          },

          body: JSON.stringify(body),
        }
      );
      if (res.ok) {
        navigate("/home")
        dispatch(addName(nameInput))
        dispatch(addUserName(userNameInput))
        dispatch(addAdress(adressInput))
        dispatch(addEmail(emailInput))

      }

    } catch (error) {
      console.log(error)
    }

  }


  const changePass = async (e) => {
    e.preventDefault()
    if (passwordInput === passwordAgainInput) {
      let body = {
        password: passwordInput,
      }

      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER}users/me/password`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token

            },

            body: JSON.stringify(body),
          }
        );
        if (res.ok) {
          navigate("/")
          dispatch(addName(nameInput))
          dispatch(addUserName(userNameInput))
          dispatch(addAdress(adressInput))
          dispatch(addEmail(emailInput))
          // empty user and set login to off

        }

      } catch (error) {
        console.log(error)
      }

    } else notifyError("both password input have to be the same")

  }



  return (
    <>
      {/* Toast */}
      < ToastContainer position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />

      <Container fluid className="myAccountBg ">
        <MyNavbar />

        <div className="login-container">

          {/* Data Form */}
          <Form className=" transparency-box p-4 mt-4" onSubmit={(e) => changeData(e)}>
            <h4 className="mb-3">Modify your data</h4>

            {<Form.Group>
              <Form.Control type="text" placeholder="Full Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
            </Form.Group>}

            <Form.Group>
              <Form.Control type="text" placeholder="User name" value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
            </Form.Group>

            {<Form.Group>
              <Form.Control type="text" placeholder="Shipping Adress" value={adressInput} onChange={(e) => setAdressInput(e.target.value)} />
            </Form.Group>}

            <div className="d-flex justify-content-between">
              <Button className="submitButton" type="submit"> Submit </Button>
              <Button className="ml-3 buttonBack" onClick={() => navigate("/home")}>Back</Button>
            </div>
          </Form>

          {/* password form */}
          <Form className=" transparency-box p-4 mt-4" onSubmit={(e) => changePass(e)}>

            <Form.Group>
              <Form.Control type="password" required placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                required
                placeholder="Repeat your new password"
                value={passwordAgainInput}
                onChange={(e) => setPasswordAgainInput(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button type="submit" className="submitButton" disabled={(passwordInput !== passwordAgainInput) || (!passwordInput || !passwordAgainInput)} > Submit </Button>
              <Button className="buttonBack" onClick={() => navigate("/home")}>Back</Button>
            </div>
          </Form>

        </div>

      </Container>
    </>
  )
}

export default MyAccount
