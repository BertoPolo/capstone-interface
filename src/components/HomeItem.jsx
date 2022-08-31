import { Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const HomeItem = (currentItem) => {
  const navigate = useNavigate()

  console.log(currentItem)

  return (
    <Card style={{ width: "11rem" }} className="item">
      <Card.Img
        style={{ maxHeight: "13rem" }}
        variant="top"
        src={currentItem.image}
        alt={currentItem.title}
        className="pointer"
        onClick={() => navigate("/item")}
      />
      <Card.Body>
        <Card.Title className="pointer" onClick={() => navigate("/:currentItem._id")}>
          {currentItem.title}
        </Card.Title>
        <Card.Text>{currentItem.description}</Card.Text>
        <Card.Title className="d-inline ">{currentItem.price}</Card.Title>
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
  )
}
export default HomeItem
