import { Card, Button } from "react-bootstrap"

const Item = () => {
  return (
    <Card style={{ width: "13rem" }}>
      <Card.Img
        style={{ maxHeight: "13rem" }}
        variant="top"
        src="https://rinconbiker.com/tienda/13171-large_default/gorra-gasoline-riders-de-king-kerosin.jpg"
      />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
        <Card.Title className="d-inline ">27.99$</Card.Title>
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
  )
}
export default Item
