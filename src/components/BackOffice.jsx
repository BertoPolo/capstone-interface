import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import MyNavbar from "./MyNavbar"

import { changeName, changeAdress } from "../slices/users/usersSlice"

const BackOffice = () => {

    const usersName = useSelector((state) => state.usersSlice.name);
    const usersAdress = useSelector((state) => state.usersSlice.adress);
    const [foundedUsers, setFoundedUsers] = useState([])
    const [foundedItems, setFoundedItems] = useState([])
    const [userInput, setUserInput] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()


    // search user
    // delete user => from DB ,in redux: re-fetching is enough
    // edit user => from DB, in redux: re-fetching is enough
    //see user's details

    // setTimeout(navigate("/home"), 1500)


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

    const searchArticleSubmit = (e) => {
        e.preventDefault()
    }

    const addNewArticleSubmit = (e) => {
        e.preventDefault()

    }

    // const voucherCreatorSubmit = (e) => {
    //     e.preventDefault()
    //     setTimeout(navigate("/home"),1500)
    // }



    // create fetch function tofetch and  fill "foundedUsers" with DB results
    // create options for item's results - delete, edit =>name etc,set it as outlet
    // voucher creator


    return (
        <>
            <MyNavbar />

            {/* Search user */}
            <Form className="d-flex justify-content-center flex-column" onSubmit={(e) => searchUserSubmit(e)}>
                <h4 className="mb-3">Search an user</h4>

                <Form.Group>
                    <Form.Control type="text" placeholder="User name" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                </Form.Group>

                <Button type="submit"> Submit </Button>
            </Form>

            <h4 className=""><u>Results</u></h4>
            {/* <Dropdown> */}
            {foundedUsers && foundedUsers.map((element) => {
                return (
                    <div key={element._id}>
                        <p><b>{element.name}</b></p>
                        <p>{element.adress}</p>
                        {/* <Button variant="primary" onClick={dispatch(()}>Edit</Button><Button variant="danger" onClick={dispatch(())}>Delete</Button> */}
                        <hr />
                    </div>
                )
            })}
            {/* </Dropdown> */}

            {/* Search item */}
            <Form className="d-flex justify-content-center flex-column" onSubmit={(e) => searchArticleSubmit(e)}> {/* check onSubmit if its calling the right function */}
                <h4 className="mb-3">Search an article</h4>


                <Form.Group>
                    <Form.Control type="text" placeholder="Name" />

                </Form.Group>


                <Button type="submit"> Submit </Button>
            </Form>

            {/* <Dropdown> */}
            <h4 className=""><u>Results</u></h4>

            {foundedItems && foundedItems.map((element) => {
                return (
                    <div>
                        <p>{element.name}</p>
                        <p>{element.adress}</p>
                        {/* <Button variant="primary" onClick={dispatch(()}>Edit</Button><Button variant="danger" onClick={dispatch(())}>Delete</Button> */}
                        <hr />
                    </div>
                )
            })}
            {/* </Dropdown> */}
            {/* Post new article */}
            <Form className="d-flex justify-content-center flex-column" onSubmit={(e) => addNewArticleSubmit(e)}> {/* check onSubmit */}
                <h4 className="mb-3">Add a new article</h4>

                <Form.Group>

                    <Form.Control type="text" placeholder="Name" />
                    <Form.Control type="text" placeholder="Price" />
                    <Form.Control type="text" placeholder="Main Category" />
                    <Form.Control type="text" placeholder="Category" />
                    <Form.Control type="text" placeholder="Brand" />
                    <Form.Control type="text" placeholder="Short Description" />
                    <Form.Control type="text" placeholder="Full Description" />
                    <Form.Check type="checkbox" label="Outlet" />
                    <Form.File id="exampleFormControlFile1" label="Add An Image" />

                </Form.Group>

                <Button type="submit"> Submit </Button>
            </Form>


            {/* Voucher creator */}
            {/* <Form className="d-flex justify-content-center flex-column" onSubmit={(e) => voucherCreatorSubmit(e)}> check onSubmit
                <h4 className="mb-3">Voucher creator</h4>

                <Form.Group>
                    <Form.Control type="text" placeholder="Voucher's name" />
                    <Form.Control type="text" placeholder="% discount" />
                </Form.Group>

                <Button type="submit" disabled > Submit </Button>
            </Form> */}

            <Button variant="danger" onClick={() => navigate("/home")}> Back</Button >

        </>
    )
}

export default BackOffice