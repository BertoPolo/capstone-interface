import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <Row className="mt-5 pt-1 footer text-center">
        <Col className="">
          <h5 className="">Account</h5>
          <p>My Account</p>
          <p>Login / Register</p>
          <p>Cart</p>
        </Col>

        <Col>
          <h5>Ordering Information</h5>
          <p>Delivery</p>
          <p>Changes and Returns</p>
          <p>Guarantee</p>
          <p>Order tracking</p>
        </Col>

        <Col>
          <h5>About Stuff to Route</h5>
          <p>About us</p>
          <p>Contact us</p>
        </Col>

        <Col>
          <h5>Social Networks</h5>
          <Link className="d-block mb-3" target="_blank" to="https://www.instagram.com" rel="noopener noreferrer">
            <i className="bi bi-instagram mr-1"></i>
            We are on Instagram!
          </Link>

          <Link className="d-block mb-3" target="_blank" to="https://www.linkedin.com/in/bertopolo/" rel="noopener noreferrer">
            <i className="bi bi-linkedin mr-1"></i>
            We are on LinkedIn!
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default Footer
