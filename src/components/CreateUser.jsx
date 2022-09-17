import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState } from "react"
// import { useSelector, useDispatch } from "react-redux"

const CreateUser = () => {
  const [nameInput, setNameInput] = useState("")
  // const [bikeInput, setBikeInput] = useState("")
  const [adressinput, setAdressInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  // const { name, adress } = useSelector((state) => state.usersSlice);


  const handleSubmit = (e) => {
    e.preventDefault()
    // navigate("/home")
  }

  return (
    <Form className="login-container" onSubmit={(e) => handleSubmit(e)}>
      <h4 className="mb-3">Registration</h4>

      <Form.Group>
        <Form.Control type="text" placeholder="Full name" onChange={(e) => setNameInput(e.target.value)} />
        <Form.Control type="text" placeholder="Shipping Adress" onChange={(e) => setAdressInput(e.target.value)} />
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordInput(e.target.value)} />
      </Form.Group>

      {/* <Form.Group>
        <Form.Control type="text" placeholder="Bike's brand and model" onChange={(e) => setBikeInput(e.target.value)} />
      </Form.Group> */}

      {/* <Form.Group>
        <Form.Control type="file" placeholder="Profile Image" onChange={(e) => setBikeInput(e.target.value)} />
      </Form.Group> */}


      <div>
        {adressinput && passwordInput && nameInput ? (
          <Button variant="success" type="submit">
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
