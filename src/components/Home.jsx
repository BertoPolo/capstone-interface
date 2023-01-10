import { Container, Carousel, Col, Row, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { addItems } from "../slices/items/itemsSlice"
import MyNavbar from "./MyNavbar"
import Footer from "./Footer"
import HomeItem from "./HomeItem"
import Outlet from "./Outlet"
import ContactUs from "./ContactUs"
import SingleItem from "./SingleItem"
import CategoriesMenu from "./CategoriesMenu"
import NavFilter from "./NavFilter"
import CategoriesMenuDropdown from "./CategoriesMenuDropdown"
import { useState } from "react"


const Home = () => {

  const items = useSelector((state) => state.itemsSlice.items);
  const brands = useSelector((state) => state.brandsSlice.brands);
  const { isOnHome, isOnOutlet, isOnCountactUs, isOnSingleItem, isOnCategory, isOnBrands } = useSelector(state => state.pagesSlice)
  // const isOnHome = useSelector((state) => state.sheetsSlice.isOnHome);
  // const isOnOutlet = useSelector((state) => state.sheetsSlice.isOnOutlet);
  // const isOnCountactUs = useSelector((state) => state.sheetsSlice.isOnCountactUs);
  // const isOnSingleItem = useSelector((state) => state.sheetsSlice.isOnSingleItem);

  const [isCategoriesMenuDropdown, setIsCategoriesDropdown] = useState(false)



  const dispatch = useDispatch();

  const getRandomItems = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}items/random`);
      const data = await response.json();
      if (response.ok) dispatch(addItems(data));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRandomItems()
  }, [])

  return (
    <>
      <MyNavbar />

      <Container>
        {/* CAROUSEL */}
        {!isOnSingleItem && <div>
          <Carousel className="mt-3">
            <Carousel.Item>
              <img fluid="true" className="d-block m-auto carouselImg" src="https://images.unsplash.com/photo-1548880021-76c14b1f6602?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="under construction" />
              <Carousel.Caption className="d-flex justify-content-center">
                <div className="transparencywWiteBox p-2">
                  <h2 className="">This website is under construction</h2 >
                  <p></p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img fluid="true" className="d-block m-auto carouselImg" src="https://images.unsplash.com/photo-1590227763209-821c686b932f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Oil Pack Offer slide" />
              <Carousel.Caption className="d-flex justify-content-center">
                <div className="transparencywWiteBox p-2">
                  <h2 className="">Oil Pack Offer</h2 >
                  <p>from 50€ </p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img fluid="true" className="d-block m-auto carouselImg " src="https://images.unsplash.com/photo-1558981420-87aa9dad1c89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="National shipping slide" />

              <Carousel.Caption className="d-flex justify-content-center">
                <div className="transparencywWiteBox p-2"><h2 className="">National shipping for just 7€ !!</h2 ></div>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img fluid="true" className="d-block m-auto carouselImg" src="https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg" alt="send us a message slide" />
              <Carousel.Caption className="d-flex justify-content-center">
                <div className="transparencywWiteBox p-2">
                  <h2 className="">Send us a message!</h2 >
                  <p>8.00 to 13.00 / 15.30 to 20.00 Mon-Fri</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>}

        {/* FILTERING BAR*/}
        {(isOnOutlet || isOnHome) && <NavFilter />}

      </Container>

      <Container fluid >
        {/* categories displayed in SM screens */}
        {/* if isOnHome=== true dont display cats and button */}
        {isOnHome && <> <Button variant="outline-dark" className="d-md-none" onClick={() => setIsCategoriesDropdown(!isCategoriesMenuDropdown)}>Show categories menu </Button>
          {isCategoriesMenuDropdown && <CategoriesMenuDropdown />}</>}

        {/* left column, categories */}
        <Row className="ml-2 mt-4">
          <Col className="d-none col-md-3 col-lg-2 d-md-block">
            <CategoriesMenu />

          </Col>

          <Col > {/* xs={9} md={10} */}
            <Col>

              {/* HOME */}
              {isOnHome && <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5">

                {items.map((element) => {
                  return (
                    <Col key={element._id}>
                      <HomeItem currentItem={element} />
                    </Col>
                  )
                })}
              </Row>}

              {/* OUTLET */}
              {isOnOutlet && <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5"><Outlet /></Row>}

              {/* CONTACT US */}
              {isOnCountactUs && <ContactUs />}

              {/* Single Item */}
              {isOnSingleItem && <SingleItem />}

            </Col>
          </Col>
        </Row>
        {/* Footer */}
        <Footer />

      </Container>
    </>
  )
}
export default Home
