import { Form, Button } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import { useNavigate } from "react-router-dom"

const BackOffice = () => {
    const navigate = useNavigate()

    // search and delete user
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate("/home")
    }

    <>
        <MyNavbar />
        <Form className="login-container" onSubmit={(e) => handleSubmit(e)}>
            <h4 className="mb-3">Modify your data</h4>



            <Form.Group>
                <Form.Control type="text" placeholder="User name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
            </Form.Group>


            <Button type="submit" disabled > Submit </Button>
            <Button variant="danger" onClick={() => navigate("/home")}>Back</Button>
        </Form>
    </>
}

export default BackOffice