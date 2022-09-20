import { Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import HomeItem from "./HomeItem"


// import Footer from "./Footer"
// import CategoriesMenu from "./CategoriesMenu"

const Outlet = () => {
  // const navigate = useNavigate()
  const items = useSelector((state) => state.itemsSlice.items);
  const isOnOutlet = useSelector(state => state.sheetsSlice.isOnOutlet)

  const dispatch = useDispatch();


  return (
    <>

      <Col xs={10}>
        <Col>
          <Row>
            {/* map items. filter by Outlet*/}
            { }
            {items.filter((item) => item.isOutlet === true).map((element) => {
              return (
                <Col key={element._id}>
                  <HomeItem currentItem={element} newPrice={element.outletPrice} />
                </Col>
              )
            })}
          </Row>
        </Col>
      </Col>
    </>
  )
}
export default Outlet
