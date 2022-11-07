import { Form, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const ContactUs = () => {
  return (
    <>
      <Container>
        <h1 >Contact Us</h1>

        <ul className="my-4">
          <Row>
            <Col>
              <li>Frares Street,nº666</li>
              <li> P.C. 07703</li>
              <li>500m2 surface </li>
              <li>Mahón,Menorca,Spain </li>

            </Col>
            <Col>
              <li>Phone +34 681 32 92 33 </li>
              <li>Whastapp +34 681 24 55 88</li>
              <li>Email Stufftoroute@info.com </li>
              <li>8.00 to 13.00 / 15.30 to 20.00 Mon-Fri</li>

            </Col>

          </Row>
        </ul>

        {/* google's map where we are located */}
        {/* <Row className="d-flex justify-content-center"> */}
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d541.1699573438805!2d4.264104693074547!3d39.889476788095195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1295879a69453e9d%3A0xeba84b7a689a6c94!2sPla%C3%A7a%20de%20la%20Conquesta%2C%202%2C%2007701%20Ma%C3%B3%2C%20Illes%20Balears!5e0!3m2!1sen!2ses!4v1660040614840!5m2!1sen!2ses" style={{ border: "0", width: "30vw", height: "50vh" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        {/* </Row> */}
      </Container>
    </>
  )
}

export default ContactUs
