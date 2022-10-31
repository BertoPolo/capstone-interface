import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const BackOfficeItems = () => {
    const [foundedItems, setFoundedItems] = useState([])
    const [title, setTitle] = useState("")

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
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items?title=${title}`);

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
                            <span><b>{element.title}</b></span>
                            {/* on click open dropdown with a filled form to edit it */}
                            <i className="bi bi-trash3 pointer"></i>
                            <i className="bi bi-pencil"></i>

                            <hr />
                        </div>
                    )
                })
            }
        </>
    )
}

export default BackOfficeItems