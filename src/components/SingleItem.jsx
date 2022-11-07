import { Button, Container, Row, Col } from "react-bootstrap"
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
      <Container>
        <Row>
          <Col >
            <img src={selectedItem.image} alt={selectedItem.title} />
            {/* style={{ objectFit: "cover", overflow: "hidden" }} */}
          </Col>
          <Col>

            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.fullDescription}</p>
            {isOnOutlet ? <h3>{selectedItem.outletPrice}€</h3> : <h3>{selectedItem.price}€</h3>}

            <Button onClick={() => dispatch(addToCart(selectedItem))} ><i className="bi bi-cart-fill"  ></i>Add to cart</Button>
            <Button variant="danger" onClick={changeSingleItemToHome}>Back home</Button>

          </Col>
        </Row>
      </Container>

    </>
  )
}
export default SingleItem
