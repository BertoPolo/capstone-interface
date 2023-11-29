import { Container, Carousel, Col, Row, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import React, { Suspense, useEffect } from "react";
import { addItems } from "../slices/items/itemsSlice"
import MyNavbar from "./MyNavbar"
import HomeItem from "./HomeItem"
import CategoriesMenu from "./CategoriesMenu"
import NavFilter from "./NavFilter"
import CategoriesMenuDropdown from "./CategoriesMenuDropdown"
import { useState } from "react"

const Outlet = React.lazy(() => import('./Outlet'));
const ContactUs = React.lazy(() => import('./ContactUs'));
const SingleItem = React.lazy(() => import('./SingleItem'));
const Footer = React.lazy(() => import('./Footer'));

const Home = () => {

  const items = useSelector((state) => state.itemsSlice.items);
  const brands = useSelector((state) => state.brandsSlice.brands);
  const { isOnHome, isOnOutlet, isOnCountactUs, isOnSingleItem, isOnCategory, isOnBrands } = useSelector(state => state.pagesSlice)

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
        {!isOnSingleItem && !isOnCountactUs && <div>
          <Carousel className="mt-3">
            {/*  */}
            <Carousel.Item>
              <img fluid="true" className="d-block m-auto carouselImg" src="https://images.unsplash.com/photo-1548880021-76c14b1f6602?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Under construction" />
              <Carousel.Caption className="d-flex justify-content-center">
                <div className="transparencywWhiteBox p-3">
                  <h2 className="mb-0" >This website is not finished</h2 >
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            {/*  */}

            <Carousel.Item>
              <img fluid="true" className="d-block m-auto carouselImg" src="/oilPack.avif" alt="Oil Pack Offer slide" />
              <Carousel.Caption className="d-flex justify-content-center">
                <div className="transparencywWhiteBox p-3">
                  <h2 className="mb-0">Oil Pack Offer</h2 >
                  <p className="mb-0">from 50€ </p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img fluid="true" className="d-block m-auto carouselImg " src="/shipping.avif" alt="National shipping slide" />

              <Carousel.Caption className="d-flex justify-content-center">
                <div className="transparencywWhiteBox p-3 ">
                  <h2 className="mb-0">National shipping for just 7€ !!</h2 >
                </div>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img fluid="true" className="d-block m-auto carouselImg objectPosition" src="/ask-us.avif" alt="Send us a message slide" />
              <Carousel.Caption className="d-flex justify-content-center">
                <div className="transparencywWhiteBox p-2">
                  <h2 className="">Send us a message!</h2 >
                  <p className="mb-0">8.00 to 13.00 / 15.30 to 20.00 Mon-Fri</p>
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
        {/* if isOnHome dont display cats and button */}
        {isOnHome && !isOnCountactUs && <> <Button variant="outline-dark" className="d-md-none" onClick={() => setIsCategoriesDropdown(!isCategoriesMenuDropdown)}>Show categories menu </Button>
          {isCategoriesMenuDropdown && <CategoriesMenuDropdown />}</>}

        {/* left column, categories MD screens */}
        <Row className="ml-2 mt-4">
          {!isOnCountactUs && <Col className="d-none col-md-3 col-lg-2 d-md-block">
            <CategoriesMenu />

          </Col>}

          <Col > {/* xs={9} md={10} */}
            <Col>

              {/* HOME */}
              {isOnHome &&
                <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5">

                  {items.map((element) => {
                    return (
                      <Col key={element._id}>
                        <HomeItem currentItem={element} />
                      </Col>
                    )
                  })}
                </Row>}

              {/* OUTLET */}
              {isOnOutlet &&
                <Suspense fallback={<div>Loading...</div>}>
                  <Outlet />
                </Suspense>}

              {/* CONTACT US */}
              {isOnCountactUs &&
                <Suspense fallback={<div>Loading...</div>}>
                  <ContactUs />
                </Suspense>}

              {/* Single Item */}
              {isOnSingleItem &&
                <Suspense fallback={<div>Loading...</div>}>
                  <SingleItem />
                </Suspense>}

            </Col>
          </Col>
        </Row>
        {/* Footer */}
        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
      </Container>
    </>
  )
}
export default Home
