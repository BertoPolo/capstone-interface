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
    if (passwordInput) changePassword()

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

  const changePassword = async () => {
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
          <Col md={8} className="accountBoxShadow">

            {/* Data Form */}
            <Form className="py-4  pl-4 mr-2" onSubmit={(e) => changeData(e)}>
              <h4 >Edit your profile</h4>

              <Row className="mb-3">
                <Col>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control className="myAccountinputs" type="text" placeholder="Thomas" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                </Col>

                <Col>
                  <Form.Label>User Name</Form.Label>
                  <Form.Control className="myAccountinputs" type="text" placeholder="Thomas_93" value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
                </Col>
              </Row>

              <Row className="mt-3">

                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control className="myAccountinputs" type="email" placeholder="thomas_bernard@gmail.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                </Col>

                <Col>
                  <Form.Label>Adress</Form.Label>
                  <Form.Control className="myAccountinputs" type="text" placeholder="21 Rue Rivoli" value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
                </Col>
              </Row>

              {/* password form */}
              <Form.Group className="mt-3">
                <Form.Label>Password Changes</Form.Label>

                <Form.Control className="myAccountinputs mb-2" type="password" placeholder="New password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />

                <Form.Control
                  className="myAccountinputs"
                  type="password"
                  required={passwordInput} //only required if user filled the other input
                  placeholder="Repeat your new pass"
                  value={passwordAgainInput}
                  onChange={(e) => setPasswordAgainInput(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-end mt-5">
                <Button className="ml-3 bg-transparent text-dark border-0" onClick={() => navigate("/home")}>Cancel</Button>
                <Button className="submitButton px-4 py-2" type="submit">Save Changes</Button>
              </div>
            </Form>
          </Col>
          {/* right part with BG */}
          <Col md={4} className="myAccountBg pr-4"></Col>

        </Row>
      </Container>
    </>
  )
}

export default MyAccount
