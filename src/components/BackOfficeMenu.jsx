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




    return (
        <>
            <MyNavbar />
            <h1 className=" d-flex justify-content-center">BACKOFFICE</h1>
            <div className="bOMenu m-3 d-flex justify-content-between mb-4">

                <Button className="searchNSubmitButton" variant="outline" onClick={() => { dispatch(toggleIsOnUserSearch(true)); navigate("/backOfficeMenu/backOfficeUsers") }} ><i className="bi bi-search"></i> Search Users</Button >
                <Button className="searchNSubmitButton" variant="outline" onClick={() => { dispatch(toggleIsOnItemSearch(true)); navigate("/backOfficeMenu/backOfficeItems") }} > <i className="bi bi-search"></i> Search Items</Button >
                <Button className="searchNSubmitButton" variant="outline" onClick={() => { dispatch(toggleIsOnCreateNewItem(true)); navigate("/backOfficeMenu/backOfficeItems") }}><i className="bi bi-hammer"></i> Create Items</Button >
                <Button className="buttonBack" onClick={() => navigate("/home")}><i className="bi bi-box-arrow-in-left"></i></Button >
            </div>

            {isOnUserSearch && <BackOfficeUsers />}
            {isOnItemSearch && <BackOfficeItems />}
            {isOnCreateNewItem && <BackOfficeNewItem />}

        </>
    )
}

export default BackOffice