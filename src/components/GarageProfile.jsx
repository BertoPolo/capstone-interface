import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const GarageProfile = () => {
  return (
    <>
      <Form className="login-container">
        <h4 className="mb-3">Registration</h4>

        <Form.Group>{/* <Form.Control type="text" placeholder="Username" onChange={(e) => setNameInput(e.target.value)} /> */}</Form.Group>

        <Form.Group>
          {/* <Form.Control type="text" placeholder="Bike's brand and model" onChange={(e) => setBikeInput(e.target.value)} /> */}
        </Form.Group>

        <Form.Group>{/* <Form.Control type="file" placeholder="Profile Image" onChange={(e) => setBikeInput(e.target.value)} /> */}</Form.Group>

        <Form.Group>{/* <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordInput(e.target.value)} /> */}</Form.Group>

        <Form.Group>
          <Form.Label htmlFor="">Which type of do you want to be?</Form.Label>
          {/* <Form.Check type="radio" name="user" label="Normal user" className="login-small-font" onClick={()=>setUserTypeInput("user")}/> */}
          {/* <Form.Check type="radio" name="user" label="Garage" className="login-small-font" onClick={()=>setUserTypeInput("garage")}/> */}
        </Form.Group>

        <Button variant="success" type="submit">
          Register
        </Button>

        <Link className="ml-2" to="/">
          <Button variant="danger" type="submit">
            Go Back
          </Button>
        </Link>
      </Form>
    </>
  )
}

export default GarageProfile
