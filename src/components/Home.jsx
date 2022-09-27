import { Container, Carousel, Col, Row, Form, Button, FormControl } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
// import { useNavigate, Link } from "react-router-dom"
import { addItems } from "../slices/items/itemsSlice"
import { toggleIsOnHome, toggleIsOnOutlet, toggleIsCountactUs, toggleIsOnSingleItem } from "../slices/sheets/sheetsSlice"
import MyNavbar from "./MyNavbar"
import Footer from "./Footer"
import HomeItem from "./HomeItem"
import Outlet from "./Outlet"
import ContactUs from "./ContactUs"
import SingleItem from "./SingleItem"
import CategoriesMenu from "./CategoriesMenu"



const Home = () => {
  // const navigate = useNavigate()

  //pages --> pass to redux,cause u need this in Home and Navbar
  // const [isOnSingleItem, setIsOnSingleItem] = useState(false) // when true, also dont show carousel. 
  //
  const items = useSelector((state) => state.itemsSlice.items);
  const { isOnHome, isOnOutlet, isOnCountactUs, isOnSingleItem } = useSelector(state => state.sheetsSlice)
  // const isOnHome = useSelector((state) => state.sheetsSlice.isOnHome);
  // const isOnOutlet = useSelector((state) => state.sheetsSlice.isOnOutlet);
  // const isOnCountactUs = useSelector((state) => state.sheetsSlice.isOnCountactUs);
  // const isOnSingleItem = useSelector((state) => state.sheetsSlice.isOnSingleItem);

  const dispatch = useDispatch();
  const getItems = async () => {
    try {
      const response = await fetch(
        `${process.env.React_APP_SERVER}` || `${process.env.React_APP_LOCAL_SERVER}items`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      dispatch(addItems(data));
      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getItems()
  }, [])


  return (
    <>
      <MyNavbar />

      <Container>
        {!isOnSingleItem && <div>
          <Carousel className="">
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

        {/* search bar */}
        <Form inline className="mt-5 d-flex justify-content-center">
          <FormControl type="text" placeholder="Check if we have it" className="w-25 searchBar" />
          <Button variant="outline-success" className="ml-2">
            <i className="bi bi-search "></i> Search
          </Button>
        </Form>
      </Container>


      <Container className="mt-5">
        <Row>
          <Col xs={2}>
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
              {/* ={e.target.value} */}

            </Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Home
