import { Dropdown, Button, Form, FormControl, Container, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import MultiRangeSlider from "multi-range-slider-react";
import { addItems } from "../slices/items/itemsSlice"
import { addBrands } from "../slices/brands/brandsSlice"


const NavFilter = () => {
    const [searchInput, setSearchinput] = useState("")
    const [minPrice, setMinPrice] = useState(0)
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


    const handleInput = (e) => {
        setMinPrice(e.minValue);
        setMaxPrice(e.maxValue);
    }

    const resetStates = () => {
        setSearchinput("")
        setMaxPrice(1000)
        setMinPrice(0)
        setSelectSorting("")
        setSelectedBrand("")
        setSorting("")
        setBrandId("")

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
        autoClose: 2500,
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


    // let filterQuery ( example :  if searchInput is true => push " &title=/^${searchInput}/i" to "filterQuery")
    // if filter query is empty then push without &, else push with it 
    //let filterQuery =""
    //if (minPrice) filterQuery= filterQuery+"price>"${minPrice}  and so on..
    // ${filterQuery}
    // price>${minPrice}&price<${maxPrice}&sort=${sorting}&title=/^${searchInput}/&brand=${brandId}

    const getFilteredItems = async (e, fromResetStates = false) => {
        if (e) e.preventDefault();
        const fromOutlet = location.pathname === "/home/outlet";
        try {
            let url = fromResetStates
                //its working but shouldn't be like this? => ? `?isOutlet=true`
                ? `?outlet=true`
                : `?price>${encodeURIComponent(minPrice)}&price<${encodeURIComponent(maxPrice)}&sort=${encodeURIComponent(sorting)}&title=/^${encodeURIComponent(searchInput)}/i&brand=${encodeURIComponent(brandId)}${fromOutlet ? `&isOutlet="true"` : ""}`

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



            <Container className="mt-4">
                <hr />
                <Row>
                    {/* search bar */}
                    <Form inline className="d-flex justify-content-center w-100 mb-3" onSubmit={(e) => getFilteredItems(e)}>
                        <FormControl type="text" value={searchInput} placeholder="Check if we have it" className="searchBar centered-placeholder" onChange={(e) => setSearchinput(e.target.value)} />
                        {/* <i className="bi bi-search pointer mx-3"></i> */}
                    </Form>
                </Row>
            </Container>

            <Container className="mt-3 mb-5">
                <Row>
                    <Form className="d-flex justify-content-between w-100 align-items-center" onSubmit={(e) => getFilteredItems(e)}>
                        {/*PRICE SORTING */}
                        <Col xs={3} className="p-0">
                            <Dropdown >
                                <Dropdown.Toggle variant="outline" >{selectSorting || "Sorting by"}</Dropdown.Toggle>
                                <Dropdown.Menu title="Price sorting" id="basic-nav-dropdown">
                                    <Dropdown.Item onSelect={() => { setSorting("price"); setSelectSorting("Ascendant") }}>Price ascendant</Dropdown.Item>
                                    <Dropdown.Item onSelect={() => { setSorting("-price"); setSelectSorting("Descendant") }}>Price descendant</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>
                        {/* BY BRAND*/}
                        <Col xs={2}>
                            <Dropdown >
                                <Dropdown.Toggle variant="outline">{selectedBrand || "Brand"}</Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {brands.map((element) => {
                                        return (
                                            <Dropdown.Item key={element._id} value={element._id} onClick={() => { setSelectedBrand(element.brands); setBrandId(element._id) }} >{element.brands}</Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>
                        {/* BY PRICE RANGE */}
                        <Col xs={3}>
                            {/* from md screens */}
                            <MultiRangeSlider
                                min={0}
                                max={500}
                                step={20}
                                minValue={minPrice}
                                maxValue={maxPrice}
                                onInput={(e) => {
                                    handleInput(e);
                                }}
                                className="d-none d-md-block border-0 shadow-none p-0 "
                            />


                            {/* <Row className="d-xs-none">
                                <Form.Label className="align-center m-0 d-xs-none"> Min Price</Form.Label>
                                <Form.Control type="number" value={minPrice} min="0" max="500" className="d-xs-none d-md-block w-25 mr-1" onChange={(e) => setMinPrice(e.target.value)} />
                                <Form.Control type="number" value={maxPrice} min="0" max="500" className="d-xs-none d-md-block w-25" onChange={(e) => setMaxPrice(e.target.value)} />
                                <Form.Label className="m-0 d-xs-none"> Max Price</Form.Label>
                            </Row> */}
                            {/*  */}
                            {/* smaller screns */}
                            <Form.Control type="number" value={minPrice} min="0" max="500" className="d-md-none mr-1" onChange={(e) => setMinPrice(e.target.value)} />
                            <Form.Control type="number" value={maxPrice} min="0" max="500" className="d-md-none mr-1" onChange={(e) => setMaxPrice(e.target.value)} />
                            {/*  */}
                        </Col>

                        {/*submit button  */}
                        <Col className="d-flex justify-content-center">
                            <Button variant="outline-dark" className="pointer btn-sm" onClick={() => { resetStates() }}>Clean filters</Button>
                            <Button type="submit" className="d-flex submitButton ml-3 btn-sm">Enter Filters</Button>

                        </Col>
                    </Form>

                </Row>
            </Container>

            <hr />

        </>
    )
}




export default NavFilter