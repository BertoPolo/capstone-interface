// import Accordion from "react-bootstrap/Accordion"
import { Accordion, Card, Dropdown } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useState } from "react"
// import { Link } from "react-router-dom"


function CategoriesMenu() {

  const items = useSelector((state) => state.itemsSlice.items);

  const [choosenCategory, setChoosenCategory] = useState("")


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
              <p value="lala" onClick={(e) => setChoosenCategory(e.target.value)}>Front lights</p>
              <p >Rear lights</p>
              <p >Signal lights</p>
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
              <p>Tools</p>
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
              <p>Clothes</p>
              {/* <Link to="/Clothes">Clothes</Link> */}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <p>Gloves</p>
              <p>Hats</p>
              <p>Shirts</p>
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
              <p>Handlebars</p>
              <p>Risers</p>
              <p>Mirrors</p>
              <p>Grips</p>
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
              <p>Stands</p>
              <p>Footpegs</p>
              <p>Mid Controls</p>
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
              <p>Seats</p>
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
              <p>Jet</p>
              <p>Modular</p>
              <p>Full Face</p>
              <p>Accesories</p>
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