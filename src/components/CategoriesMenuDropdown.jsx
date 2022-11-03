import { Dropdown, Accordion, Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addItems } from "../slices/items/itemsSlice"
import { addCategories } from "../slices/categories/categoriesSlice"
import { addMainCategories } from "../slices/mainCategories/mainCategoriesSlice"


const CategoriesMenuDropdown = () => {

    const items = useSelector((state) => state.itemsSlice.items);
    const categories = useSelector((state) => state.categoriesSlice.categories);
    const mainCategories = useSelector((state) => state.mainCategoriesSlice.mainCategories);

    const dispatch = useDispatch()

    const getMainCategories = async () => {

        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}mainCategories/all`);
            const data = await response.json();
            if (data) dispatch(addMainCategories(data));

        } catch (error) {
            console.log(error)
        }
    }

    const getCategories = async () => {
        try {
            const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}categories/all`);
            const data = await response.json();
            if (data) dispatch(addCategories(data));

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>


            <Accordion className="d-md-none">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Card.Header} eventKey="0" className="pointer" >
                            Main category's name
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            {/* <p className="pointer" onClick={() => getByCategory(element._id)}>Front Lights</p>*/}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>


        </>
    )
}
export default CategoriesMenuDropdown