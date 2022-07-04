import { Form, Container, Carousel } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
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
    </>
  )
}
export default Home
