import { Container, ListGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import MyNavbar from "./MyNavbar"

const CountryList = () => {
  const navigate = useNavigate()

  return (
    <>
      <MyNavbar />
      <Container>
        <b>country name</b>
        <ListGroup>
          <ListGroup.Item className="pointer" onClick={() => navigate("/route")}>
            route name 65
          </ListGroup.Item>
          <ListGroup.Item className="pointer" onClick={() => navigate("/route")}>
            route name 1
          </ListGroup.Item>
          <ListGroup.Item className="pointer" onClick={() => navigate("/route")}>
            route name 3{" "}
          </ListGroup.Item>
          <ListGroup.Item className="pointer" onClick={() => navigate("/route")}>
            route name 2
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </>
  )
}

export default CountryList
