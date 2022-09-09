import { Form, Button } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import { useNavigate } from "react-router-dom"

const BackOffice = () => {
    const navigate = useNavigate()

    // search user
    // delete user
    //see user's details

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate("/home")
    }
    return (
        <>
            <MyNavbar />
            <Form className="d-flex justify-content-center flex-column" onSubmit={(e) => handleSubmit(e)}>
                <h4 className="mb-3">Search an User</h4>


                <Form.Group>
                    <Form.Control type="text" placeholder="User name" />

                </Form.Group>


                <Button type="submit" disabled > Submit </Button>
                <Button variant="danger" onClick={() => navigate("/home")}>Back</Button>
            </Form>
            <h4 className="login-container">Results</h4>
        </>
    )
}

export default BackOffice