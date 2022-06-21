import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap"
// import { Link } from "react-router-dom"
const MyNavbar = () => {
  // const handleLogOut = () => {
  //   window.location.href = "/login";
  //   localStorage.removeItem("token");
  // };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">Rate My Route</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/addRoute">Add a Route</Nav.Link>
        </Nav>
        <Nav className="ml-auto mr-4">
          <Nav.Link href="/">
            {/* onClick={() => setLogin(false), handleLogOut()} */}
            Log Out
          </Nav.Link>
        </Nav>

        <Form inline className="">
          <FormControl type="text" placeholder="Search" className="" />
          <Button variant="outline-success">Search </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default MyNavbar
