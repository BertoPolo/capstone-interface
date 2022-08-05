// import Accordion from "react-bootstrap/Accordion"
import { Accordion, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

function CategoriesMenu() {
  // <p>Exhausts</p>
  // <p>Engine</p>
  // <p>Carburetors</p>
  // <p>Air Filters</p>
  // <p>Tools</p>
  // <p>Books</p>
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey="0" className="pointer" >
            Lights
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Link to="/Front_lights">Front lights</Link>
            <Link to="/Rear_lights">Rear lights</Link>
            <Link to="/Signal_lights">Signal lights</Link>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey="1" className="pointer" >
            <Link to="">Tools</Link>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body></Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey="2" className="pointer" >
            <Link to="/Clothes">Clothes</Link>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            <Link to="">Gloves</Link>
            <Link to="">Hats</Link>
            <Link to="">Shirts</Link>
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
            <Link to="">Handlebars</Link>
            <Link to="">Risers</Link>
            <Link to="">Mirrors</Link>
            <Link to="">Grips</Link>
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
            <Link to="">Stands</Link>
            <Link to="">Footpegs</Link>
            <Link to="">Mid Controls</Link>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey="5" className="pointer" >
            <Link to="">Seats</Link>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="5">
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
            <Link to="">Jet</Link>
            <Link to="">Modular</Link>
            <Link to="">Full Face</Link>
            <Link to="">Accesories</Link>
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
  )
}

export default CategoriesMenu
