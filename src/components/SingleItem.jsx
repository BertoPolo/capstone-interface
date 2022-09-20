import { Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../slices/cart/cartSlice"

const SingleItem = ({ currentItem }) => {

  const cart = useSelector((state) => state.cartSlice.cart);
  const dispatch = useDispatch();
  // console.log(currentItem)
  return (
    <>
      <h2>{currentItem.title}</h2>
      <img src={currentItem.image} alt={currentItem.title} />
      <p>{currentItem.fulldescription}</p>
      <h3>{currentItem.price}</h3>

      <div>

        <label htmlFor="amount">Amount</label>
        <input type="number" name="amount" placeholder="" />
        <Button><i className="bi bi-cart-fill" onClick={() => dispatch(addToCart(currentItem))} ></i>Add to cart</Button>

      </div>

    </>
  )
}
export default SingleItem
