import { Container, Carousel, Col, Row, Dropdown } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import Footer from "./Footer"
import HomeItem from "./HomeItem"
import CategoriesMenu from "./CategoriesMenu"
// import { useNavigate } from "react-router-dom"

const News = () => {
  // const navigate = useNavigate()

  return (
    <>
      <MyNavbar />

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

          <Col xs={10}>
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
export default News
