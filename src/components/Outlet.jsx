import { Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import HomeItem from "./HomeItem"

// add something in case of is not there any outlet article available

const Outlet = () => {
  const items = useSelector((state) => state.itemsSlice.items);
  const isOnOutlet = useSelector(state => state.sheetsSlice.isOnOutlet)



  return (
    <>

      <Col xs={10}>
        <Col>
          <Row>
            {/* map items. filter by Outlet*/}
            {items.filter((item) => item.isOutlet === true).map((element) => {
              return (
                <Col key={element._id}>
                  <HomeItem currentItem={element} />
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
