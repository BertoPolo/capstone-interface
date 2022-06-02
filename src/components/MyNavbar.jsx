import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap"
// import { Link } from "react-router-dom"
const MyNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">Rate My Route</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/addRoute">Add a Route</Nav.Link>
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Nav className="ml-auto mr-4">
          <Nav.Link href="/">
            {/* onClick={() => setLogin(false)} */}
            Log Out
          </Nav.Link>
        </Nav>

        <Form inline>
          <FormControl type="text" placeholder="Search by WHAT ?" className="mr-sm-2" />
          <Button variant="outline-success">Search </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default MyNavbar
