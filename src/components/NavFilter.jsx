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
    const [brandId, setBrandId] = useState("")
    const [selectedBrand, setSelectedBrand] = useState("")
    // const [category, setCategory] = useState("")
    // const [mainCategory, setMainCategory] = useState("")




    const brands = useSelector((state) => state.brandsSlice.brands);
    const items = useSelector((state) => state.itemsSlice.items);

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

    // const getByBrand = async (brand) => { // mergo to main filter function
    //     try {
    //         const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items?brand=${brand}`);
    //         const data = await response.json();
    //         if (data.length > 0) {
    //             dispatch(addItems(data));
    //             toggleIsOnCategory(true)
    //         }
    //         else notifyNotFound()

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }



    const getFilteredItems = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` ||
                `${process.env.React_APP_LOCAL_SERVER}items?price>${minPrice}&price<${maxPrice}&sort=${sorting}&title=/^${searchInput}/i&brand=${brandId}`);

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
                        <Button type="submit" variant="outline-success" className="ml-2 mr-2">
                            <i className="bi bi-search "></i>
                        </Button>
                        <Button variant="outline-primary" onClick={() => { getItems(); resetStates() }}>X</Button>
                    </Form>
                </Row>

                <Row>
                    <Navbar className="d-flex justify-content-between w-100">
                        {/*PRICE SORTING */}
                        <Nav>
                            <NavDropdown title="Price sorting" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={(e) => { setSorting("price"); getFilteredItems(e) }}>Asc</NavDropdown.Item>
                                <NavDropdown.Item onClick={(e) => { setSorting("-price"); getFilteredItems(e) }}>Desc</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        {/* BY PRICE RANGE */}
                        <Form onSubmit={(e) => getFilteredItems(e)}>
                            <Row>
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

                        </Form>

                        {/* BY BRAND*/}
                        <Dropdown>
                            <Dropdown.Toggle variant="warning">{selectedBrand || "Choose Brand"}</Dropdown.Toggle>

                            <Dropdown.Menu>
                                {brands.map((element) => {
                                    return (
                                        <Dropdown.Item key={element._id} onClick={(e) => { setBrandId(element._id); setSelectedBrand(element.selectedBrand); getFilteredItems(e) }}>{element.brands}</Dropdown.Item>
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