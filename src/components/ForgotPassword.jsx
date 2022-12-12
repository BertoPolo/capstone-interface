import { Container, Form, Button, Col, Row } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const ForgotPassword = () => {

    const navigate = useNavigate("")
    const { name, username, adress, email, token } = useSelector((state) => state.usersSlice);

    const [nameInput, setNameInput] = useState("")
    const [userNameInput, setUserNameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")


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

    const notifyOk = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


    const checkCredentials = async (e) => {
        e.preventDefault()

        const newPass = Math.floor(Math.random() * 10000099)

        let body = {
            password: newPass,
            username: userNameInput,
            name: nameInput,
            email: emailInput
        }

        try {
            const res = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}users/forgotPassword`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );
            if (res.ok) {
                notifyOk("check your mail, you will see your new temporary password, reset it ASAP!")
                setTimeout(() => navigate("/"), 1500)
            } else notifyError("this credentials don't match")

        } catch (error) {
            console.log(error)
        }
    }



    return (
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


            <div className="login-container bgForgot">
                <Form className=" transparency-box p-4 mt-4" onSubmit={(e) => checkCredentials(e)}>
                    <h4 className="mb-3">Account recovery</h4>

                    {<Form.Group>
                        <Form.Control type="text" placeholder="Full Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                    </Form.Group>}

                    <Form.Group>
                        <Form.Control type="text" placeholder="User name" value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                        <Button type="submit" disabled={!nameInput || !userNameInput || !emailInput} > Submit </Button>
                        <Button className="ml-3" variant="danger" onClick={() => navigate("/")}>Back</Button>
                    </div>
                </Form>
            </div>
        </>

    )

}

export default ForgotPassword