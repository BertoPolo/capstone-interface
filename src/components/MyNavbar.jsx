import { Navbar, Nav, Form, FormControl, Button, Modal } from "react-bootstrap"
import { useState } from "react"

// import { Link } from "react-router-dom"
const MyNavbar = () => {
  // const handleLogOut = () => {
  //   window.location.href = "/login";
  //   localStorage.removeItem("token");
  // };
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/home">
          Stuff To Route <img src="../../public/mbIcon.png" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link href="/contact">Contact Us</Nav.Link>
            <Nav.Link href="/outlet">Outlet</Nav.Link>
            <Nav.Link href="/new">New</Nav.Link>
          </Nav>
          <Nav className="ml-auto mr-4">
            <Nav.Link href="" onClick={handleShow}>
              <i className="bi bi-cart"></i>Cart(number)
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
              <i className="bi bi-search"></i> Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>Items</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default MyNavbar
