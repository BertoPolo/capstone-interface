import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap"
// import { Link } from "react-router-dom"
const MyNavbar = () => {
  // const handleLogOut = () => {
  //   window.location.href = "/login";
  //   localStorage.removeItem("token");
  // };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">
        Stuff To Route <img src="../../public/mbIcon.png" alt="" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link href="/contact">Contact</Nav.Link>
          <Nav.Link href="/where">About Us</Nav.Link>
          <Nav.Link href="/outlet">Outlet</Nav.Link>
          <Nav.Link href="/new">New</Nav.Link>
          <Nav.Link href="/mostSold">Most Sold</Nav.Link>
        </Nav>
        <Nav className="ml-auto mr-4">
          <Nav.Link href="/cart">
            {" "}
            <i class="bi bi-cart"></i>Cart dropdown
          </Nav.Link>
          <Nav.Link href="/myAccount">My Account</Nav.Link>
          <Nav.Link href="/">
            {/* onClick={() => setLogin(false), handleLogOut()} */}
            Log Out
          </Nav.Link>
        </Nav>

        <Form inline className="">
          <FormControl type="text" placeholder="Search" className="" />
          <Button variant="outline-success">
            <i class="bi bi-search"></i> Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default MyNavbar
