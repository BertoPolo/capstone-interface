import { Form, Button, Dropdown, } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addBrands } from "../slices/brands/brandsSlice"
import { addCategories } from "../slices/categories/categoriesSlice"
import { addMainCategories } from "../slices/mainCategories/mainCategoriesSlice"



const BackOficceNewItem = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [img, setImg] = useState(null)
    const [mainCategory, setMainCategory] = useState("")
    const [category, setCategory] = useState("")
    const [brand, setBrand] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [fullDescription, setFullDescription] = useState("")
    const [isItOutlet, setIsItOutlet] = useState(false)
    const [newBrandInput, setNewBrandInput] = useState("")
    const [itemId, setItemId] = useState("")

    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedMainCategory, setSelectedMainCategory] = useState("")

    const brands = useSelector((state) => state.brandsSlice.brands);
    const categories = useSelector((state) => state.categoriesSlice.categories);
    const mainCategories = useSelector((state) => state.mainCategoriesSlice.mainCategories);

    const dispatch = useDispatch();

    const notifyError = () => toast.error('Check the form again, looks like you forgot something', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })

    const notify = () => toast.success(`Item created!,upload it's image now`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


    const getBrands = async () => {
        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}brands/all`);
            const data = await response.json();
            if (data) dispatch(addBrands(data));
        } catch (error) {
            console.log(error)
        }
    }

    const getCategories = async () => {
        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}categories/all`);
            const data = await response.json();
            if (data) dispatch(addCategories(data));
            console.log(data)


        } catch (error) {
            console.log(error)
        }
    }

    const getMainCategories = async () => {
        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}mainCategories/all`);
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
            category: category,
            isOutlet: isItOutlet,
            description: shortDescription,
            fullDescription: fullDescription
        }

        try {
            const res = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items/new`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
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
                setShortDescription("")
                setFullDescription("")

                notify()
            }
            else {
                notifyError("error")
            }


        } catch (error) {
            console.log(error)
        }


    }

    const postImg = async () => {

        try {
            const res = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items/${itemId}/img`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(img)
                }
            );

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
            const res = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}brands/new`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(brandBody)
                }
            );
            if (res.status === 201) {
                getBrands()
                setNewBrandInput("")
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
        <>
            {/* Toast */}
            <ToastContainer position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />

            {/* Post new item */}
            < Form className="d-flex justify-content-center flex-column" onSubmit={(e) => addNewArticleSubmit(e)}> {/* check onSubmit */}
                <h4 className="mb-3" > Add a new article</h4 >

                <Form.Group>

                    <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Form.Control type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <Form.Control type="text" placeholder="Short Description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
                    <Form.Control as="textarea" rows={3} placeholder="Full Description" value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} />
                    <Form.Check type="checkbox" label="Outlet" value={isItOutlet} onChange={(e) => setIsItOutlet(!isItOutlet)} />

                </Form.Group>

                <Form.Group className="d-flex justify-content-around">

                    <Dropdown>
                        <Dropdown.Toggle variant="warning">{selectedBrand || "Choose"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brands.map((element) => {
                                return (
                                    <Dropdown.Item key={element._id} onClick={() => { setSelectedBrand(element.brands); setBrand(element._id) }}>{element.brands}</Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="warning">{selectedMainCategory || "Choose"}</Dropdown.Toggle>

                        <Dropdown.Menu>
                            {mainCategories.map((element) => {
                                return (
                                    <Dropdown.Item key={element._id} onClick={() => { setSelectedMainCategory(element.mainCategories); setMainCategory(element._id) }}>{element.mainCategories}</Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="warning">{selectedCategory || "Choose"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categories.map((element) => {
                                return (
                                    <Dropdown.Item key={element._id} onClick={() => { setSelectedCategory(element.categories); setCategory(element._id) }}>{element.categories}</Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>

                <Button type="submit" className=""> Submit </Button>
            </Form >

            {/* create a new brand */}
            <Form onSubmit={(e) => createNewBrand(e)}>
                <Form.Control type="text" placeholder="New Brand" value={newBrandInput} onChange={(e) => setNewBrandInput(e.target.value)} />
                <Button type="submit"> Submit </Button>

            </Form>

            {/* Post item's image */}
            <input className="mt-5" type="file" label="Add An Image" accept=",.jpg,.jpeg,.png" onChange={() => setImg(img)} />


            <Button variant="primary" disabled={!itemId} onClick={() => postImg()}>Upload image</Button>



        </>
    )
}

export default BackOficceNewItem