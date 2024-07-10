import { Dropdown, Button, Form, FormControl, Container, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import { addItems } from "../slices/items/itemsSlice"
import { addBrands } from "../slices/brands/brandsSlice"


const NavFilter = () => {
    const [searchInput, setSearchinput] = useState("")
    const [maxPrice, setMaxPrice] = useState(1000)
    const [sorting, setSorting] = useState("")
    const [brandId, setBrandId] = useState("")
    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectSorting, setSelectSorting] = useState("")

    const brands = useSelector((state) => state.brandsSlice.brands);
    const items = useSelector((state) => state.itemsSlice.items);
    const currentFilters = useSelector((state) => state.itemsSlice.currentFilters)

    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate()


    const resetStates = () => {
        setSearchinput("")
        setMaxPrice(1000)
        setSelectSorting("")
        setSelectedBrand("")
        setSorting("")
        setBrandId("")
        // setMinPrice(0)

        if (location.pathname === "/home/outlet") {
            getFilteredItems(null, true)
        }
        else {
            getRandomItems()
            navigate("/home")
        }
    }

    const notifyNotFound = () => toast.warn(`OOPS! looks like we don't have anything there`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const getRandomItems = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}items/random`,
            );
            if (response.ok) {
                const data = await response.json();
                dispatch(addItems(data));
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getBrands = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}brands/`);
            const data = await response.json();
            dispatch(addBrands(data));

        } catch (error) {
            console.log(error)
        }
    }

    const getFilteredItems = async (e, fromResetStates = false) => {
        if (e) e.preventDefault();
        const fromOutlet = location.pathname === "/home/outlet";
        try {
            let url = fromResetStates
                //its working but shouldn't be like this? => ? `?isOutlet=true`
                ? `?outlet=true`
                : `?&sort=${encodeURIComponent(sorting)}&title=/^${encodeURIComponent(searchInput)}/i&brand=${encodeURIComponent(brandId)}${fromOutlet ? `&isOutlet="true"` : ""}`
            // price>${encodeURIComponent(minPrice)}&price<${encodeURIComponent(maxPrice)}

            const response = await fetch(`${process.env.REACT_APP_SERVER}items${url}`);
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
        getBrands()
    }, [])

    return (
        <>
            <Container className="mt-3 mb-5">
                {/*<--- XS - SM SCREENS --->*/}
                <Form className="d-flex d-md-none justify-content-center w-100 align-items-center mb-3" onSubmit={(e) => getFilteredItems(e)}>
                    {/* Search bar */}
                    <Row className="w-100">
                        <Col xs={12} className="mb-2">
                            <div className="position-relative">
                                <i className="bi bi-search position-absolute search-icon"></i>
                                <FormControl
                                    type="text"
                                    value={searchInput}
                                    placeholder="Check if we have it"
                                    className="searchBar pl-5 py-3"
                                    onChange={(e) => setSearchinput(e.target.value)}
                                />
                            </div>
                        </Col>
                    </Row>
                </Form>

                <Form className="d-flex d-md-none justify-content-center w-100 align-items-center" onSubmit={(e) => getFilteredItems(e)}>
                    {/* PRICE SORTING */}
                    <Row className="w-100">
                        <Col xs={6} sm={4} className="p-0 mb-2">
                            <Dropdown>
                                <Dropdown.Toggle variant="outline" className="p-0 filterDropdown custom-dropdown-toggle w-100 boxShadowblue" drop="up">
                                    {selectSorting || "Sort by"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="filterDropdown">
                                    <Dropdown.Item onSelect={() => { setSorting("price"); setSelectSorting("Ascendant") }}>Price ascendant</Dropdown.Item>
                                    <Dropdown.Item onSelect={() => { setSorting("-price"); setSelectSorting("Descendant") }}>Price descendant</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        {/* BY BRAND */}
                        <Col xs={6} sm={4} className="p-0 mb-2">
                            <Dropdown>
                                <Dropdown.Toggle className="p-0 filterDropdown w-100 boxShadowblue" variant="outline">
                                    {selectedBrand || "Brand"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="filterDropdown">
                                    {brands.map((element) => (
                                        <Dropdown.Item key={element._id} value={element._id} onClick={() => { setSelectedBrand(element.brands); setBrandId(element._id) }}>
                                            {element.brands}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        {/* Submit buttons */}
                        <Col xs={12} sm={4} className="d-flex justify-content-center p-0">
                            <Button type="submit" className="d-flex submitButton mr-2 btn-sm py-2 px-3 boxShadowblue"><b>Enter</b></Button>
                            <Button variant="outline-dark" className="pointer btn-sm py-2 px-3" onClick={() => { resetStates() }}><b>Clean</b></Button>
                        </Col>
                    </Row>
                </Form>

                {/*<--- FROM MD SCREENS --->*/}
                <Row>
                    <Form className="d-none d-md-flex justify-content-between w-100 align-items-center" onSubmit={(e) => getFilteredItems(e)}>
                        {/* Search bar */}
                        <Col md={4} className="mb-0">
                            <div className="position-relative">
                                <i className="bi bi-search position-absolute search-icon"></i>
                                <FormControl
                                    type="text"
                                    value={searchInput}
                                    placeholder="Check if we have it"
                                    className="searchBar pl-5 py-3"
                                    onChange={(e) => setSearchinput(e.target.value)}
                                />
                            </div>
                        </Col>

                        {/* PRICE SORTING */}
                        <Col md={{ span: 1, offset: 2 }} className="p-0 mb-0">
                            <Dropdown>
                                <Dropdown.Toggle variant="outline" className=" p-0 filterDropdown custom-dropdown-toggle w-100 boxShadowblue" drop="up">
                                    {selectSorting || "Sort by"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="filterDropdown">
                                    <Dropdown.Item onSelect={() => { setSorting("price"); setSelectSorting("Ascendant") }}>Price ascendant</Dropdown.Item>
                                    <Dropdown.Item onSelect={() => { setSorting("-price"); setSelectSorting("Descendant") }}>Price descendant</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        {/* BY BRAND */}
                        <Col md={1} className="p-0 mb-0">
                            <Dropdown>
                                <Dropdown.Toggle className="p-0 filterDropdown w-100 boxShadowblue" variant="outline">
                                    {selectedBrand || "Brand"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="filterDropdown">
                                    {brands.map((element) => (
                                        <Dropdown.Item key={element._id} value={element._id} onClick={() => { setSelectedBrand(element.brands); setBrandId(element._id) }}>
                                            {element.brands}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        {/* Submit buttons */}
                        <Col className="d-flex justify-content-center p-0">
                            <Button type="submit" className="d-flex submitButton mr-2 btn-sm py-2 px-3 boxShadowblue"><b>Enter</b></Button>
                            <Button variant="outline-dark" className="pointer btn-sm py-2 px-3" onClick={() => { resetStates() }}><b>Clean</b></Button>
                        </Col>

                    </Form>
                </Row>
            </Container>
        </>
    )
}




export default NavFilter