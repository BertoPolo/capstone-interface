import { Form, Carousel } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate()

  return (
    <>
      <MyNavbar />

      <Carousel >
  <Carousel.Item>
    <img
      className="d-block carouselImg"
      src="../../../IMG_8830.jpg" 
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First - autor's name</h3>
      <p>Country and route's name</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block carouselImg"
      src="../../../IMG_8830.jpg" 
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second - autor's name</h3>
      <p>Country and route's name</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
       className="d-block carouselImg"
      src="../../../IMG_8830.jpg" 
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third - autor's name</h3>
      <p>Country and route's name</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

      {/* <Form inline className="d-flex justify-content-center ">
          <FormControl type="text" placeholder="Which country?" className="mr-sm-2" />
          <Button variant="outline-success" onClick={()=>navigate("/countryList")}>Search</Button>
        </Form> */}

    <div className="d-flex justify-content-center mt-5">
        <Form inline>
          <Form.Group>
            <Form.Label>Choose a country</Form.Label>
  
            <Form.Control  as="select">
              <option> let this one empty</option>
              <option>dynamic country</option>
              <option>dynamic country</option>         
            </Form.Control>
          </Form.Group>
          </Form>
    </div>

      
    </>
  )
}
export default Home
