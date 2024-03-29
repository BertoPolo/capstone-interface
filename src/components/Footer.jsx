import { Row, Col } from "react-bootstrap"

const Footer = () => {
  return (
    <>
      <Row className="mt-5 pt-1 footer text-center">
        <Col >
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
              <i className="bi bi-instagram mr-1"></i>
              We are on Instagram!
            </a>
          </p>
          <p>
            <a target="_blank" href="https://www.linkedin.com/in/bertopolo/" rel="noopener noreferrer">
              <i className="bi bi-linkedin mr-1"></i>
              We are on LinkedIn!
            </a>
          </p>

        </Col>
        <Col>
          <h5>
            <u>Contact us</u>
          </h5>
          <a className="d-block" href="bertopolo91@gmail.com">bertopolo91@gmail.com</a>
          {/* <p>stufftoroute@wedontexist.com</p> */}
        </Col>
      </Row>
    </>
  )
}

export default Footer
