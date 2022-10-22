import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import MyNavbar from "./MyNavbar"
import { changeName, changeAdress } from "../slices/users/usersSlice"
import { toggleIsOnUsers, toggleIsOnItems, toggleIsOnNewItems } from "../slices/sheets/sheetsSlice"

const BackOffice = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();



    // search user
    // delete user => from DB ,in redux: re-fetching is enough
    // edit user => from DB, in redux: re-fetching is enough
    //see user's details

    // setTimeout(navigate("/home"), 1500)


    // const voucherCreatorSubmit = (e) => {
    //     e.preventDefault()
    //     setTimeout(navigate("/home"),1500)
    // }


    // create fetch function tofetch and  fill "foundedUsers" with DB results
    // create options for item's results - delete, edit =>name etc,set it as outlet



    return (
        <>
            <MyNavbar />
            <h1>BACKOFFICE</h1>
            {/* Voucher creator */}
            {/* <Form className="d-flex justify-content-center flex-column" onSubmit={(e) => voucherCreatorSubmit(e)}> check onSubmit
                <h4 className="mb-3">Voucher creator</h4>

                <Form.Group>
                    <Form.Control type="text" placeholder="Voucher's name" />
                    <Form.Control type="text" placeholder="% discount" />
                </Form.Group>

                <Button type="submit" disabled > Submit </Button>
            </Form> */}

            <Button variant="primary" onClick={() => navigate("/backOfficeUsers")}>Search Users</Button >
            <Button variant="dark" onClick={() => navigate("/backOfficeItems")}>Search Items</Button >
            <Button variant="secondary" onClick={() => navigate("/backOfficeNewItem")}>Create Items</Button >
            <Button variant="danger" onClick={() => navigate("/home")}>Go Back</Button >

            isOnUsers &&
            isOnItems &&
            isOnNewItems &&

        </>
    )
}

export default BackOffice