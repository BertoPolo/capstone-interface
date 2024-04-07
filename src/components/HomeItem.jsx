import { useRef, useEffect } from "react";
import { Card, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cart/cartSlice"
import { changeSelectedItem } from "../slices/items/itemsSlice"
import { toggleIsOnSingleItem } from "../slices/pages/pagesSlice"


const HomeItem = ({ currentItem }) => {

  const cart = useSelector((state) => state.cartSlice.cart);
  const selectedItem = useSelector((state) => state.itemsSlice.selectedItem);
  const { isOnHome, isOnOutlet, isOnCountactUs, isOnSingleItem } = useSelector(state => state.pagesSlice)
  const isAdmin = useSelector((state) => state.usersSlice.isAdmin);

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const btnRef = useRef()


  const ableBtn = e => {
    if (btnRef.current) {
      btnRef.current.removeAttribute("disabled");
    }
  }


  useEffect(() => {
    if (cart.some((element) => element._id === currentItem._id)) btnRef.current.setAttribute("disabled", "disabled")
    else ableBtn()
  }, [cart])

  return (
    <>

      <Card className="item mt-3 grayOnHover" >
        <Card.Img
          style={{ height: "9rem", objectFit: "contain" }}
          variant="top"
          src={currentItem.image}
          alt={currentItem.title}
          className="pointer"
          onClick={() => { dispatch(toggleIsOnSingleItem(true)); dispatch(changeSelectedItem(currentItem)); navigate(`/home/${currentItem.title}`) }}
        />
        <Card.Body style={{ padding: "15px" }}>
          <Card.Title className="pointer twoLines" onClick={() => { dispatch(toggleIsOnSingleItem(true)); dispatch(changeSelectedItem(currentItem)) }} >
            {currentItem.title}
          </Card.Title>
          {/* <Card.Text className="line-clamp">{currentItem.description}</Card.Text> */}

          {currentItem.isOutlet ? <Card.Title className="twoLines "> <b>{currentItem.outletPrice} €</b> <br /> <small className="text-red" ><s>{currentItem.price}€</s></small> </Card.Title> : <Card.Title className="twoLines">{currentItem.price}€ </Card.Title>}

          {!isAdmin && <div className="d-flex justify-content-center"><Button className="px-1 mt-2 addToCartButton" ref={btnRef} onClick={() => dispatch(addToCart(currentItem))}><i className="bi bi-cart-plus"></i></Button></div>}

        </Card.Body>
      </Card >
    </>
  )
}
export default HomeItem
