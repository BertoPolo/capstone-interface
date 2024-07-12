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
  const brands = useSelector((state) => state.brandsSlice.brands);

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

  const getCurrentBrandName = (brandID) => {
    const brandObject = brands.find(brand => brand._id === brandID)
    if (brandObject) {
      return brandObject.brands
    }
  }

  return (
    <>
      <Card className="item mb-3" >
        <div className="mx-2">
          <Card.Img
            style={{ height: "9rem", objectFit: "contain", marginTop: "1rem" }}
            variant="top"
            src={currentItem.image}
            alt={currentItem.title}
            className="pointer"
            onClick={() => { dispatch(toggleIsOnSingleItem(true)); dispatch(changeSelectedItem(currentItem)); navigate(`/item/${currentItem.title}`); window.scrollTo(0, 0) }}
          />
          <Card.Body className="p-1">
            <Card.Title className="pointer twoLines homeItemTitle" onClick={() => { dispatch(toggleIsOnSingleItem(true)); dispatch(changeSelectedItem(currentItem)) }} >
              {/* {currentItem.title.charAt(0).toUpperCase() + currentItem.title.slice(1).toLowerCase()} */}{currentItem.title}
            </Card.Title>

            <Card.Text className="text-muted twoLines" >{getCurrentBrandName(currentItem.brand)}</Card.Text>

            <hr />

            {currentItem.isOutlet ?
              <Card.Title> <b>{currentItem.outletPrice} €</b> <br /> <small className="text-red" ><s><b>{currentItem.price}€</b></s></small> </Card.Title>
              :
              <Card.Title className="twoLines"><b>{currentItem.price}€</b> </Card.Title>}

            {!isAdmin && <div className="d-flex justify-content-center"><Button className="px-1 mt-2 addToCartButton" ref={btnRef} onClick={() => dispatch(addToCart(currentItem))}><i className="bi bi-cart-plus"></i></Button></div>}

          </Card.Body>
        </div>
      </Card >
    </>
  )
}
export default HomeItem
