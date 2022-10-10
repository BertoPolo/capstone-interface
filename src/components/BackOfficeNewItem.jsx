import { Form, Button } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import { useState } from "react"


const BackOficceNewItem = () => {

    const [uploaded, setUploaded] = useState(false)

    const addNewArticleSubmit = async (e) => {
        e.preventDefault()
        let body
        //send photo with separated fetch
        let photo

        try {
            const res = await fetch(
                // userNameInput should be changed to username
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(body),
                }
            );
            if (res.status === 201) {
                // const data = await res.json();
                // navigate("/home")
                setUploaded(true)
                setTimeout(setUploaded(false), 2000)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <MyNavbar />


            {/* Post new item */}
            < Form className="d-flex justify-content-center flex-column" onSubmit={(e) => addNewArticleSubmit(e)}> {/* check onSubmit */}
                <h4 className="mb-3" > Add a new article</h4 >

                <Form.Group>

                    <Form.Control type="text" placeholder="Name" />
                    <Form.Control type="text" placeholder="Price" />
                    <Form.Control type="text" placeholder="Main Category" />
                    <Form.Control type="text" placeholder="Category" />
                    <Form.Control type="text" placeholder="Brand" />
                    <Form.Control type="text" placeholder="Short Description" />
                    <Form.Control type="text" placeholder="Full Description" />
                    <Form.Check type="checkbox" label="Outlet" />
                    <Form.File id="exampleFormControlFile1" label="Add An Image" />

                </Form.Group>

                <Button type="submit"> Submit </Button>
            </Form >

            {uploaded && <p>item uploaded </p>}
        </>
    )
}

export default BackOficceNewItem