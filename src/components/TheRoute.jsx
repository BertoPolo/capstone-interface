import { Container, ProgressBar, Button, Row, Col, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import MyNavbar from "./MyNavbar"



// https://api.openweathermap.org/data/2.5/weather?q=$%7Bquery%7D&appid=${process.env.React_APP_OPEN_WEATHER_KEY}


    
    const TheRoute = () => {
      
      const map=useSelector((state) => state.generalProperties.map)      
      
  return (
    <>
    <MyNavbar/>

    <Container className="bg-main fullVH">
      <h2 className="d-flex justify-content-center">(user)'s Route</h2>
      <Row>
        <Col xs={8} className="d-flex justify-content-center" >
          <div >
            <h4>Route Argelès-Gazost - Pont d'Espagne</h4>
            <span className="mt-4">Rate</span> <ProgressBar animated now={20} />

            <iframe
            style={{width:600, height:450, border:0, frameBorder:0}}
            referrerPolicy="no-referrer-when-downgrade"
            src={map}
            title="map_iframe"
            allowFullScreen>
            </iframe>

          </div>
        </Col>
        <Col className="border-left">
          <h4>(argelès)Reviews </h4>

          <Form className="border-bottom">
            <Form.Group>
              <Form.Control as="textarea" placeholder="Your opinion" rows={3} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rate it</Form.Label>

              <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Button className="mb-2">Submit review</Button>
          </Form>
          <div className="mt-2">
            <p> bla bla bla</p>
            <p> bla bla bla</p>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default TheRoute

// <Button variant="danger">
// <b>-</b>
// </Button>
// <Button variant="success">
// <b>+</b>
// </Button>
// <Button>Submit </Button>
