import { Container } from "react-bootstrap"
import MyNavbar from "./MyNavbar"

const NotFound = () => {
  return (
    <>
      <MyNavbar />
      <Container className="">
        <h1 className="d-flex justify-content-center align-content-center">404 NOT FOUND</h1>
        <img src="" alt="" />
      </Container>
    </>
  )
}

export default NotFound
