import { Button,Form, FormControl } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import {useNavigate} from "react-router-dom"

const Home = () => {

  const navigate=useNavigate()

  return (
    <>
      <MyNavbar />

      <p>brief into to website?</p>

      <Form inline>
          <FormControl type="text" placeholder="Which country?" className="mr-sm-2" />
          <Button variant="outline-success" onClick={()=>navigate("/countryList")}>Search</Button>
        </Form>

      
    </>
  )
}
export default Home
