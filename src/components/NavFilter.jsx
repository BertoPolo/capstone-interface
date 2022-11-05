import { Dropdown, Navbar, Nav, NavDropdown, Button, Form, FormControl, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addItems, changeCurrentFilters } from "../slices/items/itemsSlice"
import { addBrands } from "../slices/brands/brandsSlice"
import { toggleIsOnCategory, toggleIsOnBrands } from "../slices/sheets/sheetsSlice"





const NavFilter = () => {
    const [searchInput, setSearchinput] = useState("")
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000)
    const [sorting, setSorting] = useState("")
    const [brandId, setBrandId] = useState("")
    const [selectedBrand, setSelectedBrand] = useState("")
    // const [category, setCategory] = useState("")
    // const [mainCategory, setMainCategory] = useState("")




    const brands = useSelector((state) => state.brandsSlice.brands);
    const items = useSelector((state) => state.itemsSlice.items);
    const currentFilters = useSelector((state) => state.itemsSlice.currentFilters)

    const dispatch = useDispatch()

    const resetStates = () => {
        setSearchinput(""); setMaxPrice(1000); setMinPrice(0); setSorting("")
    }

    const notifyNotFound = () => toast.warn(`OOPS! looks like we don't anything there`, {
        position: "top-center",
        autoClose: 2500,
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


    let filterQuery
    // if filter query is empty then push without &, else push with it 

    const getFilteredItems = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` ||
                `${process.env.React_APP_LOCAL_SERVER}items?${filterQuery}`);
            // ${filterQuery}
            // price>${minPrice}&price<${maxPrice}&sort=${sorting}&title=/^${searchInput}/i&brand=${brandId}

            if (response.ok) {
                const data = await response.json();
                dispatch(addItems(data));
            }
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
                autoClose={2500}
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

            <Container className="mt-4">
                <Row>
                    {/* search bar */}
                    <Form inline className="d-flex justify-content-center w-100" onSubmit={(e) => getFilteredItems(e)}>
                        <FormControl type="text" value={searchInput} placeholder="Check if we have it" className="w-25 searchBar" onChange={(e) => setSearchinput(e.target.value)} />
                        {/* <i className="bi bi-search pointer mx-3"></i> */}
                        <Button variant="outline-dark" className="pointer ml-3" onClick={() => { getItems(); resetStates() }}>Clean</Button>
                    </Form>
                </Row>

                <Row>
                    <Navbar className="d-flex justify-content-between w-100">
                        <Form onSubmit={(e) => getFilteredItems(e)}>
                            {/*PRICE SORTING */}
                            <Nav>
                                <NavDropdown title="Price sorting" id="basic-nav-dropdown">
                                    <NavDropdown.Item onSelect={(e) => { setSorting("price") }}>Asc</NavDropdown.Item>
                                    <NavDropdown.Item onSelect={(e) => { setSorting("-price") }}>Desc</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Row>

                                {/* BY PRICE RANGE */}
                                <Form.Group >
                                    <Form.Label>From </Form.Label>
                                    <Form.Control type="number" value={minPrice} min="0" max="1000" onChange={(e) => setMinPrice(e.target.value)} />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>To </Form.Label>
                                    <Form.Control type="number" value={maxPrice} min="0" max="1000" onChange={(e) => setMaxPrice(e.target.value)} />
                                </Form.Group>
                            </Row>
                            <Button type="submit" className="d-flex ">Filter </Button>

                            {/* BY BRAND*/}
                            <Dropdown >
                                <Dropdown.Toggle variant="warning">{selectedBrand || "Choose Brand"}</Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {brands.map((element) => {
                                        return (
                                            <Dropdown.Item key={element._id} value={element._id} onClick={() => { setSelectedBrand(element.brands); setBrandId(element._id) }} >{element.brands}</Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form>

                    </Navbar>
                </Row>
            </Container>


        </>
    )
}

export default NavFilter