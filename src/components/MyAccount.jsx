import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import MyNavbar from "./MyNavbar"

const MyAccount = () => {
  const navigate = useNavigate("")

  const [nameInput, setNameInput] = useState("")
  const [userNameInput, setUserNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [adressInput, setAdressInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [passwordAgainInput, setPasswordAgainInput] = useState("")

  const { username, token } = useSelector((state) => state.usersSlice);


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
          `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}users/edit/${username}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token

            },

            body: JSON.stringify(body),
          }
        );
        if (res.status === 201) {
          // const data = await res.json();
          navigate("/home")
        }

      } catch (error) {
        console.log(error)
      }

    }
  }

  return (
    <>
      <MyNavbar />

      <Form className="login-container" onSubmit={(e) => handleSubmit(e)}>
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
          <Form.Control type="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="password"
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
    </>
  )
}

export default MyAccount
