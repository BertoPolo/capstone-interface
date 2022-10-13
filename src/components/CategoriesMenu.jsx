// import Accordion from "react-bootstrap/Accordion"
import { Accordion, Card, Dropdown } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useState } from "react"
// import { Link } from "react-router-dom"


function CategoriesMenu() {

  const items = useSelector((state) => state.itemsSlice.items);

  const [choosenCategory, setChoosenCategory] = useState("")
  const [choosenMainCategory, setChoosenMainCategory] = useState("")


  const getByBrand = async (e) => {
    try {
      const response = await fetch(
        `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items/brand${e.target.value}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // setFoundedUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getByMainCategory = async (e) => {
    try {
      const response = await fetch(
        `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items/mainCategory${e.target.value}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // setFoundedUsers(data)
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  const getByCategory = async (e) => {
    try {
      const response = await fetch(
        `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items/category${e.target.value}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // setFoundedUsers(data)
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
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
              <p onClick={(e) => setChoosenCategory("Front lights")}>Front lights</p>
              <p onClick={(e) => setChoosenCategory("Rear lights")}>Rear lights</p>
              <p onClick={(e) => setChoosenCategory("Signal lights")}>Signal lights</p>
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
              <p onClick={(e) => setChoosenCategory("Tools")}>Tools</p>
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
              <p onClick={(e) => setChoosenCategory("Clothes")}>Clothes</p>
              {/* <Link to="/Clothes">Clothes</Link> */}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <p onClick={(e) => setChoosenCategory("Gloves")}>Gloves</p>
              <p onClick={(e) => setChoosenCategory("Hats")}>Hats</p>
              <p onClick={(e) => setChoosenCategory("Shirts")}>Shirts</p>
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
              <p onClick={(e) => setChoosenCategory("Gloves")}>Handlebars</p>
              <p onClick={(e) => setChoosenCategory("Risers")}>Risers</p>
              <p onClick={(e) => setChoosenCategory("Mirrors")}>Mirrors</p>
              <p onClick={(e) => setChoosenCategory("Grips")}>Grips</p>
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
              <p onClick={(e) => setChoosenCategory("Stands")}>Stands</p>
              <p onClick={(e) => setChoosenCategory("Footpegs")}>Footpegs</p>
              <p onClick={(e) => setChoosenCategory("Mid Controls")}>Mid Controls</p>
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
              <p onClick={(e) => setChoosenMainCategory("Seats")}>Seats</p>
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
              <p onClick={(e) => setChoosenCategory("Jet")}>Jet</p>
              <p onClick={(e) => setChoosenCategory("Modular")}>Modular</p>
              <p onClick={(e) => setChoosenCategory("Full Face")}>Full Face</p>
              <p onClick={(e) => setChoosenCategory("Accesories")}>Accesories</p>
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
      <hr />
      <h4>BRANDS</h4>

      <Dropdown>
        <Dropdown.Toggle variant="warning">Dropdown Button</Dropdown.Toggle>

        <Dropdown.Menu>
          {/* FILTER BY BRAND*/}
          {/* do a check to do not repeat brands */}
          {items.map((element) => {
            return (
              <Dropdown.Item key={element._id} href="" onClick={getByBrand}>{element.brand}</Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>

  )
}

export default CategoriesMenu