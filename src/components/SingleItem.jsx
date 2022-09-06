import { Button } from "react-bootstrap"

const SingleItem = (item) => {
  // should be called currentItem ??

  return (
    <>
      <h2>{item.name}</h2>
      <img src={item.image} alt={item.title} />
      <p>{item.fulldescription}</p>
      <h3>{item.price}</h3>

      <div>

        <label htmlFor="amount">Amount</label>
        <input type="number" name="amount" placeholder="" />
        <Button><i className="bi bi-cart-fill"></i>Add to cart</Button>

      </div>

    </>
  )
}
export default SingleItem
