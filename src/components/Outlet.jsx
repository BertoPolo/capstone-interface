import { Col, Row } from "react-bootstrap"
import SingleItem from "./SingleItem"

// import { useSelector } from "react-redux"

// import Footer from "./Footer"
// import CategoriesMenu from "./CategoriesMenu"
// import { useNavigate } from "react-router-dom"

const Outlet = () => {
  // const navigate = useNavigate()
  // const items = useSelector((state) => state.itemsSlice.items);

  return (
    <>

      <Col xs={10}>
        <Col>
          <Row>
            {/* map items. filter by Outlet*/}
            <Col>
              <SingleItem />
            </Col>
          </Row>
        </Col>
      </Col>
    </>
  )
}
export default Outlet
