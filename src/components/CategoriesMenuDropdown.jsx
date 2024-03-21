import { Accordion, Card, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toggleIsOnCategory, toggleIsOnHome } from "../slices/pages/pagesSlice"
import { addItems } from "../slices/items/itemsSlice"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// THIS IS THE CATEGORIES MENU JUST FOR THE XS SCREEN

const CategoriesMenuDropdown = () => {
    const items = useSelector((state) => state.itemsSlice.items);
    const brands = useSelector((state) => state.brandsSlice.brands);
    const categories = useSelector((state) => state.categoriesSlice.categories);
    const mainCategories = useSelector((state) => state.mainCategoriesSlice.mainCategories);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const notifyNotFound = () => toast.warn(`OOPS! looks like we don't have that`, {
        position: "top-center",
        autoClose: 2000,
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
            <Accordion className="d-md-none mt-2">

                {mainCategories.map((mainElement) => {
                    return (

                        <Card key={mainElement._id}>
                            <Card.Header className="p-0">
                                <Accordion.Toggle as={Card.Header} eventKey={mainElement._id} className="pointer" onClick={() => getByMainCategory(mainElement._id)} >
                                    <Image src={`${process.env.PUBLIC_URL}/assets/mainCategories/${mainElement.mainCategory}.svg`} alt="" style={{ width: "1rem", marginRight: "4px" }} />  <b>{mainElement.mainCategory}</b>
                                </Accordion.Toggle>

                            </Card.Header>

                            {mainElement.categories.length > 0 &&
                                <Accordion.Collapse eventKey={mainElement._id}>
                                    <Card.Body className="p-0 pl-5 pt-1">
                                        {<>
                                            {mainElement.categories.map(category => (
                                                <p className="pointer" key={category.categories} onClick={() => { getByCategory(category._id); navigate("/home"); dispatch(toggleIsOnHome(true)) }} >{category.categories}</p>
                                            ))
                                            }
                                        </>}

                                    </Card.Body>
                                </Accordion.Collapse>}
                        </Card>
                    )
                })}

            </Accordion>
        </>
    )
}
export default CategoriesMenuDropdown