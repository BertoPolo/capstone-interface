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
            <p> Instagram Icon</p>
            <p> LinkedIn Icon</p>
          </Col>
          <Col>
            <h5>
              <u>Contact us</u>
            </h5>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Footer
