import { Form, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
// import { useSelector, useDispatch } from "react-redux"

const CreateUser = () => {
  const [nameInput, setNameInput] = useState("")
  // const [bikeInput, setBikeInput] = useState("")
  const [adressInput, setAdressInput] = useState("")
  const [userNameInput, setUserNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  const navigate = useNavigate()

  // const { name, adress } = useSelector((state) => state.usersSlice);


  const handleSubmit = async (e) => {
    e.preventDefault()

    let body = {
      name: nameInput,
      userName: userNameInput,
      email: emailInput,
      adress: adressInput,
      password: passwordInput,
    };

    try {
      const res = await fetch(
        `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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



  return (
    <Form className="login-container" onSubmit={(e) => handleSubmit(e)}>
      <h4 className="mb-3">Registration</h4>

      <Form.Group>
        <Form.Control type="text" placeholder="Full name" onChange={(e) => setNameInput(e.target.value)} />
        <Form.Control type="text" placeholder="User Name" onChange={(e) => setAdressInput(e.target.value)} />
        <Form.Control type="text" placeholder="Email" onChange={(e) => setUserNameInput(e.target.value)} />
        <Form.Control type="text" placeholder="Shipping Adress" onChange={(e) => setEmailInput(e.target.value)} />
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordInput(e.target.value)} />
      </Form.Group>

      {/* improvements */}
      {/* <Form.Group>
        <Form.Control type="text" placeholder="Bike's brand and model" onChange={(e) => setBikeInput(e.target.value)} />
      </Form.Group> */}

      {/* <Form.Group>
        <Form.Control type="file" placeholder="Profile Image" onChange={(e) => setBikeInput(e.target.value)} />
      </Form.Group> */}


      <div>
        {adressInput && passwordInput && nameInput ? (
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
