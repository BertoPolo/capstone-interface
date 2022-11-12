import { Navbar, Nav, Image } from "react-bootstrap"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleIsOnHome, toggleIsOnOutlet, toggleIsCountactUs } from "../slices/sheets/sheetsSlice"
import { changeIsLogged, addName, addUserName, addAdress, addEmail, addIsAdmin } from "../slices/users/usersSlice"
import CartModal from "./CartModal"


const MyNavbar = () => {
  // const handleLogOut = () => {
  //   window.location.href = "/login";
  //   localStorage.removeItem("token");
  // };
  const { isLogged, name, username, adress, email, isAdmin } = useSelector((state) => state.usersSlice);
  const cart = useSelector((state) => state.cartSlice.cart);
  const [show, setShow] = useState(false)


  const dispatch = useDispatch();


  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const emptyUser = () => {
    dispatch(addName(""))
    dispatch(addUserName(""))
    dispatch(addAdress(""))
    dispatch(addEmail(""))
    dispatch(addIsAdmin(false))
    dispatch(changeIsLogged(false))
  }

  return (
    <>
      <Navbar expand="lg" className="sticky-top navbarBg">
        <Navbar.Brand className="pointer" href="/home" onClick={() => dispatch(toggleIsOnHome(true))}>
          Stuff To Route
          <Image src={`${process.env.PUBLIC_URL}/mbIcon.png`} alt="main logo" style={{ width: "1.5rem", marginLeft: "1rem" }} />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => dispatch(toggleIsOnOutlet(true))}>Outlet</Nav.Link>
            <Nav.Link onClick={() => dispatch(toggleIsCountactUs(true))}>Contact Us</Nav.Link>
          </Nav>
          <Nav className="ml-auto mr-4">

            {isAdmin ?
              <Nav.Link href="/backOfficeMenu">BackOffice</Nav.Link>
              :
              <>
                <Nav.Link href="" onClick={handleShow}>
                  <i className="bi bi-cart"></i>Cart({cart.length})
                </Nav.Link>
                {isLogged && <Nav.Link href="/myAccount">My Account</Nav.Link>}
              </>
            }

            {isLogged ? <Nav.Link href="/" onClick={emptyUser}>Log Out</Nav.Link>
              //  onClick={() => setLogin(false), handleLogOut()}
              :
              <Nav.Link href="/">Login</Nav.Link>
            }

          </Nav>


        </Navbar.Collapse>
      </Navbar>

      {show && <CartModal handleClose={handleClose} show={show} />}

    </>
  )
}
export default MyNavbar
