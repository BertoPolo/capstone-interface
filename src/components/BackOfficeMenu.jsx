import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import React, { Suspense } from "react";
import { useSelector, useDispatch } from "react-redux"
import { toggleIsOnUserSearch, toggleIsOnItemSearch, toggleIsOnCreateNewItem, } from "../slices/pages/pagesSlice"

const BackOfficeItems = React.lazy(() => import('./BackOfficeItems'));
const BackOfficeNewItem = React.lazy(() => import('./BackOfficeNewItem'));
const BackOfficeUsers = React.lazy(() => import('./BackOfficeUsers'));
const MyNavbar = React.lazy(() => import('./MyNavbar'));


const BackOffice = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { isOnUserSearch, isOnItemSearch, isOnCreateNewItem } = useSelector((state) => state.pagesSlice)

    return (
        <>

            <MyNavbar />

            <h1 className=" d-flex justify-content-center pt-4">BACKOFFICE</h1>
            <div className="bOMenu m-3 d-flex justify-content-between mb-4">

                <Button className="submitButton" variant="outline" onClick={() => { dispatch(toggleIsOnUserSearch(true)); navigate("/backOfficeMenu/backOfficeUsers") }} ><i className="bi bi-search"></i> Search Users</Button >
                <Button className="submitButton" variant="outline" onClick={() => { dispatch(toggleIsOnItemSearch(true)); navigate("/backOfficeMenu/backOfficeItems") }} > <i className="bi bi-search"></i> Search Items</Button >
                <Button className="submitButton" variant="outline" onClick={() => { dispatch(toggleIsOnCreateNewItem(true)); navigate("/backOfficeMenu/backOfficeItems") }}><i className="bi bi-hammer"></i> Create Items</Button >
                <Button className="buttonBack" onClick={() => navigate("/home")}><i className="bi bi-box-arrow-in-left"></i></Button >
            </div>

            {isOnUserSearch &&
                <Suspense fallback={<div>Loading...</div>}>
                    <BackOfficeUsers />
                </Suspense>}
            {isOnItemSearch &&
                <Suspense fallback={<div>Loading...</div>}>
                    <BackOfficeItems />
                </Suspense>
            }
            {isOnCreateNewItem &&
                <Suspense fallback={<div>Loading...</div>}>
                    <BackOfficeNewItem />
                </Suspense>
            }

        </>
    )
}

export default BackOffice