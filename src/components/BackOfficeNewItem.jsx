import { Container, Form, Button, Dropdown, Row, Col, Modal } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';
import { addBrands } from "../slices/brands/brandsSlice"
import { addCategories } from "../slices/categories/categoriesSlice"
import { addMainCategories } from "../slices/mainCategories/mainCategoriesSlice"



const BackOficceNewItem = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0.00)
    const [image, setImage] = useState(null)
    const [mainCategory, setMainCategory] = useState("")
    const [outletPrice, setOutletPrice] = useState(0.00)
    const [category, setCategory] = useState("")
    const [brand, setBrand] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [fullDescription, setFullDescription] = useState("")
    const [isItOutlet, setIsItOutlet] = useState(false)
    const [itemId, setItemId] = useState(null)
    const [newBrandInput, setNewBrandInput] = useState("")
    const [newCategoryInput, setNewCategoryInput] = useState("")
    const [newMainCategoryInput, setNewMainCategoryInput] = useState("")
    const [mcatForCatCreation, setMcatForCatCreation] = useState({})
    const [showBrand, setShowBrand] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [showMainCategory, setShowMainCategory] = useState(false);



    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedMainCategory, setSelectedMainCategory] = useState("")

    const brands = useSelector((state) => state.brandsSlice.brands);
    const categories = useSelector((state) => state.categoriesSlice.categories);
    const mainCategories = useSelector((state) => state.mainCategoriesSlice.mainCategories);
    const token = useSelector((state) => state.usersSlice.token);

    const dispatch = useDispatch();

    //Modal
    const handleShowBrand = () => setShowBrand(true);
    const handleCloseBrand = () => setShowBrand(false);

    const handleShowCategory = () => setShowCategory(true);
    const handleCloseCategory = () => setShowCategory(false);

    const handleShowMainCategory = () => setShowMainCategory(true);
    const handleCloseMainCategory = () => setShowMainCategory(false);

    // Toasters
    const notifyError = () => toast.error('Check the form again, looks like you forgot something', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })

    const notify = () => toast.success(`Item created!,upload it's image now`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const notifyOk = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


    const getBrands = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}brands/`);
            const data = await response.json();
            if (data) dispatch(addBrands(data));
        } catch (error) {
            console.log(error)
        }
    }

    const getCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}categories/all`);
            const data = await response.json();
            if (data) dispatch(addCategories(data));


        } catch (error) {
            console.log(error)
        }
    }

    const getMainCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}mainCategories/all`);
            const data = await response.json();
            if (data) dispatch(addMainCategories(data));

        } catch (error) {
            console.log(error)
        }
    }

    const addNewArticleSubmit = async (e) => {
        e.preventDefault()

        let body = {
            title: name,
            price: price,
            brand: brand,
            mainCategory: mainCategory,
            outletPrice: outletPrice,
            isOutlet: isItOutlet,
            description: shortDescription,
            fullDescription: fullDescription
        }
        if (category) body.category = category

        try {
            const res = await fetch(
                `${process.env.REACT_APP_SERVER}items`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(body),
                }
            );

            if (res.status === 201) {
                const data = await res.json();
                setItemId(data)
                setName("")
                setPrice("")
                setMainCategory("")
                setCategory("")
                setBrand("")
                setIsItOutlet(false)
                setOutletPrice(0)
                setShortDescription("")
                setFullDescription("")
                setSelectedBrand("")
                setSelectedCategory("")
                setSelectedMainCategory("")

                notify()
            }
            else {
                notifyError("error")
            }


        } catch (error) {
            console.log(error)
        }


    }

    const postImg = async (e) => {
        e.preventDefault()
        try {

            const data = new FormData();
            data.append("image", image)

            const res = await fetch(
                `${process.env.REACT_APP_SERVER}items/${itemId}/img`,
                {
                    method: "PUT",
                    body: data,
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );
            if (res.ok) {
                setImage("")
                setItemId("")
                notifyOk("image uploaded")

            } else notifyError("oops, something happened")

        } catch (error) {
            console.log(error)
        }
    }


    const createNewBrand = async (e) => {
        e.preventDefault()
        const brandBody = {
            brands: newBrandInput
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}brands/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(brandBody)
                }
            );
            if (res.status === 201) {
                getBrands()
                setNewBrandInput("")
                notifyOk("Brand created successfully")

            }

        } catch (error) {
            console.log(error)
        }
    }


    const createNewCategory = async (e) => {
        e.preventDefault()
        const categoryBody = {
            categories: newCategoryInput,
            mainCategory: mcatForCatCreation._id
        }

        try {
            const res = await fetch(
                `${process.env.REACT_APP_SERVER}categories/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(categoryBody)
                }
            );

            if (res.ok) {
                setNewCategoryInput("")
                setMcatForCatCreation("")
                getCategories()
                notifyOk("Category created successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const createNewMainCategory = async (e) => {
        e.preventDefault()
        const mCatBody = {
            mainCategory: newMainCategoryInput
        }
        try {
            const res = await fetch(
                `${process.env.REACT_APP_SERVER}mainCategories/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(mCatBody)
                }
            );
            if (res.status === 201) {
                getMainCategories()
                setNewMainCategoryInput("")
                getMainCategories()
                notifyOk("Main Category created successfully")
            }

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getBrands()
        getCategories()
        getMainCategories()
    }, [])


    return (
        <Container fluid className="mb-4">

            <h4 className="mb-3" > Add a new article</h4 >

            <Row>

                {/* Create a new brand */}
                <Col>

                    <Button variant="info" onClick={handleShowBrand}>
                        Create a new Brand
                    </Button>

                    <Modal show={showBrand} onHide={handleCloseBrand}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create a new Brand</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e) => createNewBrand(e)}>
                                <Form.Control type="text" placeholder="New brand" value={newBrandInput} onChange={(e) => setNewBrandInput(e.target.value)} />
                                <Button className="submitButton mt-2 submitButton" type="submit">Create</Button>
                                {/* createdBrand && <span className="text-success">{createdBrand}</span> */}

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleCloseBrand}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>

                {/* Create a new main category */}
                <Col>

                    <Button variant="info" onClick={handleShowMainCategory}>
                        Create a new main category
                    </Button>

                    <Modal show={showMainCategory} onHide={handleCloseMainCategory}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create a new main category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e) => createNewMainCategory(e)}>
                                <Form.Control type="text" placeholder="New main category" value={newMainCategoryInput} onChange={(e) => setNewMainCategoryInput(e.target.value)} />
                                <Button className="submitButton mt-2" variant="outline" type="submit">Create</Button>
                                {/* createdMainCategory && <span className="text-success">{createdMainCategory}</span> */}

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleCloseMainCategory}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>

                {/* Create a new category */}
                <Col>

                    <Button variant="info" onClick={handleShowCategory}>
                        Create a new  category
                    </Button>

                    <Modal show={showCategory} onHide={handleCloseCategory}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create a new category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e) => createNewCategory(e)}>
                                <Form.Control type="text" placeholder="New category" value={newCategoryInput} onChange={(e) => setNewCategoryInput(e.target.value)} />
                                {/* disabled={!mcatForCatCreation} */}
                                <Dropdown>
                                    <Dropdown.Toggle className="mt-2" variant="success">{mcatForCatCreation.mainCategory || "Choose Main Category"}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {mainCategories.map((element) => {
                                            return (
                                                <Dropdown.Item key={element._id} onClick={() => setMcatForCatCreation(element)}>{element.mainCategory}</Dropdown.Item>
                                            )
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Button className="submitButton mt-2" variant="outline" type="submit">Create</Button>
                                {/* createdCategory && <span className="text-success">{createdCategory}</span> */}

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleCloseCategory}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>


                </Col>



            </Row>

            <hr />

            {/* Post new item */}
            < Form onSubmit={(e) => addNewArticleSubmit(e)}> {/* check onSubmit */}

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Full Description</Form.Label>
                        <textarea className="form-control" rows={3} value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} ></textarea>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
                    </Form.Group>
                </Row>

                <Form.Group >
                    <Form.Check type="checkbox" label=" Is in Outlet?" className="mt-2" value={isItOutlet} onChange={(e) => setIsItOutlet(!isItOutlet)} />

                    {isItOutlet && <>
                        <Form.Label className="mt-2">Outlet Price</Form.Label>
                        <Form.Control style={{ "width": "10%" }} type="number" value={outletPrice} min="0" onChange={(e) => setOutletPrice(e.target.value)} /></>}
                </Form.Group>

                {/* Choose brand,category and M.category */}
                <Container>
                    <Form.Group className="d-flex justify-content-around">
                        <Col xs={4}>
                            <Dropdown>
                                <Dropdown.Toggle variant="warning">{selectedBrand || "Choose Brand"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {brands.map((element) => {
                                        return (
                                            <Dropdown.Item key={element._id} onClick={() => { setSelectedBrand(element.brands); setBrand(element._id) }}>{element.brands}</Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        <Col xs={4}>
                            <Dropdown>
                                <Dropdown.Toggle variant="warning">{selectedMainCategory || "Choose Main Category"}</Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {mainCategories.map((element) => {
                                        return <Dropdown.Item key={element._id} onClick={() => { setSelectedMainCategory(element.mainCategory); setMainCategory(element._id) }}>{element.mainCategory}</Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        <Col xs={4}>
                            <Dropdown>
                                <Dropdown.Toggle variant="warning">{selectedCategory || "Choose Category"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {categories.map((element) => {
                                        return (
                                            <Dropdown.Item key={element._id} onClick={() => { setSelectedCategory(element.categories); setCategory(element._id) }}>{element.categories}</Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Form.Group>
                </Container>

                <Button className="submitButton" variant="outline" type="submit"> Submit </Button>
            </Form >
            <hr />
            {/* Post item's image */}
            <Form onSubmit={(e) => postImg(e)} className="mt-3">
                <Form.Label> Set an image</Form.Label>
                <Form.Control type="file" accept=",.jpg,.jpeg,.png" onChange={(e) => setImage(e.target.files[0])} />
                <Button className="submitButton mt-3" variant="outline" type="submit" disabled={!image && !itemId}>Upload</Button>
            </Form>

        </Container >
    )
}

export default BackOficceNewItem