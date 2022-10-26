import { Dropdown, Navbar, Nav, NavDropdown, Button, Form, FormControl } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addItems } from "../slices/items/itemsSlice"
import { addBrands } from "../slices/brands/brandsSlice"
import { toggleIsOnCategory, toggleIsOnBrands } from "../slices/sheets/sheetsSlice"





const NavFilter = () => {
    const [searchInput, setSearchinput] = useState("")

    const brands = useSelector((state) => state.brandsSlice.brands);
    const items = useSelector((state) => state.itemsSlice.items);

    const dispatch = useDispatch()


    const notifyNotFound = () => toast.warn(`OOPS! looks like we don't have that`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const getItems = async () => {
        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items`,

            );
            let data = await response.json();
            dispatch(addItems(data));
        } catch (error) {
            console.log(error)
        }
    }

    const getByBrand = async (brand) => {
        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items/brand/${brand}`);
            const data = await response.json();
            if (data.length > 0) {
                dispatch(addItems(data));
                toggleIsOnCategory(true)
            }
            else notifyNotFound()

        } catch (error) {
            console.log(error)
        }
    }
    const searchItems = async (e) => {
        //reset state to false on start
        // then ,if not finding anything TRUE on state
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items/bytitle/${searchInput}`);
            const data = await response.json();
            if (data.length > 0) dispatch(addItems(data));
            else notifyNotFound()


        } catch (error) {
            console.log(error)
        }
    }

    const getBrands = async () => {
        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}brands/all`);
            const data = await response.json();
            dispatch(addBrands(data));

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getItems()
        getBrands()
    }, [])

    return (
        <>

            {/* Toast */}
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

            <Navbar bg="light" expand="lg">
                {/*PRICE SORTING */}
                <Nav className="mr-auto">
                    <NavDropdown title="Price sorting" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Asc</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Desc</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {/* BY PRICE RANGE */}
                <Form >
                    <Form.Group >
                        <Form.Label>From</Form.Label>
                        <Form.Control type="range" />
                        <Form.Label>To</Form.Label>
                        <Form.Control type="range" />
                    </Form.Group>
                </Form>

                {/* search bar */}
                <Form inline className="" onSubmit={(e) => searchItems(e)}>
                    <FormControl type="text" value={searchInput} placeholder="Check if we have it" className="w-25 searchBar" onChange={(e) => setSearchinput(e.target.value)} />
                    <Button type="submit" variant="outline-success" className="ml-2 mr-2">
                        <i className="bi bi-search "></i> Search
                    </Button>
                    <Button variant="outline-primary" onClick={() => { getItems(); setSearchinput("") }}>Clear</Button>
                </Form>

                {/* BY BRAND*/}
                <Dropdown>
                    <Dropdown.Toggle variant="warning">Choose Brand</Dropdown.Toggle>

                    <Dropdown.Menu>
                        {brands.map((element) => {
                            return (
                                <Dropdown.Item key={element._id} href="" onClick={() => getByBrand(element._id)}>{element.brands}</Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>

            </Navbar>


        </>
    )
}

export default NavFilter