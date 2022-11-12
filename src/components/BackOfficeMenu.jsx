import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import MyNavbar from "./MyNavbar"
import BackOfficeItems from "./BackOfficeItems"
import BackOfficeNewItem from "./BackOfficeNewItem"
import BackOfficeUsers from "./BackOfficeUsers"
import { toggleIsOnUserSearch, toggleIsOnItemSearch, toggleIsOnCreateNewItem, } from "../slices/sheets/sheetsSlice"

const BackOffice = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { isOnUserSearch, isOnItemSearch, isOnCreateNewItem } = useSelector((state) => state.sheetsSlice)


    // const voucherCreatorSubmit = (e) => {
    //     e.preventDefault()
    // }

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
            <div className=" m-3 d-flex justify-content-between">

                <Button variant="primary" onClick={() => dispatch(toggleIsOnUserSearch(true))} >Search Users</Button >
                <Button variant="dark" onClick={() => dispatch(toggleIsOnItemSearch(true))} >Search Items</Button >
                <Button variant="secondary" onClick={() => dispatch(toggleIsOnCreateNewItem(true))}>Create Items</Button >
                <Button variant="danger" onClick={() => navigate("/home")}>Return Home</Button >
            </div>

            {isOnUserSearch && <BackOfficeUsers />}
            {isOnItemSearch && <BackOfficeItems />}
            {isOnCreateNewItem && <BackOfficeNewItem />}

        </>
    )
}

export default BackOffice