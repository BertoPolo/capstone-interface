import { Dropdown, Button, Form, FormControl, Container, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import MultiRangeSlider from "multi-range-slider-react";
import { addItems } from "../slices/items/itemsSlice"
import { addBrands } from "../slices/brands/brandsSlice"
// import { toggleIsOnCategory, toggleIsOnBrands } from "../slices/sheets/sheetsSlice"


const NavFilter = () => {
    const [searchInput, setSearchinput] = useState("")
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000)
    const [sorting, setSorting] = useState("")
    const [brandId, setBrandId] = useState("")
    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectSorting, setSelectSorting] = useState("")
    // const [minValue, set_minValue] = useState(25);
    // const [maxValue, set_maxValue] = useState(75);


    const brands = useSelector((state) => state.brandsSlice.brands);
    const items = useSelector((state) => state.itemsSlice.items);
    const currentFilters = useSelector((state) => state.itemsSlice.currentFilters)

    const dispatch = useDispatch()


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


    // let filterQuery
    // if filter query is empty then push without &, else push with it 

    const getFilteredItems = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}items?price>${minPrice}&price<${maxPrice}&sort=${sorting}&title=/^${searchInput}/i&brand=${brandId}`);
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
        // getItems()
        getBrands()
    }, [])

    return (
        <>



            <Container className="mt-4">
                <hr />
                <Row>
                    {/* search bar */}
                    <Form inline className="d-flex justify-content-center w-100" onSubmit={(e) => getFilteredItems(e)}>
                        <FormControl type="text" value={searchInput} placeholder="Check if we have it" className="w-25 searchBar" onChange={(e) => setSearchinput(e.target.value)} />
                        <Button variant="outline-dark" className="pointer ml-3" onClick={() => { getRandomItems(); resetStates() }}>Clean filters</Button>
                        {/* <i className="bi bi-search pointer mx-3"></i> */}
                    </Form>
                </Row>
            </Container>

            <Container className="my-3">
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
                        <Col xs={3}>
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

                            <MultiRangeSlider
                                min={0}
                                max={500}
                                step={20}
                                minValue={minPrice}
                                maxValue={maxPrice}
                                style={{ width: '100%', paddingLeft: "4%", paddingRight: "4%" }}
                                onInput={(e) => {
                                    handleInput(e);
                                }}
                                className="d-none d-md-block"
                            />

                            <Form.Control type="number" value={minPrice} min="0" max="500" className="d-md-none mr-1" onChange={(e) => setMinPrice(e.target.value)} />
                            <Form.Control type="number" value={maxPrice} min="0" max="500" className="d-md-none mr-1" onChange={(e) => setMaxPrice(e.target.value)} />
                            {/*  */}
                        </Col>

                        {/*submit button  */}
                        <Col className="d-flex justify-content-center">
                            <Button type="submit" className="d-flex submitButton">Enter Filters</Button>
                        </Col>
                    </Form>

                </Row>
                <hr />
            </Container>


        </>
    )
}




export default NavFilter