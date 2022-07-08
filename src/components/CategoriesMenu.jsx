import Accordion from "react-bootstrap/Accordion"

function CategoriesMenu() {
  // <p>Exhausts</p>
  // <p>Engine</p>
  // <p>Carburetors</p>
  // <p>Air Filters</p>
  // <p>Tools</p>
  // <p>Books</p>
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Clothes</Accordion.Header>
        <Accordion.Body>Link to gloves Link to hats Link to shirts</Accordion.Body>
      </Accordion.Item>

      <p>Helmets</p>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Lights</Accordion.Header>
        <Accordion.Body>Link to front lights Link to rear lights Link to signal lights</Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>On Hands</Accordion.Header>
        <Accordion.Body>Link to handlebars Link to grips Link to risers Link to mirrors</Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>On Feet</Accordion.Header>
        <Accordion.Body>Link to stands Link to footpegs Link to Mid Controls</Accordion.Body>
      </Accordion.Item>

      <p>Seats</p>

      <Accordion.Item eventKey="4">
        <Accordion.Header>Accessories</Accordion.Header>
        <Accordion.Body>Link to Link to Link to</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default CategoriesMenu
