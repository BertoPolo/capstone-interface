import { Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const MyAccount = () => {
  const navigate = useNavigate()
  const [nameInput, setNameInput] = useState()
  const [adressInput, setAdressInput] = useState()
  const [passwordInput, setPasswordInput] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/home")
  }
  return (
    <>
      <Form className="login-container" onSubmit={(e) => handleSubmit(e)}>
        <h4 className="mb-3">Modify your data</h4>

        <Form.Group>
          <Form.Control type="text" placeholder="Username" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Control type="text" placeholder="Shipping Adress" value={adressInput} onChange={(e) => setAdressInput(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Control type="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
        </Form.Group>
      </Form>
    </>
  )
}

export default MyAccount
