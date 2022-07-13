import { Container, Row, Col } from "react-bootstrap"

// center titles

const Footer = () => {
  return (
    <>
      <Container className="mt-3 footer">
        <Row>
          <Col>
            <h5>
              <u>Basic info</u>
            </h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, labore! Accusantium quasi, vitae totam quaerat adipisci necessitatibus
              veritatis debitis perferendis quisquam. Magnam vel quaerat illo ut, iste beatae ipsam quia!
            </p>
          </Col>
          <Col>
            <h5>
              <u>Follow us</u>
            </h5>
            <p>
              <i className="bi bi-instagram"></i>
              Click To Follow
            </p>
            <p>
              <i className="bi bi-linkedin"></i>
              Click To Follow
            </p>
          </Col>
          <Col>
            <h5>
              <u>Contact us</u>
            </h5>
            <p>bertopolo91@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Footer
