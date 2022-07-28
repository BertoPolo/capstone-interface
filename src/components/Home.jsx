import { Container, Carousel, Col, Row, Dropdown } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import Footer from "./Footer"
import HomeItem from "./HomeItem"
import CategoriesMenu from "./CategoriesMenu"
// import { useNavigate } from "react-router-dom"

const Home = () => {
  // const navigate = useNavigate()

  // function to randomize the items to show

  return (
    <>
      <MyNavbar />

      <Container>
        <div>
          <Carousel className="">
            <Carousel.Item>
              <img className="d-block m-auto carouselImg" src="../../../IMG_8830.jpg" alt="First slide" />
              <Carousel.Caption>
                <h3>Oil Pack Offer</h3>
                <p>lalala</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block m-auto carouselImg" src="../../../IMG_8830.jpg" alt="Second slide" />

              <Carousel.Caption>
                <h3>Shipping price</h3>
                <p>lalala</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block m-auto carouselImg" src="../../../IMG_8830.jpg" alt="Third slide" />

              <Carousel.Caption>
                <h3>Ask us whenever You want</h3>
                <p>lalala</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </Container>

      <Container className="mt-5">
        <Row>
          <Col xs={2}>
            <h4>CATEGORIES</h4>
            <CategoriesMenu />

            <hr />
            <h4>BRANDS</h4>

            <Dropdown>
              <Dropdown.Toggle variant="warning">Dropdown Button</Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Brand 1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Brand 2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Brand 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col xs={10} className="">
            <Col>
              <Row>
                {/* map items with math random */}
                <Col>
                  <HomeItem />
                </Col>
                <Col>
                  <HomeItem />
                </Col>
                <Col>
                  <HomeItem />
                </Col>
                <Col>
                  <HomeItem />
                </Col>
              </Row>
            </Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Home
