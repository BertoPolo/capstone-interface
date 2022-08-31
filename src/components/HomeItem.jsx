import { Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


const HomeItem = () => {
  const navigate = useNavigate()

  const items = useSelector((state) => state.itemsSlice.items);


  return (
    <Card style={{ width: "11rem" }} className="item">
      <Card.Img
        style={{ maxHeight: "13rem" }}
        variant="top"
        src={items.image}
        alt={items.title}
        className="pointer"
        onClick={() => navigate("/item")}
      />
      <Card.Body>
        <Card.Title className="pointer" onClick={() => navigate("/item")}>
          {items.title}
        </Card.Title>
        <Card.Text>{items.description}</Card.Text>
        <Card.Title className="d-inline ">{items.price}</Card.Title>
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
  )
}
export default HomeItem
