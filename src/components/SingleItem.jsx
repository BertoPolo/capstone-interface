import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"

const SingleItem = () => {

  const items = useSelector((state) => state.itemsSlice.items);

  return (
    <>
      <Container>
        <h1>Article Name</h1>
        <img src="https://rinconbiker.com/tienda/13171-large_default/gorra-gasoline-riders-de-king-kerosin.jpg" alt="" />
      </Container>
    </>
  )
}
export default SingleItem
