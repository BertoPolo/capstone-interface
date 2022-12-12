import { Form, Button, Container, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import { useSelector, useDispatch } from "react-redux"

const CreateUser = () => {
  const [nameInput, setNameInput] = useState("")
  const [userNameInput, setUserNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [adressInput, setAdressInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  // const [bikeInput, setBikeInput] = useState("")

  const navigate = useNavigate()

  // const { name, adress } = useSelector((state) => state.usersSlice);

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    let body = {
      name: nameInput,
      username: userNameInput,
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
        notify("Welcome !!") //not displaying
        setTimeout(() => navigate("/"), 1500)
      } else notifyError("user already exists")

    } catch (error) {
      console.log(error)
    }
  }



  return (
    // <Container fluid className="">
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className=" login-container bgRegistration">
        <Form className=" transparency-box p-4 mt-4" onSubmit={(e) => handleSubmit(e)}>
          <h4 className="mb-3">Registration</h4>

          <Form.Group>
            <Form.Control type="text" placeholder="Full name" onChange={(e) => setNameInput(e.target.value)} />
            <Form.Control type="text" placeholder="User Name" onChange={(e) => setUserNameInput(e.target.value)} />
            <Form.Control type="text" placeholder="Email" onChange={(e) => setEmailInput(e.target.value)} />
            <Form.Control type="text" placeholder="Shipping Adress" onChange={(e) => setAdressInput(e.target.value)} />
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordInput(e.target.value)} />
          </Form.Group>

          <div>

            <Button variant="success" type="submit" disabled={!adressInput && !passwordInput && !nameInput}>
              Register
            </Button>


            <Link className="ml-2" to="/">
              <Button variant="danger" type="submit">
                Go Back
              </Button>
            </Link>
          </div>
        </Form >
      </div>
    </>
    // </Container >

  )
}
export default CreateUser
