import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <Row className="mt-5 pt-1 footer">
        <Col>
          <h6>Account</h6>
          <p>My Account</p>
          <p>Login / Register</p>
          <p>Cart</p>
        </Col>

        <Col>
          <h6>Ordering Information</h6>
          <p>Delivery</p>
          <p>Changes and Returns</p>
          <p>Guarantee</p>
          <p>Order tracking</p>
        </Col>

        <Col>
          <h6>About Stuff to Route</h6>
          <p>About us</p>
          <p>Contact us</p>
        </Col>

        <Col>
          <h6>Social Networks</h6>
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
