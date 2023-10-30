import { Container, Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import MyNavbar from "./MyNavbar"
import { addName, addUserName, addAdress, addEmail, } from "../slices/users/usersSlice"
import { toast } from 'react-toastify';

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
        notifyOk("your data has been updated successfully")

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
          notifyOk("your password has been updated")
          // empty user and set login to off

        }

      } catch (error) {
        console.log(error)
      }

    } else notifyError("both password input have to be the same")

  }


  return (
    <>

      <MyNavbar />
      <Container fluid className="myAccountBg ">

        <div className="login-container">

          {/* Data Form */}
          <Form className=" transparency-box p-4 mt-4 rounded" onSubmit={(e) => changeData(e)}>
            <h4 className="mb-3">Modify your data</h4>

            {<Form.Group>
              <Form.Control type="text" placeholder="Full Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
            </Form.Group>}

            <Form.Group>
              <Form.Control type="text" placeholder="User name" value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Control type="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
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
          <Form className=" transparency-box p-4 mt-4 rounded" onSubmit={(e) => changePass(e)}>

            <Form.Group>
              <Form.Control type="password" required placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                required
                placeholder="Repeat your new pass"
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
