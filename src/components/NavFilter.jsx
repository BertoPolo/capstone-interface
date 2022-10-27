import { Dropdown, Navbar, Nav, NavDropdown, Button, Form, FormControl, Container, Row } from "react-bootstrap"
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

    // mininum price filter
    const minPriceFilter = () => {

    }

    // top price filter
    const topPriceFilter = () => {

    }

    // sorting Asc or Desc
    const priceSort = () => {

    }


    useEffect(() => {
        getItems()
        getBrands()
        minPriceFilter()
        topPriceFilter()
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

            <Container >
                <Row>
                    {/* search bar */}
                    <Form inline className="d-flex justify-content-center" onSubmit={(e) => searchItems(e)}>
                        <FormControl type="text" value={searchInput} placeholder="Check if we have it" className="w-25 searchBar" onChange={(e) => setSearchinput(e.target.value)} />
                        <Button type="submit" variant="outline-success" className="ml-2 mr-2">
                            <i className="bi bi-search "></i>
                        </Button>
                        <Button variant="outline-primary" onClick={() => { getItems(); setSearchinput("") }}>X</Button>
                    </Form>
                </Row>

                <Row>
                    <Navbar className="d-flex justify-content-between"> {/* expand="lg" */}
                        {/*PRICE SORTING */}
                        <Nav>
                            <NavDropdown title="Price sorting" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1" onClick={() => { priceSort("asc") }}>Asc</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2" onClick={() => { priceSort("desc") }}>Desc</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        {/* BY PRICE RANGE */}
                        <Form >
                            <Form.Group >
                                <Form.Label>From</Form.Label>
                                <Form.Control onChange={() => minPriceFilter()} type="range" />
                            </Form.Group>
                        </Form>

                        <Form >
                            <Form.Group >
                                <Form.Label>To</Form.Label>
                                <Form.Control onChange={() => topPriceFilter()} type="range" />
                            </Form.Group>
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
                </Row>
            </Container>


        </>
    )
}

export default NavFilter