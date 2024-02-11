import { Navbar, Nav, Image } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toggleIsOnHome, toggleIsOnOutlet, toggleIsCountactUs } from "../slices/pages/pagesSlice"
import { changeIsLogged, addName, addUserName, addAddress, addEmail, addIsAdmin, changeToken } from "../slices/users/usersSlice"
import CartModal from "./CartModal"


const MyNavbar = () => {

  const { isLogged, name, username, address, email, isAdmin, token } = useSelector((state) => state.usersSlice);
  const cart = useSelector((state) => state.cartSlice.cart);
  const [show, setShow] = useState(false)


  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const emptyUser = () => {
    dispatch(addName(""))
    dispatch(addUserName(""))
    dispatch(addAddress(""))
    dispatch(addEmail(""))
    dispatch(addIsAdmin(false))
    dispatch(changeIsLogged(false))
    dispatch(changeToken(""))
    localStorage.removeItem("token");

  }

  return (
    <>
      <Navbar expand="md" className="sticky-top navbarBg">
        <Navbar.Brand className="pointer" onClick={() => { navigate("/home"); dispatch(toggleIsOnHome(true)) }}>
          <Image src={`${process.env.PUBLIC_URL}/mbIcon.png`} alt="Nav logo" style={{ width: "1.5rem" }} />
        </Navbar.Brand>

        <Nav.Link className="d-md-none cart-color" onClick={handleShow}>
          <i className="bi bi-cart"></i>
          <span className="cart-counter bg-warning">{cart.length}</span>
        </Nav.Link>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => { navigate("/home"); dispatch(toggleIsOnHome(true)) }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate("/home/outlet"); dispatch(toggleIsOnOutlet(true)) }}>Outlet</Nav.Link>
            <Nav.Link onClick={() => { navigate("/home/contactUs"); dispatch(toggleIsCountactUs(true)) }}>Contact Us</Nav.Link>
            {/* <Nav.Link onClick={() => { navigate("/whatiused") }}>What I Used</Nav.Link> */}
          </Nav>
          <Nav className="ml-auto mr-4">

            {isAdmin ?
              <Nav.Link href="/backOfficeMenu">BackOffice</Nav.Link>
              :
              <>
                <Nav.Link className="d-none d-md-block cart-color mr-2" onClick={handleShow}>
                  <i className="bi bi-cart"></i>
                  <span className="cart-counter bg-warning">{cart.length}</span>
                </Nav.Link>
                {isLogged && <Nav.Link href="/myAccount" >My Account</Nav.Link>}
              </>
            }

            {isLogged ? <Nav.Link href="/" onClick={emptyUser}>Log Out</Nav.Link>
              :
              <Nav.Link href="/" className="">
                <b>
                  <i className="bi bi-person mr-1"></i>
                  Login / Sign up
                </b>
              </Nav.Link>
            }

          </Nav>


        </Navbar.Collapse>
      </Navbar>

      {show && <CartModal handleClose={handleClose} show={show} />}

    </>
  )
}
export default MyNavbar
