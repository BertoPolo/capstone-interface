import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const BackOfficeItems = () => {
    const [foundItems, setFoundItems] = useState([])
    const [searchByTitle, setSearchByTitle] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [isOutlet, setIsOutlet] = useState(false)
    const [smallDescription, setSmallDescription] = useState("")
    const [fullDescription, setFullDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [outletPrice, setOutletPrice] = useState(0)
    const [itemId, setItemId] = useState(null)


    const resetStates = () => {
        setTitle("")
        setPrice(0)
        setIsOutlet(false)
        setSmallDescription("")
        setFullDescription("")
        setImageUrl("")
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

    const notifyError = () => toast.error(`Check if you writted it right, cause looks like we don't have anything with this name`, {
        position: "top-center",
        autoClose: 3000,
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
            const res = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items?title=${searchByTitle}`);

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

            } else notifyError()

        } catch (error) {
            console.log(error)
        }
    }
    const getItem = async (article) => {
        try {
            const res = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items?_id=${article}`);

            if (res.status === 200) {
                const data = await res.json();
                setItemId(data[0]._id)
                setTitle(data[0].title);
                setPrice(data[0].price)
                setOutletPrice(data[0].outletPrice)
                if (data[0].isOutlet) setIsOutlet(data[0].isOutlet)
                setSmallDescription(data[0].description)
                setFullDescription(data[0].fullDescription)
                setImageUrl(data[0].image)
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
            image: imageUrl,
            isOutlet: isOutlet,
            outletPrice: outletPrice,
            description: smallDescription,
            fullDescription: fullDescription
        }
        try {
            const res = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items/edit/${itemId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
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


    const deleteItem = async (id) => {

        try {
            const response = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            {/* Toast */}
            <ToastContainer
                position="top-center"
                autoClose={3000}
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

            {/* Search item */}
            < Form className="d-flex justify-content-center flex-column" onSubmit={(e) => searchArticleSubmit(e)}> {/* check onSubmit if its calling the right function */}
                <h4 className="mb-3" >Search an article</h4>


                <Form.Group>
                    <Form.Control type="text" placeholder="Name" value={searchByTitle} onChange={(e) => setSearchByTitle(e.target.value)} />
                </Form.Group>


                <Button type="submit">Submit</Button>
            </Form >

            <h4 className="my-3" > <u>Results</u></h4>


            {foundItems && <div>

                {isEditing ?
                    <Form onSubmit={(e) => editItem(e)}>
                        <h4 className="mb-3">Modify this article</h4>

                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Price" value={outletPrice} onChange={(e) => setOutletPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Is Outlet?</Form.Label>
                            <Form.Control type="checkbox" checked={isOutlet} onChange={(e) => setIsOutlet(!isOutlet)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Small Description</Form.Label>
                            <Form.Control type="text" placeholder="Small Description" value={smallDescription} onChange={(e) => setSmallDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Full Description</Form.Label>
                            <Form.Control type="text" placeholder="Full Description" value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            {/* change it for ADD IMAGE */}
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                        </Form.Group>

                        <div className="d-flex">
                            <Button type="submit"> Submit </Button>
                            <Button variant="warning" onClick={() => { if (window.confirm(`Are you sure you don't wish save your changes?`)) { resetStates(); setIsEditing(false) } }} >Cancel</Button>
                        </div>
                    </Form>

                    :
                    <div>
                        {foundItems.map((element) => {

                            return (

                                <div key={element._id}>
                                    <span><b>{element.title}</b></span>

                                    <i className="bi bi-pencil ml-4 mr-3" onClick={() => { setIsEditing(true); getItem(element._id) }}></i>
                                    <i className="bi bi-trash3 pointer" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteItem(element._id) }}></i>

                                    <ul>
                                        <li>{element.price}€</li>
                                        {/* <li>{element.category}€</li> */}
                                        {/* <li>{element.mainCategory}€</li> */}
                                        {/* <li>{element.brand}€</li> */}
                                        <li>{element.isOutlet ? <span>is in outlet</span> : <span> is not in outlet</span>}</li>
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


        </>
    )
}

export default BackOfficeItems