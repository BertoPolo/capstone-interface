import { Navbar, Nav, Button, Modal } from "react-bootstrap"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../slices/cart/cartSlice"


// import { Link } from "react-router-dom"
const MyNavbar = () => {
  // const handleLogOut = () => {
  //   window.location.href = "/login";
  //   localStorage.removeItem("token");
  // };
  const isAdmin = useSelector((state) => state.usersSlice.isAdmin);

  const cart = useSelector((state) => state.cartSlice.cart);
  const items = useSelector((state) => state.itemsSlice.items); // just to try.then delete it

  const [show, setShow] = useState(false)

  const dispatch = useDispatch();

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
              <Nav.Link href="/backOffice">BackOffice</Nav.Link>
              :
              <div>
                <Nav.Link href="" onClick={handleShow}>
                  <i className="bi bi-cart"></i>Cart(number)
                </Nav.Link>

                <Nav.Link href="/myAccount">My Account</Nav.Link>
              </div>
            }
            <Nav.Link href="/">
              {/* onClick={() => setLogin(false), handleLogOut()} */}
              Log Out
            </Nav.Link>
          </Nav>


        </Navbar.Collapse>
      </Navbar>


      {/* separate this into other component */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CART</Modal.Title>
          {items.map((element) => { //change  items for cart
            return (
              <Modal.Body key={element._id}>{element.title}</Modal.Body>
            )
          })}
        </Modal.Header>
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
