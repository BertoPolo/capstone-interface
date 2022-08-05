import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import MyNavbar from "./MyNavbar"

const MyAccount = () => {
  const navigate = useNavigate("")
  const [nameInput, setNameInput] = useState("")
  const [adressInput, setAdressInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [passwordAgainInput, setPasswordAgainInput] = useState("")

  const [isAdmin, setIsAdmin] = useState(false)//redux -----------

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/home")
  }
  return (
    <>
      <MyNavbar />
      <Form className="login-container" onSubmit={(e) => handleSubmit(e)}>
        <h4 className="mb-3">Modify your data</h4>

        {!isAdmin && <Form.Group>
          <Form.Control type="text" placeholder="Full Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
        </Form.Group>}

        <Form.Group>
          <Form.Control type="text" placeholder="User name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
        </Form.Group>

        {!isAdmin && <Form.Group>
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
        <Button type="submit" disabled={(passwordInput !== passwordAgainInput) || (!passwordInput || !passwordAgainInput)} > Submit </Button>
        <Button variant="danger" onClick={() => navigate("/home")}>Back</Button>
      </Form>
    </>
  )
}

export default MyAccount
