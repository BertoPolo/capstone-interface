import { Card, Button } from "react-bootstrap"

const HomeItem = () => {
  return (
    <Card style={{ width: "11rem" }} className="item">
      <Card.Img
        style={{ maxHeight: "13rem" }}
        variant="top"
        src="https://rinconbiker.com/tienda/13171-large_default/gorra-gasoline-riders-de-king-kerosin.jpg"
      />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>some short description</Card.Text>
        <Card.Title className="d-inline ">27.99$</Card.Title>
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
  )
}
export default HomeItem
