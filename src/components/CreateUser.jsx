import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState } from "react"

const CreateUser = () => {
  const [nameInput, setNameInput] = useState("")
  const [bikeInput, setBikeInput] = useState("")
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  const handleSubmit = () => {
    // navigate("/home")
  }

  return (
    <Form className="login-container">
      <h4 className="mb-3">Registration</h4>

      <Form.Group>
        <Form.Control type="text" placeholder="Username" onChange={(e) => setNameInput(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Control type="text" placeholder="Bike's brand and model" onChange={(e) => setBikeInput(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Control type="file" placeholder="Profile Image" onChange={(e) => setBikeInput(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordInput(e.target.value)} />
      </Form.Group>

      <Form.Group>
      <label htmlFor="">Which type of do you want to be?</label>
          <Form.Check type="checkbox" label="Normal user" className="login-small-font" />
          <Form.Check type="checkbox" label="Garage" className="login-small-font" />
        </Form.Group>

      <div>
        {usernameInput && passwordInput && nameInput && bikeInput ? (
          <Button variant="success" type="submit" onClick={() => handleSubmit}>
            Register
          </Button>
        ) : (
          <Button variant="secondary" type="submit" disabled>
            Register
          </Button>
        )}

        <Link className="ml-2" to="/">
          <Button variant="danger" type="submit">
            Go Back
          </Button>
        </Link>
      </div>
    </Form>
  )
}
export default CreateUser
