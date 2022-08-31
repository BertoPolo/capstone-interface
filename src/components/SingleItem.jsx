import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"

const SingleItem = () => {

  const items = useSelector((state) => state.itemsSlice.items);

  return (
    <>
      <h2>items.name</h2>
      <img src={items.image} alt="" />
      <p>items.fulldescription</p>
      <h3>items.price</h3>

      <div>

        <label htmlFor="amount">Amount</label>
        <input type="number" name="amount" placeholder="" />
        <Button><i className="bi bi-cart-fill"></i>Add to cart</Button>

      </div>

    </>
  )
}
export default SingleItem
