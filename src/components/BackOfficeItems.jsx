import { Form, Button, Row, Container } from "react-bootstrap"
import { useState } from "react"
import { toast } from 'react-toastify';
import { useSelector } from "react-redux"




const BackOfficeItems = () => {

    const token = useSelector((state) => state.usersSlice.token);

    const [foundItems, setFoundItems] = useState([])
    const [searchByTitle, setSearchByTitle] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [isOutlet, setIsOutlet] = useState(false)
    const [smallDescription, setSmallDescription] = useState("")
    const [fullDescription, setFullDescription] = useState("")
    const [image, setImage] = useState(null)
    const [outletPrice, setOutletPrice] = useState(0)
    const [itemId, setItemId] = useState(null)


    const resetStates = () => {
        setTitle("")
        setPrice(0)
        setIsOutlet(false)
        setSmallDescription("")
        setFullDescription("")
        setImage("")
        setOutletPrice(0)
        setItemId(null)

        setFoundItems([])
        setSearchByTitle("")
        setIsEditing(false)
    }

    const notifyUpdated = () => toast.success('item updated!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const notifyError = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })

    const notifyOk = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })


    const searchArticleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}items?title=/^${searchByTitle}/i`,
                {
                    headers: {
                        'Content-Type': 'application',
                        "Authorization": "Bearer " + token
                    }
                });

            if (res.ok) {
                const data = await res.json();
                setFoundItems(data)
                setSearchByTitle("")

                // data.forEach(element => {
                //     setTitle(current => [...current, element.title])
                //     setPrice(cur => [...cur, element.price])
                //     seIsOutlet(c => [...c, element.isOutlet])
                //     setSmallDescription(curren => [...curren, element.smallDescription])
                //     setFullDescription(curr => [...curr, element.fullDescription])
                //     setImageUrl(cu => [...cu, element.image])
                // });

            } else notifyError(`Check if you writted it right, cause looks like we don't have anything with this name`,)

        } catch (error) {
            console.log(error)
        }
    }

    const getItem = async (article) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}items?_id=${article}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if (res.status === 200) {
                const data = await res.json();
                setItemId(data[0]._id)
                setTitle(data[0].title);
                setPrice(data[0].price)
                setOutletPrice(data[0].outletPrice)
                if (data[0].isOutlet) setIsOutlet(data[0].isOutlet)
                setSmallDescription(data[0].description)
                setFullDescription(data[0].fullDescription)


            }
            // else

        } catch (error) {
            console.log(error)
        }
    }

    const editItem = async (e) => {
        e.preventDefault()
        const body = {
            title: title,
            price: price,
            isOutlet: isOutlet,
            outletPrice: outletPrice,
            description: smallDescription,
            fullDescription: fullDescription
        }
        try {
            const res = await fetch(
                `${process.env.REACT_APP_SERVER}items/${itemId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },

                    body: JSON.stringify(body),
                }
            );
            if (res.ok) {
                resetStates()
                notifyUpdated()
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

    const deleteItem = async (id) => {

        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER}items/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                }
            );
            if (response.ok) {
                notifyOk("client deleted")
                const updatedItems = foundItems.filter(user => user._id !== id);
                setFoundItems(updatedItems)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>

            <Container fluid>

                {/* Search item */}
                {!isEditing && < Form onSubmit={(e) => searchArticleSubmit(e)}>
                    <div className="d-flex justify-content-center flex-column">
                        <h4 className="mb-3" >Search an article</h4>

                        <Form.Group>
                            <Form.Control className="w-25" type="text" placeholder="Name" value={searchByTitle} onChange={(e) => setSearchByTitle(e.target.value)} />
                        </Form.Group>
                    </div>

                    <Button className="submitButton" type="submit" disabled={!searchByTitle}>Submit</Button>
                </Form >}

                {!isEditing && <h4 className="my-3" > <u>Results</u></h4>}


                {foundItems && <div>

                    {isEditing ?
                        <>
                            <h4 className="mb-3">Modify this article</h4>

                            <Form onSubmit={(e) => postImg(e)}>
                                <Form.Label> Set a new image</Form.Label>
                                <Form.Control type="file" accept=",.jpg,.jpeg,.png" onChange={(e) => setImage(e.target.files[0])} />
                                <Button className="submitButton mt-2" type="submit" disabled={!image} >Upload</Button>

                            </Form>

                            <Form onSubmit={(e) => editItem(e)}>
                                <Form.Row>
                                    <Form.Group className="mr-2">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Name" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group>
                                    <Form.Label>Outlet Price</Form.Label>
                                    <Form.Control type="number" placeholder="Price" value={outletPrice} onChange={(e) => setOutletPrice(e.target.value)} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Is Outlet?</Form.Label>
                                    <Form.Check type="checkbox" checked={isOutlet} onChange={(e) => setIsOutlet(!isOutlet)} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Small Description</Form.Label>
                                    <Form.Control type="text" placeholder="Small Description" value={smallDescription} onChange={(e) => setSmallDescription(e.target.value)} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Full Description</Form.Label>
                                    <Form.Control type="text" placeholder="Full Description" value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} />
                                </Form.Group>

                                <div className="d-flex">
                                    <Button className="submitButton" type="submit"> Submit </Button>
                                    <Button variant="warning" onClick={() => { if (window.confirm(`Are you sure you don't wish save your changes?`)) { resetStates(); setIsEditing(false) } }} >Cancel</Button>
                                </div>
                            </Form>


                        </>
                        :
                        <div>
                            {foundItems.map((element) => {

                                return (

                                    <div key={element._id}>
                                        <span><b>{element.title}</b></span>

                                        <i className="bi bi-pencil ml-4 mr-3 pointer bg-success p-1 text-white" onClick={() => { setIsEditing(true); getItem(element._id) }}></i>
                                        <i className="bi bi-trash3 pointer bg-danger p-1 text-white" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteItem(element._id) }}></i>

                                        <ul>
                                            {/* <li>{element.category}€</li>
                                            <li>{element.mainCategory}€</li>
                                        <li>{element.brand}€</li> */}
                                            <li>{element.price}€</li>
                                            <li>{element.isOutlet ? <span>It is outlet an item and it's price is <u>{element.outletPrice}€</u></span> : <span> it is not outlet an item</span>}</li>
                                            <li>{element.description}</li>
                                            <li>{element.fullDescription}</li>
                                            <li>{element.image}</li>
                                        </ul>
                                        <hr />
                                    </div>
                                )
                            })}

                        </div>}

                </div>}


            </Container>
        </>
    )
}

export default BackOfficeItems