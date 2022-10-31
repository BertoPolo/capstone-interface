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


            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Card.Header} eventKey="0" className="pointer" >
                            Lights
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            {/* <p className="pointer" onClick={() => getByCategory(element._id)}>Front Lights</p>
                            <p className="pointer" onClick={() => getByCategory(element._id)}>Rear Lights</p>
                            <p className="pointer" onClick={() => getByCategory(element._id)}>Signal Lights</p> */}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>


        </>
    )
}
export default CategoriesMenuDropdown