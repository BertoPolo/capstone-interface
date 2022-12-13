import { Accordion, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { toggleIsOnCategory } from "../slices/pages/pagesSlice"
import { addItems } from "../slices/items/itemsSlice"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const CategoriesMenuDropdown = () => {

    const items = useSelector((state) => state.itemsSlice.items);
    const brands = useSelector((state) => state.brandsSlice.brands);
    const categories = useSelector((state) => state.categoriesSlice.categories);
    const mainCategories = useSelector((state) => state.mainCategoriesSlice.mainCategories);

    const dispatch = useDispatch()

    const notifyNotFound = () => toast.warn(`OOPS! looks like we don't have that`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const getByMainCategory = async (mainCatId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}items?mainCategory=${mainCatId}`);

            if (response.ok) {
                const data = await response.json();
                dispatch(addItems(data));
                toggleIsOnCategory(true)
            }
            else notifyNotFound()

        } catch (error) {
            console.log(error)
        }
    }

    const getByCategory = async (categoryId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}items?category=${categoryId}`);
            if (response.ok) {
                const data = await response.json();
                dispatch(addItems(data))
                toggleIsOnCategory(true)
            }
            else notifyNotFound()


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Accordion className="d-md-none">

                {mainCategories.map((mainElement) => {
                    return (

                        <Card key={mainElement._id}>
                            <Card.Header>
                                <Accordion.Toggle as={Card.Header} eventKey={mainElement._id} className="pointer" onClick={() => getByMainCategory(mainElement._id)} >
                                    {mainElement.mainCategory}
                                </Accordion.Toggle>
                                {/* <i className="bi bi-plus pointer ml-4"></i> */}

                            </Card.Header>
                            <Accordion.Collapse eventKey={mainElement._id}>
                                <Card.Body>
                                    {<>
                                        {mainElement.categories.map(category => (
                                            <p className="pointer" key={category.categories} onClick={() => getByCategory(category._id)} >{category.categories}</p>
                                        ))
                                        }
                                    </>}

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )
                })}

            </Accordion>
        </>
    )
}
export default CategoriesMenuDropdown