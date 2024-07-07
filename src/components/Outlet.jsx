import { Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import HomeItem from "./HomeItem"

const Outlet = () => {
  const items = useSelector((state) => state.itemsSlice.items);
  const isOnOutlet = useSelector(state => state.pagesSlice.isOnOutlet)

  return (
    <>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5">
        {items.filter((item) => item.isOutlet === true).map((element) => {
          return (
            <Col key={element._id}>
              <HomeItem currentItem={element} />
            </Col>
          )
        })}

      </Row>
    </>
  )
}
export default Outlet
