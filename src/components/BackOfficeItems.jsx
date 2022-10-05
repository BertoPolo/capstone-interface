import MyNavbar from "./MyNavbar"
import { useState } from "react"

const BackOfficeItems = () => {
    const [foundedItems, setFoundedItems] = useState([])

    const searchArticleSubmit = (e) => {
        e.preventDefault()
    }



    return (
        <>
            <MyNavbar />

            {/* Search item */}
            < Form className="d-flex justify-content-center flex-column" onSubmit={(e) => searchArticleSubmit(e)}> {/* check onSubmit if its calling the right function */}
                <h4 h4 className="mb-3" > Search an article</h4>


                <Form.Group>
                    <Form.Control type="text" placeholder="Name" />

                </Form.Group>


                <Button type="submit"> Submit </Button>
            </Form >

            {/* <Dropdown> */}
            <h4 h4 className="" > <u>Results</u></h4>

            {
                foundedItems && foundedItems.map((element) => {
                    return (
                        <div>
                            <p>{element.name}</p>
                            <p>{element.adress}</p>
                            {/* <Button variant="primary" onClick={dispatch(()}>Edit</Button><Button variant="danger" onClick={dispatch(())}>Delete</Button> */}
                            <hr />
                        </div>
                    )
                })
            }
            {/* </Dropdown> */}
        </>
    )
}

export default BackOfficeItems