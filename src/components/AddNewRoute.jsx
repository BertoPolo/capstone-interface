//ask for cities on the route to show wheather
//ask A point "+" Country
//ask B point "+" Country

import { Container, Button, Form } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import { useState } from "react"

/* FECT HERE : 
https://www.google.com/maps/embed/v1/directions
  ?key=YOUR_API_KEY
  &origin=Oslo+Norway
  &destination=Telemark+Norway
  &waypoints=London+England    =>verify
  &avoid=tolls|highways

 */
const AddNewRoute = () => {
  const [wantStop, setWantStop] = useState(false)
  return (
    <>
      <MyNavbar />
      {/* <Container> */}
      <Form className="login-container">
        <h4 className="mb-3">Create a new route</h4>

        <Form.Group>
          <Form.Control type="text" placeholder="Origin Country" />
          <Form.Control type="text" placeholder="Origin City" />
        </Form.Group>

        {wantStop && (
          <Form.Group>
            <Form.Control type="text" placeholder="Stop's Country" />
            <Form.Control type="text" placeholder="Stop's City" />
          </Form.Group>
        )}

        <Form.Group>
          <Form.Control type="text" placeholder="Destination Country" />
          <Form.Control type="text" placeholder="Destination City" />
        </Form.Group>

        <Button className="">Add stop</Button>
        <Button>Remove last stop</Button>

        <div>
          <Button variant="success" type="submit">
            Submit
          </Button>
          <Button variant="danger">Cancel</Button>
        </div>
      </Form>
      {/* </Container> */}
    </>
  )
}

export default AddNewRoute
