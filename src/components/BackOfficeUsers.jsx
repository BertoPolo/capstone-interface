import { Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"




const BackOfficeUsers = () => {
    const [foundedUsers, setFoundedUsers] = useState([])
    const [userInput, setUserInput] = useState("")

    const { usersName, usersAdress } = useSelector((state) => state.usersSlice);
    // const usersAdress = useSelector((state) => state.usersSlice.adress);

    const dispatch = useDispatch()


    const searchUserSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}users/${userInput}`);

            if (response.status === 200) {
                let data = await response.json();
                setFoundedUsers(data)
                setUserInput("")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // const editUser = async (username) => {
    //     const body = {

    //     }

    //     try {
    //         const response = await fetch(
    //             `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}users/edit/${username}`,
    //             {
    //                 method: "PUT",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(body)

    //             }
    //         );
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

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
            {/* Search user */}
            <Form className="d-flex justify-content-center flex-column" onSubmit={(e) => searchUserSubmit(e)}>
                <h4 className="mb-3">Search an user</h4>

                <Form.Group>
                    <Form.Control type="text" placeholder="Name" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                </Form.Group>

                <Button type="submit"> Submit </Button>
            </Form >

            <h4 className=""><u>Results</u></h4>
            {
                foundedUsers && foundedUsers.map((element) => {
                    return (
                        <div key={element._id}>
                            <span><b>{element.name}</b> ---- </span>
                            <span>{element.adress}</span>
                            <i className="bi bi-trash3 pointer" onClick={() => deleteUser(element.name)}></i>
                            {/* <Button variant="primary" >Edit</Button><Button variant="danger" >Delete</Button> */}
                            <hr />
                        </div>
                    )
                })
            }
        </>

    )
}

export default BackOfficeUsers