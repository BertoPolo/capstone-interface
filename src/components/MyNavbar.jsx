import { Navbar, Nav } from "react-bootstrap"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleIsOnHome, toggleIsOnOutlet, toggleIsCountactUs, toggleIsOnSingleItem } from "../slices/sheets/sheetsSlice"
import CartModal from "./CartModal"

// import { Link } from "react-router-dom"


const MyNavbar = () => {
  // const handleLogOut = () => {
  //   window.location.href = "/login";
  //   localStorage.removeItem("token");
  // };
  const isAdmin = useSelector((state) => state.usersSlice.isAdmin);
  const cart = useSelector((state) => state.cartSlice.cart);
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
            <Nav.Link href="/home" onClick={() => dispatch(toggleIsOnHome(false), toggleIsCountactUs(true))}>Contact Us</Nav.Link>
            {/* <Nav.Link href="/news">News</Nav.Link> */}
          </Nav>
          <Nav className="ml-auto mr-4">

            {isAdmin ?
              <Nav.Link href="/backOffice">BackOffice</Nav.Link>
              :
              <>
                <Nav.Link href="" onClick={handleShow}>
                  <i className="bi bi-cart"></i>Cart({cart.length})
                </Nav.Link>
                <Nav.Link href="/myAccount">My Account</Nav.Link>
              </>
            }
            <Nav.Link href="/">
              {/* onClick={() => setLogin(false), handleLogOut()} */}
              Log Out
            </Nav.Link>
          </Nav>


        </Navbar.Collapse>
      </Navbar>

      {show && <CartModal handleClose={handleClose} show={show} />}

    </>
  )
}
export default MyNavbar
