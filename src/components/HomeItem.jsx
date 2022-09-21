import { Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../slices/cart/cartSlice"



const HomeItem = ({ currentItem }) => {
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cartSlice.cart);
  const isOnOutlet = useSelector(state => state.sheetsSlice.isOnOutlet)

  const dispatch = useDispatch();

  return (
    <Card style={{ width: "11rem" }} className="item">
      <Card.Img
        style={{ maxHeight: "13rem" }}
        variant="top"
        src={currentItem.image}
        alt={currentItem.title}
        className="pointer"
      // onClick={() => navigate("/item")}
      />
      <Card.Body>
        <Card.Title className="pointer"> {/* onClick={() => navigate("/:currentItem._id")} */}
          {currentItem.title}
        </Card.Title>
        <Card.Text>{currentItem.description}</Card.Text>

        {isOnOutlet ? <Card.Title className="d-inline ">{currentItem.outletPrice} Outlet!</Card.Title> : <Card.Title className="d-inline ">{currentItem.price}</Card.Title>}
        {/* <Card.Title className="d-inline ">{currentItem.price}</Card.Title> */}

        <Button variant="primary" onClick={() => dispatch(addToCart(currentItem))}>Add to cart</Button>
      </Card.Body>
    </Card>
  )
}
export default HomeItem
