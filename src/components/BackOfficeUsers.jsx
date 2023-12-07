import { Container, Form, Button, Dropdown } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useState } from "react"
import { toast } from 'react-toastify';

const BackOfficeUsers = () => {

    //add dropdown to select how do you want to search users: by name , username... etc

    const token = useSelector((state) => state.usersSlice.token);

    const [wayToSearch, setWayToSearch] = useState("")

    const [foundUsers, setFoundUsers] = useState([])
    const [parameterToSearch, setParameterToSearch] = useState("")
    const [userId, setUserId] = useState("")

    const [editMode, setEditMode] = useState(false)

    const [nameInput, setNameInput] = useState("")
    const [userNameInput, setUserNameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [adressInput, setAdressInput] = useState("")



    const notifyError = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })

    const notifyOk = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })

    const resetStates = () => {
        setNameInput("")
        setUserNameInput("")
        setEmailInput("")
        setAdressInput("")
        setFoundUsers([])
        setParameterToSearch("")
        setUserId("")
        setEditMode(false)
    }

    const getUserById = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}users?_id=${id}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            const data = await response.json();
            if (data) {
                setNameInput(data[0].name)
                setUserNameInput(data[0].username)
                setEmailInput(data[0].email)
                setAdressInput(data[0].adress)
            }

        } catch (error) {
            console.log(error)
        }

    }

    const searchUserSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}users?${wayToSearch}=${parameterToSearch}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setParameterToSearch("")
                    setFoundUsers(data)
                } else notifyError(`Check if you writted it right, cause looks like we don't have any client with this name`)
            } else notifyError("oops! Something wrong happened")
        } catch (error) {
            console.log(error)
        }
    }

    const editUser = async (e) => {
        e.preventDefault()

        const body = {
            name: nameInput,
            username: userNameInput,
            email: emailInput,
            adress: adressInput
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}users/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(body)

                }
            );
            if (response.ok) { notifyOk("Client data changed successfully"); resetStates(); }
            else notifyError("oops!something went wrong")

        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}users/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                }
            );
            if (response.ok) notifyOk('Client removed')
            else notifyError("oops! Something went wrong");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container fluid>

            {/* Search user */}
            {!editMode && <Form onSubmit={(e) => searchUserSubmit(e)}>

                <div className="d-flex justify-content-center flex-column ">
                    <h4 className="mb-3">Search an user</h4>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="mb-3">
                            {wayToSearch || "Select way to search"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setWayToSearch("name")}>Name</Dropdown.Item>
                            <Dropdown.Item onClick={() => setWayToSearch("username")}>Username</Dropdown.Item>
                            <Dropdown.Item onClick={() => setWayToSearch("email")}>Email</Dropdown.Item>
                            {/* <Dropdown.Item onClick={() => setWayToSearch("")}>All users</Dropdown.Item> */}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Group >
                        <Form.Control disabled={!wayToSearch} type="text" className="justify-content-center w-25" placeholder="Who do you want to search?" value={parameterToSearch} onChange={(e) => setParameterToSearch(e.target.value)} />
                    </Form.Group>
                </div>

                <Button type="submit" disabled={!parameterToSearch} className="mb-3 submitButton"> Submit </Button>

            </Form >}

            {!editMode && <h4 className=""><u>Results</u></h4>}

            {editMode ?

                <Form onSubmit={(e) => editUser(e)}>
                    <h4>Change user's data</h4>

                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Adress</Form.Label>
                        <Form.Control type="text" value={adressInput} onChange={(e) => setAdressInput(e.target.value)} />
                    </Form.Group>
                    <div className="d-flex">
                        <Button type="submit"> Submit </Button>
                        <Button variant="warning" onClick={() => { if (window.confirm(`Are you sure you don't wish save your changes?`)) { resetStates(); setEditMode(false) } }} >Cancel</Button>
                    </div>
                </Form>

                :
                <>
                    {foundUsers && foundUsers.map((element) => {
                        return (
                            <div key={element._id}>
                                <span>Name : <b>{element.name}</b> </span>
                                <span>Username : <b>{element.username}</b> </span>
                                <span>Adress : <b>{element.adress}</b></span>

                                <i className="bi bi-pencil pointer mx-3 bg-success p-1 text-white" onClick={() => { setEditMode(true); setUserId(element._id); getUserById(element._id) }}></i>
                                <i className="bi bi-trash3 pointer bg-danger p-1 text-white" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteUser(element._id) }}></i>

                                <hr />
                            </div>
                        )
                    })
                    }
                </>
            }




        </Container>

    )
}

export default BackOfficeUsers