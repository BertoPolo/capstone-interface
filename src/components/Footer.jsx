import { Row, Col } from "react-bootstrap"
// import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <Row className="mt-5 footer">
        <Col>
          <h5>
            <u>About Us</u>
          </h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, labore! Accusantium quasi, vitae totam quaerat adipisci necessitatibus
            veritatis debitis perferendis quisquam. Magnam vel quaerat illo ut, iste beatae ipsam quia!
          </p>

        </Col>
        <Col>
          <h5>
            <u>Social Networks</u>
          </h5>
          <p>
            <a target="_blank" href="https://www.instagram.com" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i>
              Click To check our Instagram
            </a>
          </p>
          <p>
            <a target="_blank" href="https://www.linkedin.com" rel="noopener noreferrer">
              <i className="bi bi-linkedin"></i>
              Click To check our LinkedIn
            </a>
          </p>

        </Col>
        <Col>
          <h5>
            <u>Contact us</u>
          </h5>
          <p>bertopolo91@gmail.com</p>
        </Col>
      </Row>
    </>
  )
}

export default Footer
