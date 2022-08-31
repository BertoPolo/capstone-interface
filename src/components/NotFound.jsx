import { Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import MyNavbar from "./MyNavbar"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <MyNavbar />
      <Container className="">
        <h1 className="d-flex justify-content-center align-content-center">404 NOT FOUND</h1>
        <img src="" alt="" />
        <Button variant="primary" onClick={() => navigate("/home")}> Return home</Button>
      </Container>
    </>
  )
}

export default NotFound
