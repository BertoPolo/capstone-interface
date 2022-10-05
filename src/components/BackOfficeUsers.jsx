import { Form, Button } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import { useSelector, useDispatch } from "react-redux"
import { changeName, changeAdress } from "../slices/users/usersSlice"
import { useState } from "react"




const BackOfficeUsers = () => {
    const [foundedUsers, setFoundedUsers] = useState([])
    const [userInput, setUserInput] = useState("")

    const usersName = useSelector((state) => state.usersSlice.name);
    const usersAdress = useSelector((state) => state.usersSlice.adress);

    const dispatch = useDispatch()


    const searchUserSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}users/${userInput}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            let data = await response.json();
            setFoundedUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (name) => {
        try {
            const response = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}users/${name}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <MyNavbar />

            {/* Search user */}
            <Form className="d-flex justify-content-center flex-column" onSubmit={(e) => searchUserSubmit(e)}>
                <h4 className="mb-3">Search an user</h4>

                <Form.Group>
                    <Form.Control type="text" placeholder="Name" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                </Form.Group>

                <Button type="submit"> Submit </Button>
            </Form >

            <h4 className=""><u>Results</u></h4>
            {/* <Dropdown> */}
            {
                foundedUsers && foundedUsers.map((element) => {
                    return (
                        <div key={element._id}>
                            <span><b>{element.name}</b> ---- </span>
                            <span>{element.adress}</span>
                            <i className="bi bi-trash3" onClick={() => deleteUser(element.name)}></i>
                            {/* <Button variant="primary" >Edit</Button><Button variant="danger" >Delete</Button> */}
                            <hr />
                        </div>
                    )
                })
            }
            {/* </Dropdown> */}
        </>

    )
}

export default BackOfficeUsers