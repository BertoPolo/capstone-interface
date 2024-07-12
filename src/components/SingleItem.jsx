import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"

import { addToCart } from "../slices/cart/cartSlice"
import { toggleIsOnHome, toggleIsOnSingleItem } from "../slices/pages/pagesSlice"
import { changeSelectedItem } from "../slices/items/itemsSlice"





const SingleItem = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { itemTitle: paramsItemTitle } = useParams();//

  const brands = useSelector((state) => state.brandsSlice.brands);
  const cart = useSelector((state) => state.cartSlice.cart);
  const { selectedItem, items } = useSelector((state) => state.itemsSlice);
  const isOnSingleItem = useSelector(state => state.pagesSlice.isOnSingleItem)

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const getCurrentBrandName = (brandID) => {
    const brandObject = brands.find(brand => brand._id === brandID)
    if (brandObject) {
      return brandObject.brands
    }
  }

  const fetchItemByTitle = async (title) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}items/title/${title}`);
      if (response.ok) {
        const data = await response.json();
        dispatch(changeSelectedItem(data)); // Dispatch the fetched item as selectedItem
      } else {
        // toast.warn('Item not found', {
        //   position: "top-center",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "dark",
        // });
        console.log("Item not found");
      }
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  useEffect(() => {
    // all PARAMS related cases
    const itemInStore = items.find(item => item.title === paramsItemTitle);
    if (selectedItem && selectedItem.title === paramsItemTitle) {
      // este caso, si no es util, puedes borrarlo
      // Caso 4: El item es seleccionado desde home y selectedItem tiene objeto (no hay que hacer nada)
      return;

    } else if (itemInStore) {
      // Caso 1: El item existe en items e igualmente se busca desde params

      dispatch(changeSelectedItem(itemInStore));
      dispatch(toggleIsOnSingleItem(true));
    } else if (!selectedItem || selectedItem.title !== paramsItemTitle) {
      // Caso 2 y 3: El item no existe en items y se busca desde params. Hay un selectedItem pero introducen un nuevo item en el params.
      dispatch(toggleIsOnSingleItem(true));
      fetchItemByTitle(paramsItemTitle);
    }
  }, [paramsItemTitle, selectedItem, items, dispatch]);

  useEffect(() => {
    const isItemInCart = cart.some((element) => element._id === selectedItem?._id);
    setIsButtonDisabled(isItemInCart);
  }, [cart, selectedItem]);


  return (
    <>
      <Container className="pt-4">
        <Row>
          <Col >
            <img src={selectedItem?.image} alt={selectedItem?.title} style={{ height: "35vh", objectFit: "contain" }} />
          </Col>

          <Col>
            <p className="text-muted">{getCurrentBrandName(selectedItem?.brand)}</p>

            <h2><b>{selectedItem?.title}</b></h2>

            {selectedItem?.isOutlet ? <div className="d-flex">
              <h2 className="m-0">{selectedItem?.outletPrice}€</h2>
              <h4 className="text-red mt-auto mb-auto ml-4"><s>{selectedItem?.price}€</s></h4>
            </div>
              : <h3>{selectedItem?.price}€</h3>}

            <hr />

            <p>{selectedItem?.fullDescription}</p>


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
