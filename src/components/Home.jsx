import { Form } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import {useNavigate} from "react-router-dom"

const Home = () => {

  const navigate=useNavigate()

  return (
    <>
      <MyNavbar />

      <b>carousel with route photos- and below country's name</b>

      {/* <Form inline className="d-flex justify-content-center ">
          <FormControl type="text" placeholder="Which country?" className="mr-sm-2" />
          <Button variant="outline-success" onClick={()=>navigate("/countryList")}>Search</Button>
        </Form> */}

      <Form inline>
        <Form.Group>
          <Form.Label>Choose a country</Form.Label>

          <Form.Control  as="select">
            <option> let this one empty</option>
            <option>dynamic country</option>
            <option>dynamic country</option>         
          </Form.Control>
        </Form.Group>
        </Form>

      
    </>
  )
}
export default Home
