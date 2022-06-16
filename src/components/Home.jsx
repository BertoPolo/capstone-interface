import { Button,Form, FormControl } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import {useNavigate} from "react-router-dom"

const Home = () => {

  const navigate=useNavigate()

  return (
    <>
      <MyNavbar />

      <b>carousel with route photos- and below country's name</b>

      <Form inline className="d-flex justify-content-center ">
          <FormControl type="text" placeholder="Which country?" className="mr-sm-2" />
          <Button variant="outline-success" onClick={()=>navigate("/countryList")}>Search</Button>
        </Form>

      
    </>
  )
}
export default Home
