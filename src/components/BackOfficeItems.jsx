import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const BackOfficeItems = () => {
    const [foundedItems, setFoundedItems] = useState([])
    const [title, setTitle] = useState("")
    const [isEditing, setIsEditing] = useState(false)

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
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items?title=${title}&sort=title`);

            if (response.status === 200) {
                const data = await response.json();
                if (!data) notifyError()
                else {
                    setFoundedItems(data)
                    setTitle("")
                }

            }
        } catch (error) {
            console.log(error)
        }
    }

    let editItem


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
                    <Form.Control type="text" placeholder="Name" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>


                <Button type="submit">Submit</Button>
            </Form >

            <h4 className="" > <u>Results</u></h4>

            {
                foundedItems && foundedItems.map((element) => {
                    return (
                        <div key={element._id}>
                            {isEditing ?
                                <>
                                    <span><b>{element.title}</b></span>

                                    <i className="bi bi-pencil ml-4 mr-3" onClick={setIsEditing(true)}></i>
                                    <i className="bi bi-trash3 pointer"></i>

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
                                </>
                                :
                                <Form onSubmit={(e) => editItem(e)}>
                                    <h4 className="mb-3">Modify your data</h4>

                                    {<Form.Group>
                                        <Form.Control type="text" placeholder="Full Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                                        fill from redux when search
                                    </Form.Group>}

                                    <div className="d-flex">
                                        <Button type="submit"> Submit </Button>
                                    </div>
                                </Form>
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