import { Accordion, Card, Dropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { toggleIsOnCategory, toggleIsOnBrands } from "../slices/sheets/sheetsSlice"
import { addItems } from "../slices/items/itemsSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function CategoriesMenu() {

  const items = useSelector((state) => state.itemsSlice.items);
  const brands = useSelector((state) => state.brandsSlice.brands);

  const dispatch = useDispatch()


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

  return (
    <>
      {/* Main categories are hard coded for demo purposes,they should be maped alphabetically*/}
      <h4>CATEGORIES</h4>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="0" className="pointer" >
              Lights
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p className="pointer" onClick={() => { getByCategory("Front lights") }}>Front lights</p>
              <p className="pointer" onClick={() => getByCategory("Rear lights")}>Rear lights</p>
              <p className="pointer" onClick={() => getByCategory("Signal lights")}>Signal lights</p>
              {/* <Link to="/Front_lights">Front lights</Link>
              <Link to="/Rear_lights">Rear lights</Link>
              <Link to="/Signal_lights">Signal lights</Link> */}
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion as={Card.Header} className="pointer" >
              {/* .toogle removed eventKey="1"*/}
              <p className="pointer" onClick={() => getByCategory("Tools")}>Tools</p>
              {/* <Link to="">Tools</Link> */}
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
              {/* <Link to="/Clothes">Clothes</Link> */}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <p className="pointer" onClick={() => getByCategory("Gloves")}>Gloves</p>
              <p className="pointer" onClick={() => getByCategory("Hats")}>Hats</p>
              <p className="pointer" onClick={() => getByCategory("Shirts")}>Shirts</p>
              {/* <Link to="">Gloves</Link>
              <Link to="">Hats</Link>
              <Link to="">Shirts</Link> */}
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
              {/* <Link to="">Handlebars</Link>
              <Link to="">Risers</Link>
              <Link to="">Mirrors</Link>
              <Link to="">Grips</Link> */}
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
              {/* <Link to="">Stands</Link>
              <Link to="">Footpegs</Link>
              <Link to="">Mid Controls</Link> */}
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion as={Card.Header} className="pointer" >
              {/* .toogle removed eventKey="5"*/}
              <p className="pointer" onClick={() => getByMainCategory("Seats")}>Seats</p>
              {/* <Link to="">Seats</Link> */}
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
              {/* <Link to="">Jet</Link>
              <Link to="">Modular</Link>
              <Link to="">Full Face</Link>
              <Link to="">Accesories</Link> */}
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        {/* <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey="6">
            wwwwwwwwwwwwwhat
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="6">
          <Card.Body>
            <p>Jet</p>
            <p>Modular</p>
            <p>Full</p>
            <p>Accesories</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card> */}
      </Accordion>
    </>

  )
}

export default CategoriesMenu