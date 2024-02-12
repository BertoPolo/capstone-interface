import { Container, Button, Form, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import MyNavbar from "./MyNavbar"
import { addName, addUserName, addAddress, addEmail, } from "../slices/users/usersSlice"
import { toast } from 'react-toastify';

const MyAccount = () => {
  const navigate = useNavigate("")
  const dispatch = useDispatch()

  const { name, username, address, email, token } = useSelector((state) => state.usersSlice);

  const [nameInput, setNameInput] = useState(name)
  const [userNameInput, setUserNameInput] = useState(username)
  const [emailInput, setEmailInput] = useState(email)
  const [addressInput, setAddressInput] = useState(address)
  const [passwordInput, setPasswordInput] = useState("")
  const [passwordAgainInput, setPasswordAgainInput] = useState("")

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

  const changeData = async (e) => {
    e.preventDefault()

    let body = {
      name: nameInput,
      username: userNameInput,
      email: emailInput,
      address: addressInput,
    }
    // if (passwordInput) body["password"] = passwordInput;  join backend or if password call changePassword()

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
        dispatch(addAddress(addressInput))
        dispatch(addEmail(emailInput))
        notifyOk("your data has been updated successfully")

      }

    } catch (error) {
      console.log(error)
    }

  }

  const changePassword = async (e) => {
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
          dispatch(addAddress(addressInput))
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
      <Container className="pt-4">

        <Row>
          <Col className="">

            {/* Data Form */}
            <Form className=" p-4 " onSubmit={(e) => changeData(e)}>
              <h4 className="my -3">Edit your profile</h4>

              <Row>
                <Col>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Thomas" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                </Col>

                <Col>
                  <Form.Label>User Name</Form.Label>
                  <Form.Control type="text" placeholder="Thomas_93" value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="thomas_bernard@gmail.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                </Col>

                <Col>
                  <Form.Label>Adress</Form.Label>
                  <Form.Control type="text" placeholder="21 Rue Rivoli" value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
                </Col>
              </Row>

              <div className="d-flex justify-content-between">
                <Button className="submitButton" type="submit"> Submit </Button>
                <Button className="ml-3 buttonBack" onClick={() => navigate("/home")}>Back</Button>
              </div>
            </Form>

            {/* password form */}
            <Form className=" transparency-box p-4 mt-4 rounded" onSubmit={(e) => changePassword(e)}>

              <Form.Group>
                <Form.Control type="password" required placeholder="New password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
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

          </Col>
          {/* right part with BG */}
          <Col>

            BackGround</Col>

        </Row>
      </Container>
    </>
  )
}

export default MyAccount
