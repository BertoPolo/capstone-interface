import { Container, Row, Col } from "react-bootstrap"

// center titles

const Footer = () => {
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col>
            <h6>
              <u>basic info</u>
            </h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, labore! Accusantium quasi, vitae totam quaerat adipisci necessitatibus
              veritatis debitis perferendis quisquam. Magnam vel quaerat illo ut, iste beatae ipsam quia!
            </p>
          </Col>
          <Col>
            <h6>
              <u>Follow us</u>
            </h6>
            <p> Instagram Icon</p>
            <p> LinkedIn Icon</p>
          </Col>
          <Col>
            <h6>
              <u>Contact us</u>
            </h6>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Footer
