import { Form, Button } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { changeName, changeAdress } from "../slices/sheets/sheetsSlice"

const BackOffice = () => {
    const navigate = useNavigate()
    const usersName = useSelector((state) => state.usersSlice.name);
    const usersAdress = useSelector((state) => state.usersSlice.adress);
    const dispatch = useDispatch()

    // search user
    // delete user => from DB and redux
    // edit user => from DB and redux
    //see user's details

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate("/home")
    }



    //create a fetch function tofetch and  fill "results" with DB results


    let results

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

            {results && results.map((element) => {
                return (
                    <div>
                        <p>{element.name}</p>
                        <p>{element.adress}</p>
                        {/* <Button variant="primary" onClick={dispatch(()}>Edit</Button><Button variant="danger" onClick={dispatch(())}>Delete</Button> */}
                        <hr />
                    </div>
                )
            })}

        </>
    )
}

export default BackOffice