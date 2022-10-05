import { Form, Button } from "react-bootstrap"
import MyNavbar from "./MyNavbar"


const BackOficceNewItem = () => {


    const addNewArticleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <>
            <MyNavbar />


            {/* Post new item */}
            < Form className="d-flex justify-content-center flex-column" onSubmit={(e) => addNewArticleSubmit(e)}> {/* check onSubmit */}
                <h4 h4 className="mb-3" > Add a new article</h4 >

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
        </>
    )
}

export default BackOficceNewItem