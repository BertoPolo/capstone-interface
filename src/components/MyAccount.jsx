import { Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const MyAccount = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/home")
  }
  return (
    <>
      <Form className="login-container" onSubmit={(e) => handleSubmit(e)}>
        <h4 className="mb-3">Modify your data</h4>

        <Form.Group>
          <Form.Control type="text" placeholder="Username" onChange={(e) => setNameInput(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Control type="text" placeholder="Shipping Adress" onChange={(e) => setAdressInput(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordInput(e.target.value)} />
        </Form.Group>
      </Form>
    </>
  )
}

export default MyAccount
