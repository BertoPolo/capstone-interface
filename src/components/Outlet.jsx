import { Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import HomeItem from "./HomeItem"

const Outlet = () => {
  const items = useSelector((state) => state.itemsSlice.items);
  const isOnOutlet = useSelector(state => state.pagesSlice.isOnOutlet)



  return (
    <>
      {items.filter((item) => item.isOutlet === true).map((element) => {
        return (
          <Col key={element._id}>
            <HomeItem currentItem={element} />
          </Col>
        )
      })}

    </>
  )
}
export default Outlet
