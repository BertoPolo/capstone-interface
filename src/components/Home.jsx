import { Container, Carousel, Col, Row, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import React, { Suspense, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import MyNavbar from "./MyNavbar"
import HomeItem from "./HomeItem"
import CategoriesMenu from "./CategoriesMenu"
import NavFilter from "./NavFilter"
import CategoriesMenuDropdown from "./CategoriesMenuDropdown"
import { addItems } from "../slices/items/itemsSlice"
import { setFilter, removeFilter, clearFilters } from "../slices/pages/pagesSlice"

const Outlet = React.lazy(() => import('./Outlet'));
const ContactUs = React.lazy(() => import('./ContactUs'));
const SingleItem = React.lazy(() => import('./SingleItem'));
const Footer = React.lazy(() => import('./Footer'));

const Home = () => {

  const items = useSelector((state) => state.itemsSlice.items);
  const brands = useSelector((state) => state.brandsSlice.brands);
  const { isOnHome, isOnOutlet, isOnCountactUs, isOnSingleItem, isOnCategory, isOnBrands } = useSelector(state => state.pagesSlice)

  const dispatch = useDispatch();
  const location = useLocation();

  const [isCategoriesMenuDropdown, setIsCategoriesDropdown] = useState(false)

  const notifyNotFound = () => toast.warn(`OOPS! looks like we don't have anything there`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  //get filtered items or RANDOM items if no filters 
  const fetchFilteredItems = async (filterCriteria) => {
    const url = constructFetchUrl(filterCriteria);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        dispatch(addItems(data));
      } else {
        notifyNotFound()
        console.error('Failed to fetch items:', data.message);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const constructFetchUrl = (filterCriteria) => {
    let baseUrl = `${process.env.REACT_APP_SERVER}items`;
    if (!filterCriteria) {
      return baseUrl + '/random';
    }

    const queryString = constructQueryString(filterCriteria);
    return baseUrl + `?${queryString}`;
  };


  const constructQueryString = (filterCriteria) => {
    return Object.entries(filterCriteria)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  };


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filterCriteria = {};
    params.forEach((value, key) => {
      filterCriteria[key] = value;
      dispatch(setFilter({ key, value })); // Update Redux state with URL parameters
    });

    fetchFilteredItems(Object.keys(filterCriteria).length > 0 ? filterCriteria : null);

  }, [location, dispatch]);

  return (
    <>
      <MyNavbar />
      {/* Header */}
      <Container className="p-0">
        {/* CAROUSEL */}
        {!isOnSingleItem && !isOnCountactUs && <div>
          <Carousel className="mt-3">

            <Carousel.Item>
              <img className="d-block m-auto carouselImg" src="/assets/carousel/1.png" alt="Girl Street Bob" />
              <Carousel.Caption className="d-flex justify-content-center">
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img className="d-block m-auto w-100 carouselImg" src="/assets/carousel/2.png" alt="Waiting guy" />
              <Carousel.Caption className="d-flex justify-content-center">
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img className="d-block m-auto carouselImgReversed" src="/assets/carousel/motorbikes.avif" alt="Three Baggers" />
              <Carousel.Caption className="d-flex justify-content-center">
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>}


      </Container>
      {/* FILTERING BAR*/}
      {(isOnOutlet || isOnHome) && <NavFilter />}

      <Container fluid >
        {/* categories displayed in SM screens */}
        {/* if isOnHome dont display cats and button */}
        {(isOnHome || isOnSingleItem) && !isOnCountactUs && <> <Button variant="outline-dark" className="d-md-none" onClick={() => setIsCategoriesDropdown(!isCategoriesMenuDropdown)}>Show categories menu </Button>
          {isCategoriesMenuDropdown && <CategoriesMenuDropdown />}</>}

        {/* left column, categories MD screens */}
        <Row className="ml-2 mt-4">
          {!isOnCountactUs && <Col className="d-none col-md-3 col-lg-2 d-md-block">
            <CategoriesMenu />

          </Col>}

          <Col >
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
