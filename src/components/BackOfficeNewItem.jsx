import { Form, Button } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import { useState } from "react"


const BackOficceNewItem = () => {

    const [uploaded, setUploaded] = useState(false)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [mainCategory, setMainCategory] = useState("")
    const [category, setCategory] = useState("")
    const [brand, setBrand] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [fullDescription, setFullDescription] = useState("")
    const [isItOutlet, setIsItOutlet] = useState(false)



    const addNewArticleSubmit = async (e) => {
        e.preventDefault()
        let body = {
            title: name,
            price: price,
            mainCategory: mainCategory,
            category: category,
            brand: brand,
            isOutlet: isItOutlet,
            description: shortDescription,
            fullDescription: fullDescription
        }
        //send photo with separated fetch
        const photo = ""

        try {
            const res = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items`,
                {
                    method: "POST",
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

        try {
            const res = await fetch(
                `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items/img`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(photo),
                }
            );
            if (res.status === 201) {

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

                    <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Form.Control type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <Form.Control type="text" placeholder="Main Category" value={mainCategory} onChange={(e) => setMainCategory(e.target.value)} />
                    <Form.Control type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <Form.Control type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
                    <Form.Control type="text" placeholder="Short Description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
                    <Form.Control as="textarea" rows={3} placeholder="Full Description" value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} />
                    <Form.Check type="checkbox" label="Outlet" value={isItOutlet} onChange={(e) => setIsItOutlet(!isItOutlet)} />
                    <Form.File id="exampleFormControlFile1" label="Add An Image" />

                </Form.Group>

                <Button type="submit"> Submit </Button>
            </Form >

            {uploaded && <p>item uploaded </p>}
        </>
    )
}

export default BackOficceNewItem