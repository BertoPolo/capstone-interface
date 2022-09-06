import { Navbar, Nav, Form, FormControl, Button, Modal } from "react-bootstrap"
import { useState } from "react"

// import { Link } from "react-router-dom"
const MyNavbar = () => {
  // const handleLogOut = () => {
  //   window.location.href = "/login";
  //   localStorage.removeItem("token");
  // };
  const [show, setShow] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)  // do it in redux state

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
            <Nav.Link href="/outlet">Outlet</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
            {/* <Nav.Link href="/news">News</Nav.Link> */}
          </Nav>
          <Nav className="ml-auto mr-4">

            {isAdmin ?
              <Nav.Link href="/backoffice">BackOffice</Nav.Link>
              :
              <Nav.Link href="" onClick={handleShow}>
                <i className="bi bi-cart"></i>Cart(number)
              </Nav.Link>}

            <Nav.Link href="/myAccount">My Account</Nav.Link>
            <Nav.Link href="/">
              {/* onClick={() => setLogin(false), handleLogOut()} */}
              Log Out
            </Nav.Link>
          </Nav>


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
