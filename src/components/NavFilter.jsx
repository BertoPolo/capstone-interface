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
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000)
    const [sorting, setSorting] = useState("")



    const brands = useSelector((state) => state.brandsSlice.brands);
    const items = useSelector((state) => state.itemsSlice.items);

    const dispatch = useDispatch()

    const resetStates = () => {
        setSearchinput(""); setMaxPrice(1000); setMinPrice(0); setSorting("")
    }

    const notifyNotFound = () => toast.warn(`OOPS! looks like we don't anything there`, {
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

    const getBrands = async () => {
        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}brands/all`);
            const data = await response.json();
            dispatch(addBrands(data));

        } catch (error) {
            console.log(error)
        }
    }

    const getByBrand = async (brand) => { // mergo to main filter function
        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items?brand=${brand}`);
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

    // const searchItems = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items?title=${searchInput}`);
    //         const data = await response.json();
    //         if (data.length > 0) dispatch(addItems(data));
    //         else notifyNotFound()

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }




    const getFilteredItems = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items?price>${minPrice}&price<${maxPrice}&${sorting}&title=${searchInput}`
            );

            const data = await response.json();
            if (data) dispatch(addItems(data));
            else notifyNotFound()

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

            <Container >
                <Row>
                    {/* search bar */}
                    <Form inline className="d-flex justify-content-center" onSubmit={(e) => getFilteredItems(e)}>
                        <FormControl type="text" value={searchInput} placeholder="Check if we have it" className="w-25 searchBar" onChange={(e) => setSearchinput(e.target.value)} />
                        <Button type="submit" variant="outline-success" className="ml-2 mr-2">
                            <i className="bi bi-search "></i>
                        </Button>
                        <Button variant="outline-primary" onClick={() => { getItems(); resetStates() }}>X</Button>
                    </Form>
                </Row>

                <Row>
                    <Navbar className="d-flex justify-content-between"> {/* expand="lg" */}
                        {/*PRICE SORTING */}
                        <Nav>
                            <NavDropdown title="Price sorting" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1" onClick={(e) => { setSorting("sort=price"); getFilteredItems(e) }}>Asc</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2" onClick={(e) => { setSorting("sort=-price"); getFilteredItems(e) }}>Desc</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        {/* BY PRICE RANGE */}
                        <Form >
                            <Form.Group >
                                <Form.Label>From <output>{minPrice}</output></Form.Label>
                                <Form.Control type="range" value={minPrice} min="0" max="1000" onChange={(e) => { setMinPrice(e.target.value); getFilteredItems(e) }} />

                            </Form.Group>
                        </Form>

                        <Form >
                            <Form.Group >
                                <Form.Label>To <output>{maxPrice}</output></Form.Label>
                                <Form.Control type="range" value={maxPrice} min="0" max="1000" onChange={(e) => { setMaxPrice(e.target.value); getFilteredItems(e) }} />

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