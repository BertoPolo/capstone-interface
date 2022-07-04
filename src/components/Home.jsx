import { Container, Carousel, Col, Row } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import Item from "./Item"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <MyNavbar />

      <Container>
        <div>
          <Carousel>
            <Carousel.Item>
              <img className="d-block carouselImg" src="../../../IMG_8830.jpg" alt="First slide" />
              <Carousel.Caption>
                <h3>First - autor's name</h3>
                <p>Country and route's name</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block carouselImg" src="../../../IMG_8830.jpg" alt="Second slide" />

              <Carousel.Caption>
                <h3>Second - autor's name</h3>
                <p>Country and route's name</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block carouselImg" src="../../../IMG_8830.jpg" alt="Third slide" />

              <Carousel.Caption>
                <h3>Third - autor's name</h3>
                <p>Country and route's name</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <img src="" alt="maintainment eco pack" />
          <img src="" alt="shipping price" />
        </div>
      </Container>
      <Container>
        <div>
          <Col xs={4}>
            <h4>CATEGORIES</h4>

            <p>Accessories</p>
            <p>Clothes</p>
            <p>Helmets</p>
            <p>Lights</p>
            <p>On Hands</p>
            <p>On Feet</p>
            <p>Seats</p>
            <p>Exhausts</p>
            <p>Engine</p>
            <p>Carburetors</p>
            <p>Air Filters</p>
            <p>Tools</p>
            <p>Books</p>
          </Col>
          <Col xs={8}>
            {/* <Row> */}
            <Col>
              <Item />
            </Col>
            {/* </Row> */}
          </Col>
        </div>
      </Container>
    </>
  )
}
export default Home
