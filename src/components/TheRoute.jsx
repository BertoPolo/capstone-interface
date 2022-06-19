import { Container, ProgressBar, Button, Row, Col, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import MyNavbar from "./MyNavbar"


// https://api.openweathermap.org/data/2.5/weather?q=$%7Bquery%7D&appid=${process.env.React_APP_OPEN_WEATHER_KEY}

  
    const TheRoute = () => {
      
      const map=useSelector((state) => state.routesSlice.map)      
      
      const wantStop=useSelector((state)=>state.citiesSlice.wantStop)
      const optStopCity=useSelector((state)=>state.citiesSlice.optStopCity)
      // const optStopCountry=useSelector((state)=>state.citiesSlice.optStopCountry)
      const originCity=useSelector((state)=>state.citiesSlice.originCity)
      // const originCountry=useSelector((state)=>state.citiesSlice.originCountry)
      const destinationCity=useSelector((state)=>state.citiesSlice.destinationCity)
      // const destinationCountry=useSelector((state)=>state.citiesSlice.destinationCountry)

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

            <h6>Weather now</h6>
          <div className="d-flex justify-content-around">
            <span>{originCity} WEATHER ICON</span>
            { wantStop && <span>{optStopCity} WEATHER ICON</span>}
            <span>{destinationCity} WEATHER ICON</span>
          </div>
          <h6>Description</h6>
          <p>lalalalalala</p>
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
