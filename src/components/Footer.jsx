import { Row, Col } from "react-bootstrap"
// import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <Row className="mt-3 footer">
        <Col>
          <h5>
            <u>About Us</u>
          </h5>
          <p>
            We are a small family company who love motorbikes since we born, and now we want to share with others our passion and support. We made this project with the purpose of approach others this lifestyle on an accessible way.
          </p>

        </Col>
        <Col>
          {/* change A tags */}
          <h5>
            <u>Social Networks</u>
          </h5>
          <p>
            <a target="_blank" href="https://www.instagram.com" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i>
              We are on Instagram!
            </a>
          </p>
          <p>
            <a target="_blank" href="https://www.linkedin.com" rel="noopener noreferrer">
              <i className="bi bi-linkedin"></i>
              We are on LinkedIn!
            </a>
          </p>

        </Col>
        <Col>
          <h5>
            <u>Contact us</u>
          </h5>
          <p>bertopolo91@gmail.com</p>
          <p>stufftoroute@info.com</p>
        </Col>
      </Row>
    </>
  )
}

export default Footer
