import { useEffect, useState } from "react"
import { useNavigate, } from "react-router-dom"
import { Button, Container, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../slices/cart/cartSlice"
import { toggleIsOnHome } from "../slices/pages/pagesSlice"


const SingleItem = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const brands = useSelector((state) => state.brandsSlice.brands);
  const cart = useSelector((state) => state.cartSlice.cart);
  const { selectedItem } = useSelector((state) => state.itemsSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const getCurrentBrandName = (brandID) => {
    const brandObject = brands.find(brand => brand._id === brandID)
    if (brandObject) {
      return brandObject.brands
    }
  }

  useEffect(() => {
    const isItemInCart = cart.some((element) => element._id === selectedItem._id);
    setIsButtonDisabled(isItemInCart);
  }, [cart, selectedItem._id])

  return (
    <>
      <Container className="pt-4">
        <Row>
          <Col >
            <img src={selectedItem.image} alt={selectedItem.title} style={{ height: "35vh", objectFit: "contain" }} />
          </Col>

          <Col>
            <p className="text-muted">{getCurrentBrandName(selectedItem.brand)}</p>

            <h2><b>{selectedItem.title}</b></h2>

            {selectedItem.isOutlet ? <div className="d-flex">
              <h2 className="m-0">{selectedItem.outletPrice}€</h2>
              <h4 className="text-red mt-auto mb-auto ml-4"><s>{selectedItem.price}€</s></h4>
            </div>
              : <h3>{selectedItem.price}€</h3>}

            <hr />

            <p>{selectedItem.fullDescription}</p>


            <div className="d-flex justify-content-between mt-3">
              <Button className="addToCartButton w-25 " disabled={isButtonDisabled} onClick={() => dispatch(addToCart(selectedItem))}><i className="bi bi-cart-plus"></i></Button>
              <Button className="w-25 buttonBack" onClick={() => { dispatch(toggleIsOnHome(true)); navigate("/home") }}><i className="bi bi-box-arrow-in-left"></i></Button>
            </div>
          </Col>
        </Row>
      </Container>

    </>
  )
}
export default SingleItem
