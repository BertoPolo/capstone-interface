import { Container, Carousel, Col, Row, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import React, { Suspense, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import MyNavbar from "./MyNavbar"
import HomeItem from "./HomeItem"
import CategoriesMenu from "./CategoriesMenu"
import NavFilter from "./NavFilter"
import CategoriesMenuDropdown from "./CategoriesMenuDropdown"

import { changeSelectedItem } from "../slices/items/itemsSlice"
import { toggleIsOnSingleItem } from "../slices/pages/pagesSlice"

// import { addItems } from "../slices/items/itemsSlice"
// import { setFilter, removeFilter, clearFilters } from "../slices/pages/pagesSlice"

const Outlet = React.lazy(() => import('./Outlet'));
const ContactUs = React.lazy(() => import('./ContactUs'));
const SingleItem = React.lazy(() => import('./SingleItem'));
const Footer = React.lazy(() => import('./Footer'));

const Home = () => {

  const { items, selectedItem } = useSelector((state) => state.itemsSlice);
  const brands = useSelector((state) => state.brandsSlice.brands);
  const { isOnHome, isOnOutlet, isOnCountactUs, isOnSingleItem, isOnCategory, isOnBrands, filters } = useSelector(state => state.pagesSlice)

  const dispatch = useDispatch();
  const location = useLocation();

  const { itemTitle: paramsItemTitle } = useParams();

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

  const fetchItemByTitle = async (title) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}items/title/${title}`);
      if (response.ok) {
        const data = await response.json();
        dispatch(changeSelectedItem(data));
        dispatch(toggleIsOnSingleItem(true));
      } else {
        toast.warn('Item not found', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };


  useEffect(() => {
    dispatch(changeSelectedItem(null))
  }, [dispatch]);


  useEffect(() => {
    const itemInStore = items.find(item => item.title === paramsItemTitle);
    if (selectedItem && selectedItem.title === paramsItemTitle) {
      return;
    } else if (itemInStore) {
      dispatch(changeSelectedItem(itemInStore));
      dispatch(toggleIsOnSingleItem(true));
    } else if (!selectedItem || selectedItem.title !== paramsItemTitle) {
      fetchItemByTitle(paramsItemTitle);
    }
  }, [paramsItemTitle, selectedItem, items, dispatch]);

  return (
    <>
      <MyNavbar />
      {/* Header */}

      {/* CAROUSEL */}
      {!isOnSingleItem && !isOnCountactUs && <Container fluid className="bg-softGray-carousel px-0">
        {/* <div> */}
        <Carousel className="mt-3 px-0">

          <Carousel.Item>
            <img className="d-block m-auto w-100 carouselImg" src="/assets/carousel/1.avif" alt="Girl Street Bob" />
            <Carousel.Caption className="d-flex justify-content-center">
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block m-auto w-100 carouselImg" src="/assets/carousel/2.avif" alt="Waiting guy" />
            <Carousel.Caption className="d-flex justify-content-center">
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block m-auto w-100 carouselImgReversed" src="/assets/carousel/motorbikes.avif" alt="Three Baggers" />
            <Carousel.Caption className="d-flex justify-content-center">
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/* </div> */}
      </Container>
      }


      {/* FILTERING BAR*/}
      {(isOnOutlet || isOnHome) && <NavFilter />}

      <Container fluid  >
        {/* categories displayed in SM screens */}
        {/* if isOnHome dont display cats and button */}
        {(isOnHome || isOnSingleItem) && !isOnCountactUs && <> <Button variant="outline-dark" className="d-md-none" onClick={() => setIsCategoriesDropdown(!isCategoriesMenuDropdown)}>Show categories menu </Button>
          {isCategoriesMenuDropdown && <CategoriesMenuDropdown />}</>}

        {/* left column, categories MD screens */}
        <Row className="ml-2 mt-4">
          {!isOnCountactUs &&
            <Col className="d-none col-md-3 col-lg-2 d-md-block">
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

      </Container>
      {/* Footer */}
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}
export default Home
