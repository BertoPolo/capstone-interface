import { Form, Button } from "react-bootstrap"
import { useState } from "react"

const BackOfficeItems = () => {
    const [foundedItems, setFoundedItems] = useState([])
    const [title, setTitle] = useState("")


    const searchArticleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items?title=${title}`);

            if (response.status === 200) {
                let data = await response.json();
                setFoundedItems(data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
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