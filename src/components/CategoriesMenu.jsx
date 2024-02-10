import { Accordion, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { toggleIsOnCategory, toggleIsOnHome } from "../slices/pages/pagesSlice"
import { addItems } from "../slices/items/itemsSlice"
import { addMainCategories } from "../slices/mainCategories/mainCategoriesSlice"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function CategoriesMenu() {

  const items = useSelector((state) => state.itemsSlice.items);
  const brands = useSelector((state) => state.brandsSlice.brands);
  const categories = useSelector((state) => state.categoriesSlice.categories);
  const mainCategories = useSelector((state) => state.mainCategoriesSlice.mainCategories);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();


  const getMainCategories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}mainCategories/all`);
      const data = await response.json();

      if (data) dispatch(addMainCategories(data));
      else notifyNotFound()

    } catch (error) {
      console.log(error)
    }
  }

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
    const fromOutlet = location.pathname === "/home/outlet";
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}items?category=${categoryId}${fromOutlet ? `&isOutlet="true"` : ""}`);
      if (response.ok) {
        const data = await response.json();
        dispatch(addItems(data))
        toggleIsOnCategory(true)
      }
      else {
        notifyNotFound()
        dispatch(addItems([]))
      }

    } catch (error) {
      console.log(error)
    }
  }

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

  useEffect(() => {
    getMainCategories()
  }, [])


  return (
    <>

      <h4>CATEGORIES</h4>
      <Accordion className="mb-5">

        {mainCategories.map((mainElement) => {
          return (

            <Card key={mainElement._id}>
              <Card.Header className="p-0 ">
                <Accordion.Toggle as={Card.Header} eventKey={mainElement._id} className="pointer d-flex text-center softGrayBg" onClick={() => {
                  getByMainCategory(mainElement._id); navigate(`/home/${mainElement.mainCategory}`)
                }} >
                  <b>{mainElement.mainCategory}</b>
                </Accordion.Toggle>


              </Card.Header>
              {mainElement.categories.length > 0 && <Accordion.Collapse eventKey={mainElement._id}>
                <Card.Body>
                  {<>
                    {mainElement.categories.map(category => {

                      return (
                        <p className="pointer" key={category.categories} onClick={() => { getByCategory(category._id); navigate(`/home/${category.categories}`); dispatch(toggleIsOnHome(true)) }} >{category.categories}</p>
                      )
                    })
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

export default CategoriesMenu