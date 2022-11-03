import { Container, Carousel, Col, Row, Form, Button, FormControl } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
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




const Home = () => {

  const items = useSelector((state) => state.itemsSlice.items);
  const brands = useSelector((state) => state.brandsSlice.brands);
  const { isOnHome, isOnOutlet, isOnCountactUs, isOnSingleItem, isOnCategory, isOnBrands } = useSelector(state => state.sheetsSlice)
  // const isOnHome = useSelector((state) => state.sheetsSlice.isOnHome);
  // const isOnOutlet = useSelector((state) => state.sheetsSlice.isOnOutlet);
  // const isOnCountactUs = useSelector((state) => state.sheetsSlice.isOnCountactUs);
  // const isOnSingleItem = useSelector((state) => state.sheetsSlice.isOnSingleItem);



  const dispatch = useDispatch();

  const getRandomItems = async () => {
    try {
      const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items/random`);
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
              <img className="d-block m-auto carouselImg" src="../../../oilPack.jpg" alt="First slide" />
              <Carousel.Caption>
                <h3>Oil Pack Offer</h3>
                <p>lalala</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block m-auto carouselImg" src="../../../shipping.jpg" alt="Second slide" />

              <Carousel.Caption>
                <h3>National shipping for just 7€ !!</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block m-auto carouselImg" src="../../../ask us.jpg" alt="Third slide" />

              <Carousel.Caption>
                <h3>Send us a message!</h3>
                <p>8.00 to 13.00 / 15.30 to 20.00 Mon-Fri</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>}

        {/* FILTERING BAR*/}
        {isOnHome && <NavFilter />}

      </Container>

      <Container fluid >
        <CategoriesMenuDropdown className="d-md-none" />
        {/* left column, categories */}
        <Row className="ml-2 mt-4">
          <Col className="d-none col-md-2 d-md-block">
            <CategoriesMenu />

          </Col>

          <Col xs={10}>
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
              {isOnOutlet && <Outlet />}

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
