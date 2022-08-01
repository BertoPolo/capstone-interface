import { Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const HomeItem = () => {
  const navigate = useNavigate()

  return (
    <Card style={{ width: "11rem" }} className="item">
      <Card.Img
        style={{ maxHeight: "13rem" }}
        variant="top"
        src="https://rinconbiker.com/tienda/13171-large_default/gorra-gasoline-riders-de-king-kerosin.jpg"
        className="pointer"
        onClick={() => navigate("/item")}
      />
      <Card.Body>
        {/* this have to be a dynamic route */}
        <Card.Title className="pointer" onClick={() => navigate("/item")}>
          Article Title
        </Card.Title>
        <Card.Text>Some short description</Card.Text>
        <Card.Title className="d-inline ">27.99$</Card.Title>
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
  )
}
export default HomeItem
