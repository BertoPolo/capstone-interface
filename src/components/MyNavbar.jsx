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
          <Image src={`${process.env.PUBLIC_URL}/assets/mbIcon.png`} alt="Nav logo" style={{ width: "1.5rem" }} />
        </Navbar.Brand>

        <Nav.Link className="d-md-none cart-color" onClick={handleShow}>
          <i className="bi bi-cart"></i>
          <span className="cart-counter bg-warning">{cart.length}</span>
        </Nav.Link>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => { navigate("/home"); dispatch(toggleIsOnHome(true)); window.scrollTo(0, 0); }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate("/home/outlet"); dispatch(toggleIsOnOutlet(true)); window.scrollTo(0, 0); }}>Outlet</Nav.Link>
            <Nav.Link onClick={() => { navigate("/home/contactUs"); dispatch(toggleIsCountactUs(true)); window.scrollTo(0, 0); }}>Contact Us</Nav.Link>
            {/* <Nav.Link onClick={() => { navigate("/whatiused") }}>What I Used</Nav.Link> */}
          </Nav>
          <Nav className="ml-auto mr-4">

            {isAdmin ?
              <Nav.Link href="/backOfficeMenu">BackOffice</Nav.Link>
              :
              <>
                <Nav.Link className="d-none d-md-block cart-color mr-2" onClick={handleShow}>
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.875C0 0.70924 0.065848 0.550268 0.183058 0.433058C0.300269 0.315848 0.45924 0.25 0.625 0.25H2.5C2.63941 0.250039 2.77481 0.296688 2.88466 0.382531C2.99452 0.468374 3.07251 0.58848 3.10625 0.72375L3.6125 2.75H18.125C18.2168 2.75008 18.3074 2.77038 18.3904 2.80944C18.4735 2.8485 18.5469 2.90537 18.6055 2.976C18.6641 3.04664 18.7064 3.12931 18.7294 3.21815C18.7524 3.30698 18.7556 3.3998 18.7388 3.49L16.8638 13.49C16.8369 13.6332 16.7609 13.7626 16.6489 13.8557C16.5368 13.9488 16.3957 13.9999 16.25 14H5C4.85429 13.9999 4.71321 13.9488 4.60114 13.8557C4.48907 13.7626 4.41306 13.6332 4.38625 13.49L2.5125 3.50875L2.0125 1.5H0.625C0.45924 1.5 0.300269 1.43415 0.183058 1.31694C0.065848 1.19973 0 1.04076 0 0.875ZM3.8775 4L5.51875 12.75H15.7312L17.3725 4H3.8775ZM6.25 14C5.58696 14 4.95107 14.2634 4.48223 14.7322C4.01339 15.2011 3.75 15.837 3.75 16.5C3.75 17.163 4.01339 17.7989 4.48223 18.2678C4.95107 18.7366 5.58696 19 6.25 19C6.91304 19 7.54893 18.7366 8.01777 18.2678C8.48661 17.7989 8.75 17.163 8.75 16.5C8.75 15.837 8.48661 15.2011 8.01777 14.7322C7.54893 14.2634 6.91304 14 6.25 14ZM15 14C14.337 14 13.7011 14.2634 13.2322 14.7322C12.7634 15.2011 12.5 15.837 12.5 16.5C12.5 17.163 12.7634 17.7989 13.2322 18.2678C13.7011 18.7366 14.337 19 15 19C15.663 19 16.2989 18.7366 16.7678 18.2678C17.2366 17.7989 17.5 17.163 17.5 16.5C17.5 15.837 17.2366 15.2011 16.7678 14.7322C16.2989 14.2634 15.663 14 15 14ZM6.25 15.25C6.58152 15.25 6.89946 15.3817 7.13388 15.6161C7.3683 15.8505 7.5 16.1685 7.5 16.5C7.5 16.8315 7.3683 17.1495 7.13388 17.3839C6.89946 17.6183 6.58152 17.75 6.25 17.75C5.91848 17.75 5.60054 17.6183 5.36612 17.3839C5.1317 17.1495 5 16.8315 5 16.5C5 16.1685 5.1317 15.8505 5.36612 15.6161C5.60054 15.3817 5.91848 15.25 6.25 15.25ZM15 15.25C15.3315 15.25 15.6495 15.3817 15.8839 15.6161C16.1183 15.8505 16.25 16.1685 16.25 16.5C16.25 16.8315 16.1183 17.1495 15.8839 17.3839C15.6495 17.6183 15.3315 17.75 15 17.75C14.6685 17.75 14.3505 17.6183 14.1161 17.3839C13.8817 17.1495 13.75 16.8315 13.75 16.5C13.75 16.1685 13.8817 15.8505 14.1161 15.6161C14.3505 15.3817 14.6685 15.25 15 15.25Z" fill="#052F48" />
                  </svg>

                  <span className="cart-counter bg-warning">{cart.length}</span>
                </Nav.Link>
                {isLogged && <Nav.Link href="/myAccount">My Account</Nav.Link>}
              </>
            }

            {isLogged ? <Nav.Link href="/" onClick={emptyUser}>Log Out</Nav.Link>
              :
              <Nav.Link href="/">
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
