import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const BackOfficeItems = () => {
    const [foundedItems, setFoundedItems] = useState([])
    const [searchByTitle, setSearchByTitle] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [isOutlet, seIsOutlet] = useState(false)
    const [smallDescription, setSmallDescription] = useState("")
    const [fullDescription, setFullDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")


    const notifyError = () => toast.error(`Check if you writted it right, cause looks like we don't have anything with this name`, {
        position: "top-center",
        autoClose: 4000,
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
            const response = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items?title=${searchByTitle}&sort=title`);

            if (response.status === 200) {
                const data = await response.json();
                if (!data) notifyError()
                else {
                    setFoundedItems(data)
                    setSearchByTitle("")
                }

            }
        } catch (error) {
            console.log(error)
        }
    }

    const editItem = (e) => {
        // e.preventDefault 
        console.log("edit function")
    }
    const deleteItem = () => console.log("delete function")


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

            {/* Search item */}
            < Form className="d-flex justify-content-center flex-column" onSubmit={(e) => searchArticleSubmit(e)}> {/* check onSubmit if its calling the right function */}
                <h4 className="mb-3" >Search an article</h4>


                <Form.Group>
                    <Form.Control type="text" placeholder="Name" value={searchByTitle} onChange={(e) => setSearchByTitle(e.target.value)} />
                </Form.Group>


                <Button type="submit">Submit</Button>
            </Form >

            <h4 className="my-3" > <u>Results</u></h4>

            {
                foundedItems && foundedItems.map((element) => {
                    return (
                        <div key={element._id}>
                            {isEditing ?

                                <Form onSubmit={(e) => editItem(e)}>
                                    <h4 className="mb-3">Modify your data</h4>
                                    {/* fetch=> fill state 
change placeholders
function to edit
style */}
                                    <Form.Group>
                                        <Form.Control type="text" placeholder="Full Name" value={element.title} onChange={(e) => setTitle(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="text" placeholder="Full Name" value={element.title} onChange={(e) => setPrice(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="checkbox" placeholder="Full Name" value={element.title} onChange={(e) => seIsOutlet(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="text" placeholder="Full Name" value={element.title} onChange={(e) => setSmallDescription(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="text" placeholder="Full Name" value={element.title} onChange={(e) => setFullDescription(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="text" placeholder="Full Name" value={element.title} onChange={(e) => setImageUrl(e.target.value)} />
                                    </Form.Group>

                                    <div className="d-flex">
                                        <Button type="submit"> Submit </Button>
                                        <Button variant="warning" onClick={() => { if (window.confirm(`Are you sure you don't wish save your changes?`)) setIsEditing(false) }} >Cancel</Button>
                                    </div>
                                </Form>
                                :
                                <div>
                                    <span><b>{element.title}</b></span>

                                    <i className="bi bi-pencil ml-4 mr-3" onClick={() => setIsEditing(true)}></i>
                                    <i className="bi bi-trash3 pointer" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteItem() }}></i>

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
                                </div>
                            }
                            <hr />
                        </div>
                    )
                })
            }
        </>
    )
}

export default BackOfficeItems