import { Card, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addToCart } from "../slices/cart/cartSlice"
import { changeSelectedItem } from "../slices/items/itemsSlice"
import { toggleIsOnHome, toggleIsOnOutlet, toggleIsCountactUs, toggleIsOnSingleItem, toggleIsOnCategory } from "../slices/sheets/sheetsSlice"




const HomeItem = ({ currentItem }) => {

  const cart = useSelector((state) => state.cartSlice.cart);
  const selectedItem = useSelector((state) => state.itemsSlice.selectedItem);
  const { isOnHome, isOnOutlet, isOnCountactUs, isOnSingleItem } = useSelector(state => state.sheetsSlice)
  const isAdmin = useSelector((state) => state.usersSlice.isAdmin);


  const dispatch = useDispatch();

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


  const checkIfIsAlreadyInCart = () => {

    if (cart.some((element) => element._id === currentItem._id)) {
      notifyAlready()

    } else {
      dispatch(addToCart(currentItem))
    }
  }


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

          {/* <div className="d-flex justify-content-between"> */}
          {isOnOutlet ? <Card.Title className="d-inline "> <b>{currentItem.outletPrice} €</b> <s>{currentItem.price}€</s> </Card.Title> : <Card.Title className="d-inline ">{currentItem.price}€ </Card.Title>}

          {!isAdmin && <Button className="px-1 mt-2 d-block" variant="primary" onClick={() => checkIfIsAlreadyInCart()}>Add to cart</Button>}

          {/* </div> */}
        </Card.Body>
      </Card >
    </>
  )
}
export default HomeItem
