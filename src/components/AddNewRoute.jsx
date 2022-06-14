//ask for cities on the route to show wheather
//ask A point "+" Country
//ask B point "+" Country

import { Button, Form } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

/* FECT HERE : 

wantStop ? https://www.google.com/maps/embed/v1/directions?key=${process.env.GOOGLE_KEY}&origin=${originCity}+{originCountry}&waypoints=${optCity}+${optCountry}&destination=${destinationCity}+${destinationCountry} : "https://www.google.com/maps/embed/v1/directions?key=${process.env.GOOGLE_KEY}&origin=${originCity}+{originCountry}&destination=${destinationCity}+${destinationCountry}"

 */
const AddNewRoute = () => {
  const [wantStop, setWantStop] = useState(false)

  const [optCity, setOptCity] = useState("")
  const [optCountry,setOptCountry] = useState("")
  const [originCity, setOriginCity] = useState("")
  const [originCountry, setOriginCountry] = useState("")
  const [destinationCity, setDestinationCity] = useState("")
  const [destinationCountry, setDestinationCountry] = useState("")
 
  const navigate=useNavigate()
 
   const map = `https://www.google.com/maps/embed/v1/directions?key=${process.env.GOOGLE_KEY}&origin=${originCity}+${originCountry}&destination=${destinationCity}+${destinationCountry}`
    

  //onSubmit create a POST to save it to DB


  // value={originCountry} 
  // value={originCity}
  // value={optCountry}
  // value={optCity}
  // value={destinationCountry} 
  // value={destinationCity}

  return (
    <>
     
      <MyNavbar />
      {/* <Container> */}
      <Form className="login-container" onSubmit={navigate("/route")}>
        <h4 className="mb-3">Create a new route</h4>

        <Form.Group>
          <Form.Control type="text" placeholder="Origin Country" onChange={setOriginCountry} />
          <Form.Control type="text" placeholder="Origin City"  onChange={setOriginCity} />
        </Form.Group>

        {wantStop && (
          <Form.Group>
            <Form.Control type="text" placeholder="Stop's Country"  onChange={setOptCountry}/>
            <Form.Control type="text" placeholder="Stop's City"  onChange={setOptCity} />
          </Form.Group>
        )}

        <Form.Group>
          <Form.Control type="text" placeholder="Destination Country"  onChange={setDestinationCountry}/>
          <Form.Control type="text" placeholder="Destination City"   onChange={setDestinationCity} />
        </Form.Group>

        {wantStop ?
        <Button className="" disabled >Add stop</Button>
        :
        <Button className="" onClick={()=>setWantStop(true)}>Add stop</Button>
        }

        {wantStop ?
        <Button onClick={()=>setWantStop(false)}>Remove last stop</Button>
        :
        <Button disabled>Remove last stop</Button>
        }

        <div>
          <Button variant="success" type="submit">
            Submit
          </Button>
          <Button variant="danger"  onClick={()=>navigate("/home")}>Cancel</Button>
        </div>

      </Form>
      {/* </Container> */}

     
 


    </>
  )
}

export default AddNewRoute
