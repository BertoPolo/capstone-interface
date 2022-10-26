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
import { addBrands } from "../slices/brands/brandsSlice"




const Home = () => {

  const items = useSelector((state) => state.itemsSlice.items);
  const brands = useSelector((state) => state.brandsSlice.brands);
  const { isOnHome, isOnOutlet, isOnCountactUs, isOnSingleItem, isOnCategory, isOnBrands } = useSelector(state => state.sheetsSlice)
  // const isOnHome = useSelector((state) => state.sheetsSlice.isOnHome);
  // const isOnOutlet = useSelector((state) => state.sheetsSlice.isOnOutlet);
  // const isOnCountactUs = useSelector((state) => state.sheetsSlice.isOnCountactUs);
  // const isOnSingleItem = useSelector((state) => state.sheetsSlice.isOnSingleItem);


  const [searchInput, setSearchinput] = useState("")
  // const [isNotFound, setIsNotFound] = useState(false)

  const dispatch = useDispatch();

  const getItems = async () => {
    try {
      const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items`,

      );
      let data = await response.json();
      dispatch(addItems(data));
    } catch (error) {
      console.log(error)
    }
  }


  const getBrands = async () => {
    try {
      const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}brands/all`);
      const data = await response.json();
      dispatch(addBrands(data));

    } catch (error) {
      console.log(error)
    }
  }


  const searchItems = async (e) => {
    //reset state to false on start
    // then ,if not finding anything TRUE on state
    e.preventDefault()

    try {
      const response = await fetch(`${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items/bytitle/${searchInput}`);
      const data = await response.json();
      if (data.length > 0) dispatch(addItems(data));
      else notifyNotFound()


    } catch (error) {
      console.log(error)
    }
  }

  const notifyNotFound = () => toast.warn(`OOPS! looks like we don't have that`, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });


  useEffect(() => {
    getItems()
    getBrands()
  }, [])


  return (
    <>
      <MyNavbar />

      {/* Toast */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Container>
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

        <NavFilter />
        {/* search bar */}
        <Form inline className="mt-5 d-flex justify-content-center" onSubmit={(e) => searchItems(e)}>
          <FormControl type="text" value={searchInput} placeholder="Check if we have it" className="w-25 searchBar" onChange={(e) => setSearchinput(e.target.value)} />
          <Button type="submit" variant="outline-success" className="ml-2 mr-2">
            <i className="bi bi-search "></i> Search
          </Button>
          <Button variant="outline-primary" onClick={() => { getItems(); setSearchinput("") }}>Clear</Button>
        </Form>

      </Container>


      {/* <Container className="mt-5 ml-0" > */} {/* mr-0 dont works,  */}
      <Row className="ml-2 mt-4">
        <Col xs={2} className="">
          <CategoriesMenu />
        </Col>

        <Col xs={10} className="">
          <Col>

            {/* HOME */}
            {isOnHome && <Row>

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

            {/* By Categories */}
            {/* {isOnCategory && <CategoriesMenu />} */}

            {/* By Brands */}
            {/* {isOnBrands && <CategoriesMenu />} */}

            <Footer />
          </Col>
        </Col>
      </Row>
      {/* </Container> */}
    </>
  )
}
export default Home
