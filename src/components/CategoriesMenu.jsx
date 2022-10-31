import { Accordion, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { toggleIsOnCategory, toggleIsOnBrands } from "../slices/sheets/sheetsSlice"
import { addItems } from "../slices/items/itemsSlice"
import { addCategories } from "../slices/categories/categoriesSlice"
// import { addMainCategories } from "../slices/mainCategories/mainCategoriesSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function CategoriesMenu() {

  const items = useSelector((state) => state.itemsSlice.items);
  const brands = useSelector((state) => state.brandsSlice.brands);
  const categories = useSelector((state) => state.categoriesSlice.categories);
  // const mainCategories = useSelector((state) => state.categoriesSlice.mainCategories);

  const dispatch = useDispatch()

  const getCategories = async () => {
    try {
      const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}categories/all`);
      const data = await response.json();
      dispatch(addCategories(data));
      console.log(data)

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
      const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items?category=${category}`);
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
    getCategories()
  }, [])

  return (
    <>

      <h4>CATEGORIES</h4>
      <Accordion>
        {categories.map((element) => {
          return (
            <Card key={element._id}>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} eventKey={element._id} className="pointer" >
                  {element.mainCategory.mainCategories}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={element._id}>
                <Card.Body>
                  <p className="pointer" onClick={() => getByCategory(element._id)}>{element.categories}</p>

                </Card.Body>
              </Accordion.Collapse>
            </Card>

          )


          // mapear los main categories
          // dentro, hacer otro map con las categories y checkeando que tiene la misma maincat


        })}

        {/* <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="0" className="pointer" >
              Lights
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p className="pointer" onClick={() => getByCategory("Front Lights")}>Front Lights</p>
              <p className="pointer" onClick={() => getByCategory("Rear Lights")}>Rear Lights</p>
              <p className="pointer" onClick={() => getByCategory("Signal Lights")}>Signal Lights</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion as={Card.Header} className="pointer" >
              <p className="pointer" onClick={() => getByCategory("Tools")}>Tools</p>
            </Accordion>
          </Card.Header>
          <Accordion.Collapse >
            <Card.Body></Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="2" className="pointer" >
              <p className="pointer" onClick={() => getByCategory("Clothes")}>Clothes</p>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <p className="pointer" onClick={() => getByCategory("Gloves")}>Gloves</p>
              <p className="pointer" onClick={() => getByCategory("Hats")}>Hats</p>
              <p className="pointer" onClick={() => getByCategory("Shirts")}>Shirts</p>

            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="3" className="pointer" >
              On Hands
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <p className="pointer" onClick={() => getByCategory("Gloves")}>Handlebars</p>
              <p className="pointer" onClick={() => getByCategory("Risers")}>Risers</p>
              <p className="pointer" onClick={() => getByCategory("Mirrors")}>Mirrors</p>
              <p className="pointer" onClick={() => getByCategory("Grips")}>Grips</p>

            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="4" className="pointer" >
              On Feet
            </Accordion.Toggle>

          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>
              <p className="pointer" onClick={() => getByCategory("Stands")}>Stands</p>
              <p className="pointer" onClick={() => getByCategory("Footpegs")}>Footpegs</p>
              <p className="pointer" onClick={() => getByCategory("Mid Controls")}>Mid Controls</p>

            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion as={Card.Header} className="pointer" >
              <p className="pointer" onClick={() => getByMainCategory("Seats")}>Seats</p>
            </Accordion>
          </Card.Header>
          <Accordion.Collapse >
            <Card.Body></Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="6" className="pointer" >
              Helmets
            </Accordion.Toggle>

          </Card.Header>
          <Accordion.Collapse eventKey="6">
            <Card.Body>
              <p className="pointer" onClick={() => getByCategory("Jet")}>Jet</p>
              <p className="pointer" onClick={() => getByCategory("Modular")}>Modular</p>
              <p className="pointer" onClick={() => getByCategory("Full Face")}>Full Face</p>
              <p className="pointer" onClick={() => getByCategory("Accesories")}>Accesories</p>

            </Card.Body>
          </Accordion.Collapse>
        </Card> */}
      </Accordion>
    </>

  )
}

export default CategoriesMenu