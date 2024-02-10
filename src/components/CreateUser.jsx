import { Form, Button, Spinner } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import { toast } from 'react-toastify';

const CreateUser = () => {
  const [nameInput, setNameInput] = useState("")
  const [userNameInput, setUserNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [addressInput, setAddressInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [isCharging, setIsCharging] = useState(false)


  const navigate = useNavigate()
  const registerBtnRef = useRef()
  const backBtnRef = useRef()


  const notify = (message) => toast.warn(message, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const notifyError = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const ableBtn = e => {
    if (registerBtnRef.current) {
      registerBtnRef.current.removeAttribute("disabled");
      backBtnRef.current.removeAttribute("disabled");
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    registerBtnRef.current.setAttribute("disabled", "disabled");
    backBtnRef.current.setAttribute("disabled", "disabled");
    setIsCharging(true)
    let body = {
      name: nameInput,
      username: userNameInput,
      email: emailInput,
      address: addressInput,
      password: passwordInput,
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(body),
        }
      );
      if (res.ok) {
        notify("Welcome !!") //not displaying
        navigate("/")
      } else {
        notifyError("user already exists")
        ableBtn()
        setIsCharging(false)
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>

      <div className=" login-container bgRegistration">

        <Form className=" transparency-box p-4 mt-4 rounded" onSubmit={(e) => handleSubmit(e)}>
          <h4 className="mb-3 text-center font-weight-bolder">Create Account</h4>

          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="John Doe" onChange={(e) => setNameInput(e.target.value)} />

            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="JohnDoe123" onChange={(e) => setUserNameInput(e.target.value)} />

            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="rommy@gmail.com" onChange={(e) => setEmailInput(e.target.value)} />

            <Form.Label>Shipping Adress</Form.Label>
            <Form.Control type="text" placeholder="21 Rue la jolie" onChange={(e) => setAddressInput(e.target.value)} />

            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="*****" onChange={(e) => setPasswordInput(e.target.value)} />
          </Form.Group>

          <div className="text-center">

            <Button className="submitButton" type="submit" ref={registerBtnRef} disabled={!addressInput || !passwordInput || !nameInput || !emailInput}>
              Register
            </Button>

            <Link className="ml-2" to="/">
              <Button className="buttonBack" ref={backBtnRef}>
                Go Back
              </Button>
            </Link>
          </div>
        </Form >
        {isCharging && <Spinner animation="border" variant="success" className="position-absolute" />}
      </div>
    </>

  )
}
export default CreateUser
