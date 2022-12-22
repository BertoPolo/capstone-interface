import { Button, Container, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../slices/cart/cartSlice"
import { toggleIsOnHome } from "../slices/pages/pagesSlice"



const SingleItem = () => {

  const cart = useSelector((state) => state.cartSlice.cart);
  const { selectedItem, isOnOutlet, items } = useSelector((state) => state.itemsSlice);
  const dispatch = useDispatch();



  return (
    <>
      <Container>
        <Row>
          <Col >
            <img src={selectedItem.image} alt={selectedItem.title} style={{ height: "35vh", objectFit: "contain" }} />
          </Col>
          <Col>

            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.fullDescription}</p>
            {isOnOutlet ? <h3>{selectedItem.outletPrice}€</h3> : <h3>{selectedItem.price}€</h3>}

            <Button onClick={() => dispatch(addToCart(selectedItem))} ><i className="bi bi-cart-fill"></i>Add to cart</Button>
            <Button variant="danger" onClick={() => dispatch(toggleIsOnHome(true))}>Back home</Button>

          </Col>
        </Row>
      </Container>

    </>
  )
}
export default SingleItem
