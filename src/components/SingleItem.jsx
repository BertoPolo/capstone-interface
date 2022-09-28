import { Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../slices/cart/cartSlice"
// import { useNavigate } from "react-router-dom"
import { toggleIsOnHome, toggleIsOnOutlet, toggleIsCountactUs, toggleIsOnSingleItem } from "../slices/sheets/sheetsSlice"



const SingleItem = () => {

  const cart = useSelector((state) => state.cartSlice.cart);
  const selectedItem = useSelector((state) => state.itemsSlice.selectedItem);
  const isOnOutlet = useSelector((state) => state.itemsSlice.cart);

  // const navigate = useNavigate()
  const dispatch = useDispatch();


  const changeSingleItemToHome = () => {
    dispatch(toggleIsOnHome(true))
    dispatch(toggleIsOnSingleItem(false))
  }


  return (
    <>
      <h2>{selectedItem.title}</h2>
      <img src={selectedItem.image} alt={selectedItem.title} />
      <p>{selectedItem.fullDescription}</p>
      {isOnOutlet ? <h3>{selectedItem.price}</h3> : <h3>{selectedItem.outletPrice}</h3>}

      <div>

        {/* <label htmlFor="amount">Amount</label> */}
        {/* <input type="number" name="amount" placeholder="1" /> */}
        <Button onClick={() => dispatch(addToCart(selectedItem))} ><i className="bi bi-cart-fill"  ></i>Add to cart</Button>
        <Button variant="danger" onClick={changeSingleItemToHome}>Back</Button>

      </div>

    </>
  )
}
export default SingleItem
