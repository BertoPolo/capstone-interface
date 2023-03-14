import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import MyNavbar from "./MyNavbar"
import BackOfficeItems from "./BackOfficeItems"
import BackOfficeNewItem from "./BackOfficeNewItem"
import BackOfficeUsers from "./BackOfficeUsers"
import { toggleIsOnUserSearch, toggleIsOnItemSearch, toggleIsOnCreateNewItem, } from "../slices/pages/pagesSlice"

const BackOffice = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { isOnUserSearch, isOnItemSearch, isOnCreateNewItem } = useSelector((state) => state.pagesSlice)


    // const voucherCreatorSubmit = (e) => {
    //     e.preventDefault()
    // }

    return (
        <>
            <MyNavbar />
            <h1 className=" d-flex justify-content-center">BACKOFFICE</h1>
            {/* Voucher creator */}
            {/* <Form className="d-flex justify-content-center flex-column" onSubmit={(e) => voucherCreatorSubmit(e)}> check onSubmit
                <h4 className="mb-3">Voucher creator</h4>

                <Form.Group>
                    <Form.Control type="text" placeholder="Voucher's name" />
                    <Form.Control type="text" placeholder="% discount" />
                </Form.Group>

                <Button type="submit" disabled > Submit </Button>
            </Form> */}
            <div className="bOMenu m-3 d-flex justify-content-between mb-4">

                <Button className="searchNSubmitButton" variant="outline" onClick={() => { dispatch(toggleIsOnUserSearch(true)); navigate("/backOfficeMenu/BackOfficeUsers") }} ><i className="bi bi-search"></i> Search Users</Button >
                <Button className="searchNSubmitButton" variant="outline" onClick={() => { dispatch(toggleIsOnItemSearch(true)); navigate("/backOfficeMenu/BackOfficeItems") }} > <i className="bi bi-search"></i> Search Items</Button >
                <Button className="searchNSubmitButton" variant="outline" onClick={() => { dispatch(toggleIsOnCreateNewItem(true)); navigate("/backOfficeMenu/BackOfficeItems") }}><i className="bi bi-hammer"></i> Create Items</Button >
                <Button className="buttonBack" onClick={() => navigate("/home")}><i className="bi bi-box-arrow-in-left"></i></Button >
            </div>

            {isOnUserSearch && <BackOfficeUsers />}
            {isOnItemSearch && <BackOfficeItems />}
            {isOnCreateNewItem && <BackOfficeNewItem />}

        </>
    )
}

export default BackOffice