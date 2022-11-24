import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import MyNavbar from "./MyNavbar"
import { changeIsLogged, addName, addUserName, addAdress, addEmail, addIsAdmin, changeToken } from "../slices/users/usersSlice"


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



  const handleSubmit = async (e) => {
    e.preventDefault()
    if (passwordInput === passwordAgainInput) {
      let body = {
        name: nameInput,
        username: userNameInput,
        email: emailInput,
        adress: adressInput,
        password: passwordInput,
      }
      try {
        const res = await fetch(
          `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}users/edit/me/${username}`,
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
  }

  return (
    <Container fluid className="myAccountBg ">
      <MyNavbar />


      <div className="transparency">
        <Form className="login-container " onSubmit={(e) => handleSubmit(e)}>
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

          <Form.Group>
            <Form.Control type="password" required placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="password"
              required
              placeholder="Repeat Your Password"
              value={passwordAgainInput}
              onChange={(e) => setPasswordAgainInput(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex">
            <Button type="submit" disabled={(passwordInput !== passwordAgainInput) || (!passwordInput || !passwordAgainInput)} > Submit </Button>
            <Button className="ml-3" variant="danger" onClick={() => navigate("/home")}>Back</Button>
          </div>
        </Form>
      </div>

    </Container>
  )
}

export default MyAccount
