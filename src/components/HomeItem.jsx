import { Card, Button } from "react-bootstrap"
// import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addToCart, removeFromCart } from "../slices/cart/cartSlice"
import { changeSelectedItem } from "../slices/items/itemsSlice"
import { toggleIsOnHome, toggleIsOnOutlet, toggleIsCountactUs, toggleIsOnSingleItem, toggleIsOnCategory } from "../slices/sheets/sheetsSlice"




const HomeItem = ({ currentItem }) => {
  // const navigate = useNavigate()

  const cart = useSelector((state) => state.cartSlice.cart);
  const selectedItem = useSelector((state) => state.itemsSlice.selectedItem);
  const { isOnHome, isOnOutlet, isOnCountactUs, isOnSingleItem } = useSelector(state => state.sheetsSlice)
  const isAdmin = useSelector((state) => state.usersSlice.isAdmin);


  const dispatch = useDispatch();


  const checkIfIsAlreadyInCart = () => {

    if (cart.some((element) => element === currentItem)) {
      dispatch(addToCart(currentItem))

    } else {
      dispatch(addToCart(currentItem))
      console.log(cart)
    }
  }

  const changeHomeToSingleItem = () => {
    dispatch(toggleIsOnHome(false))
    dispatch(toggleIsOnOutlet(false))
    dispatch(toggleIsCountactUs(false))
    dispatch(toggleIsOnCategory(false))
    dispatch(toggleIsOnSingleItem(true))
    dispatch(changeSelectedItem(currentItem))
  }

  return (
    <Card style={{ width: "11rem" }} className="item" >
      <Card.Img
        style={{ maxHeight: "13rem" }}
        variant="top"
        src={currentItem.image}
        alt={currentItem.title}
        className="pointer"
        onClick={() => changeHomeToSingleItem()}
      />
      <Card.Body>
        <Card.Title className="pointer" onClick={() => changeHomeToSingleItem()} >
          {currentItem.title}
        </Card.Title>
        <Card.Text>{currentItem.description}</Card.Text>

        {isOnOutlet ? <Card.Title className="d-inline "> <b>{currentItem.outletPrice}</b> <s>{currentItem.price}</s> </Card.Title> : <Card.Title className="d-inline ">{currentItem.price} </Card.Title>}

        {!isAdmin && <Button variant="primary" onClick={() => checkIfIsAlreadyInCart()}>Add to cart</Button>}

      </Card.Body>
    </Card>
  )
}
export default HomeItem
