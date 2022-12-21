import { useRef, useEffect } from "react";
import { Card, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addToCart } from "../slices/cart/cartSlice"
import { changeSelectedItem } from "../slices/items/itemsSlice"
import { toggleIsOnSingleItem } from "../slices/pages/pagesSlice"


const HomeItem = ({ currentItem }) => {

  const cart = useSelector((state) => state.cartSlice.cart);
  const selectedItem = useSelector((state) => state.itemsSlice.selectedItem);
  const { isOnHome, isOnOutlet, isOnCountactUs, isOnSingleItem } = useSelector(state => state.pagesSlice)
  const isAdmin = useSelector((state) => state.usersSlice.isAdmin);


  const dispatch = useDispatch();
  const btnRef = useRef()

  const notifyAlready = () => toast.warn(`Item already in cart :)`, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const ableBtn = e => {
    if (btnRef.current) {
      btnRef.current.removeAttribute("disabled");
    }
  }

  const checkIfIsAlreadyInCart = () => {
    if (cart.some((element) => element._id === currentItem._id)) {
      notifyAlready()

    } else {
      dispatch(addToCart(currentItem))
    }
  }
  useEffect(() => {
    if (cart.some((element) => element._id === currentItem._id)) btnRef.current.setAttribute("disabled", "disabled")
    else ableBtn()
  }, [cart])

  return (

    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Card className="item mt-3" >
        <Card.Img
          style={{ height: "11rem", objectFit: "contain" }}
          variant="top"
          src={currentItem.image}
          alt={currentItem.title}
          className="pointer"
          onClick={() => { dispatch(toggleIsOnSingleItem(true)); dispatch(changeSelectedItem(currentItem)) }}
        />
        <Card.Body>
          <Card.Title className="pointer twoLines" onClick={() => { dispatch(toggleIsOnSingleItem(true)); dispatch(changeSelectedItem(currentItem)) }} >
            {currentItem.title}
          </Card.Title>
          <Card.Text className="line-clamp">{currentItem.description}</Card.Text>

          {currentItem.isOutlet ? <Card.Title className="twoLines "> <b>{currentItem.outletPrice} €</b> <br /> <small><s>{currentItem.price}€</s></small> </Card.Title> : <Card.Title className="twoLines">{currentItem.price}€ </Card.Title>}

          {!isAdmin && <Button className="px-1 mt-2 d-block" variant="primary" ref={btnRef} onClick={() => checkIfIsAlreadyInCart()}>Add to cart</Button>}

        </Card.Body>
      </Card >
    </>
  )
}
export default HomeItem
