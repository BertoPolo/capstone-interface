import { Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../slices/cart/cartSlice"
import { toggleIsOnHome, toggleIsOnOutlet, toggleIsCountactUs, toggleIsOnSingleItem } from "../slices/sheets/sheetsSlice"




const HomeItem = ({ currentItem }) => {
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cartSlice.cart);
  const { isOnHome, isOnOutlet, isOnCountactUs, isOnSingleItem, sumOneToCart } = useSelector(state => state.sheetsSlice)


  const dispatch = useDispatch();


  const checkIfIsAlreadyInCart = () => {
    if (cart.includes(currentItem)) {
      dispatch(sumOneToCart(currentItem))

    } else {
      dispatch(addToCart(currentItem))
    }

  }

  const changeHomeToSingleItem = () => {
    dispatch(toggleIsOnHome(false))
    dispatch(toggleIsOnSingleItem(true))
  }

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
        <Card.Title className="pointer" onClick={() => changeHomeToSingleItem()}>
          {currentItem.title}
        </Card.Title>
        <Card.Text>{currentItem.description}</Card.Text>

        {isOnOutlet ? <Card.Title className="d-inline "> <b>{currentItem.outletPrice}</b> <s>{currentItem.price}</s> </Card.Title> : <Card.Title className="d-inline ">{currentItem.price} </Card.Title>}
        {/* <Card.Title className="d-inline ">{currentItem.price}</Card.Title> */}

        <Button variant="primary" onClick={() => checkIfIsAlreadyInCart()}>Add to cart</Button>
      </Card.Body>
    </Card>
  )
}
export default HomeItem
