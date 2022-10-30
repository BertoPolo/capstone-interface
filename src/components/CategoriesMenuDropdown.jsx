import { Dropdown, Accordion, Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addItems } from "../slices/items/itemsSlice"
import { addCategories } from "../slices/categories/categoriesSlice"

const CategoriesMenuDropdown = () => {

    const items = useSelector((state) => state.itemsSlice.items);
    const { categories, mainCategories } = useSelector((state) => state.categoriesSlice);
    // const mainCategories = useSelector((state) => state.mainCategoriesSlice.mainCategories);

    const dispatch = useDispatch()

    // const getMainCategories = async () => {

    //     try {
    //         const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}mainCategories/all`);
    //         const data = await response.json();
    //         dispatch(addCategories(data));

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const getCategories = async () => {
        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}categories/all`);
            const data = await response.json();
            // dispatch(addBrands(data));

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>


            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Click me!
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>


            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Categories
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {categories.map((element) => (
                        <>
                            <Dropdown.Item>{element.mainCategories}</Dropdown.Item>
                            <Dropdown.Item>{element.categories}</Dropdown.Item>
                        </>

                    ))}

                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
export default CategoriesMenuDropdown