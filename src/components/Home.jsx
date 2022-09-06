import { Container, Carousel, Col, Row, Dropdown, Form, Button, FormControl } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
// import { useNavigate, Link } from "react-router-dom"
import { changeItems } from "../slices/items/itemsSlice"
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
  // const isOnHome = useSelector((state) => state.sheetsSlice.isOnHome);
  // const isOnOutlet = useSelector((state) => state.sheetsSlice.isOnOutlet);
  // const isOnCountactUs = useSelector((state) => state.sheetsSlice.isOnCountactUs);
  // const isOnSingleItem = useSelector((state) => state.sheetsSlice.isOnSingleItem);

  const { isOnHome, isOnOutlet, isOnCountactUs, isOnSingleItem } = useSelector(state => state.sheetsSlice)


  const dispatch = useDispatch();



  // function to randomize the items to show
  let randomItems = []

  const randomItemsByLength = () => {
    let randomNumbers = []
    for (let i = 0; i < 15; i++) {
      const number = Math.floor(Math.random() * items.length)
      randomNumbers.includes(number) ? randomNumbers.push(Math.floor(Math.random() * items.length)) : randomNumbers.push(number) //maybe should be items.items?
      randomItems.push(items[randomNumbers[i]])
    }
    // console.log(randomNumbers)
    console.log(randomItems)

    return randomItems
  }

  const getItems = async () => {
    try {
      const response = await fetch(
        // `${process.env.React_APP_SERVER} || ${process.env.React_APP_LOCAL_SERVER}`,
        `${process.env.React_APP_LOCAL_SERVER}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      dispatch(changeItems(data));
      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getItems()  //should fetch less items  not everything -- $sample...and dont use random function
    // randomItems && randomItemsByLength()
  }, [])

  useEffect(() => {
    randomItemsByLength();
  }, [randomItems])


  return (
    <>
      <MyNavbar />

      <Container>
        {!isOnSingleItem && <div>
          <Carousel className="">
            <Carousel.Item>
              <img className="d-block m-auto carouselImg" src="../../../IMG_8830.jpg" alt="First slide" />
              <Carousel.Caption>
                <h3>Oil Pack Offer</h3>
                <p>lalala</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block m-auto carouselImg" src="../../../IMG_8879.jpg" alt="Second slide" />

              <Carousel.Caption>
                <h3>Shipping price</h3>
                <p>lalala</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block m-auto carouselImg" src="../../../IMG_7389.jpg" alt="Third slide" />

              <Carousel.Caption>
                <h3>Ask us whenever You want</h3>
                <p>lalala</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>}

        {/* search bar */}
        <Form inline className="mt-5 d-flex justify-content-center">
          <FormControl type="text" placeholder="Write here what you want to search" className="w-25 searchBar" />
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
                {randomItems.map((element) => {
                  return (
                    <Col>
                      <HomeItem key={element._id} currentItem={element} onClick={() => dispatch(toggleIsOnHome(false), toggleIsOnSingleItem(true))} />
                    </Col>
                  )
                })}
              </Row>}

              {/* OUTLET */}
              {isOnOutlet && <Outlet />}

              {/* CONTACT US */}
              {isOnCountactUs && <ContactUs />}

              {/* Single Item */}
              {isOnSingleItem && <SingleItem currentItem />}
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
