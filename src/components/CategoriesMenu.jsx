// import Accordion from "react-bootstrap/Accordion"
import { Accordion, Card, Button } from "react-bootstrap"

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
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Clothes
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <p>Front lights</p>
            <p>Rear lights</p>
            <p>Signal lights</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Helmets
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body></Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            Lights
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            <p>Gloves</p>
            <p>Hats</p>
            <p>Shirts</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            On Hands
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body>
            <p>Handlebars</p>
            <p>Risers</p>
            <p>Mirrors</p>
            <p>Grips</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey="4">
            On Feet
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="4">
          <Card.Body>
            <p>Stands</p>
            <p>Footpegs</p>
            <p>Mid Controls</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey="5">
            Seats
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="5">
          <Card.Body></Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey="5">
            Helmets
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="5">
          <Card.Body>
            <p>Jet</p>
            <p>Modular</p>
            <p>Full</p>
            <p>Accesories</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default CategoriesMenu
