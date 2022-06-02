//ask for cities on the route to show wheather
//ask A point "+" Country
//ask B point "+" Country

import { Container, Button, Form } from "react-bootstrap"
import MyNavbar from "./MyNavbar"

const AddNewRoute = () => {
  return (
    <>
      <MyNavbar />
      <Container>
        <Form className="login-container">
          <h4 className="mb-3">Create a new route</h4>

          <Form.Group>
            <Form.Control type="text" placeholder="Name" />
          </Form.Group>

          <Form.Group>
            <Form.Control type="text" placeholder="Bike's brand and model" />
          </Form.Group>

          <Form.Group>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>

          <Form.Group>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <div>
            <Button variant="success" type="submit">
              Submit
            </Button>
            <Button variant="danger">Cancel</Button>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default AddNewRoute
