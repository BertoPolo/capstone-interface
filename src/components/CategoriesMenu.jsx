import { Accordion, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { toggleIsOnCategory, toggleIsOnBrands } from "../slices/sheets/sheetsSlice"
import { addItems } from "../slices/items/itemsSlice"
import { addCategories } from "../slices/categories/categoriesSlice"
import { addMainCategories } from "../slices/mainCategories/mainCategoriesSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function CategoriesMenu() {

  const items = useSelector((state) => state.itemsSlice.items);
  const brands = useSelector((state) => state.brandsSlice.brands);
  const categories = useSelector((state) => state.categoriesSlice.categories);
  const mainCategories = useSelector((state) => state.mainCategoriesSlice.mainCategories);

  const dispatch = useDispatch()

  const getMainCategories = async () => {
    try {
      const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}mainCategories/all`);
      const data = await response.json();

      if (data) dispatch(addMainCategories(data));
      else notifyNotFound()
      // console.log("Mcat:", data)

    } catch (error) {
      console.log(error)
    }
  }

  const getCategories = async () => {
    try {
      const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}categories/all`);
      const data = await response.json();

      if (data) dispatch(addCategories(data));
      else notifyNotFound()

    } catch (error) {
      console.log(error)
    }
  }


  const getByMainCategory = async (mainCat) => {
    try {
      const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items?mainCategory=${mainCat}`);
      const data = await response.json();

      if (data.length > 0) {
        dispatch(addItems(data));
        toggleIsOnCategory(true)
      }
      else notifyNotFound()

    } catch (error) {
      console.log(error)
    }
  }

  const getByCategory = async (category) => {
    try {

      const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items?categories.categories=${category}`);
      const data = await response.json();
      if (data) {
        console.log(data)
        dispatch(addItems(data))
        toggleIsOnCategory(true)
      }
      else notifyNotFound()

    } catch (error) {
      console.log(error)
    }
  }

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

  useEffect(() => {
    getMainCategories()
    // getCategories()
  }, [])


  return (
    <>

      <h4>CATEGORIES</h4>
      <Accordion>

        {mainCategories.map((mainElement) => {
          // console.log(mainElement.categories)
          return (

            <Card key={mainElement._id}>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} eventKey={mainElement._id} className="pointer" >
                  {mainElement.mainCategory}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={mainElement._id}>
                <Card.Body>
                  {<>
                    {mainElement.categories.map(category => {
                      // console.log(category.categories)
                      return (
                        <p className="pointer" key={category.categories} onClick={() => getByCategory(category.categories)} >{category.categories}</p>
                      )
                    })
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

export default CategoriesMenu