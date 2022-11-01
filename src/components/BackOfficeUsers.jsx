import { Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'




const BackOfficeUsers = () => {
    const [foundUsers, setFoundUsers] = useState([])
    const [userInput, setUserInput] = useState("")

    const [editMode, setEditMode] = useState(false)


    const { usersName, usersAdress } = useSelector((state) => state.usersSlice);
    // const usersAdress = useSelector((state) => state.usersSlice.adress);

    const dispatch = useDispatch()

    const notifyError = () => toast.error(`Check if you writted it right, cause looks like we don't have any client with this name`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })


    const searchUserSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}users/${userInput}`);

            if (response.status === 200) {
                const data = await response.json();
                if (data) {
                    setUserInput("")
                    setFoundUsers(data)
                } else notifyError()
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
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}users/delete/${name}`,
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

            {/* Toaster */}
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
            {/* Search user */}
            <Form className="d-flex justify-content-center flex-column mb-3" onSubmit={(e) => searchUserSubmit(e)}>
                <h4 className="mb-3">Search an user</h4>

                <Form.Group className="mb-3">
                    <Form.Control type="text" className="justify-content-center w-25" placeholder="Name" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                </Form.Group>

                <Button type="submit" disabled={!userInput}> Submit </Button>

            </Form >

            <h4 className=""><u>Results</u></h4>
            {
                foundUsers && foundUsers.map((element) => {
                    return (
                        <div key={element._id}>
                            {/* on click open dropdown with a filled form to edit it */}
                            <span>Name : <b>{element.name}</b> </span>
                            <span>Adress : <b>{element.adress}</b></span>
                            <i className="bi bi-pencil pointer mx-3" onClick={() => setEditMode(true)}></i>

                            <i className="bi bi-trash3 pointer" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteUser(element._id) }}></i>

                            <hr />
                        </div>
                    )
                })
            }

            {/* el mapeo de F */}


        </>

    )
}

export default BackOfficeUsers