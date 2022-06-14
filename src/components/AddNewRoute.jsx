import { Button, Form } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import { useState } from "react"
import { useNavigate, } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import { changeMap } from "./slices/general/generalPropertiesSlice"


const AddNewRoute = () => {
  const [wantStop, setWantStop] = useState(false)

  const [optCity, setOptCity] = useState("")
  const [optCountry,setOptCountry] = useState("")
  const [originCity, setOriginCity] = useState("")
  const [originCountry, setOriginCountry] = useState("")
  const [destinationCity, setDestinationCity] = useState("")
  const [destinationCountry, setDestinationCountry] = useState("")

  

  const map=useSelector((state) => state.generalProperties.map)
  const dispatch=useDispatch()
 
  const navigate=useNavigate()
 
  const mapURL = `https://www.google.com/maps/embed/v1/directions?key=${process.env.GOOGLE_KEY}&origin=${originCity}+${originCountry}&destination=${destinationCity}+${destinationCountry}`

  //onSubmit create a POST to save it to DB
  const handleSubmit = (e)=> {
    e.preventDefault()
    dispatch(changeMap(mapURL))
    // navigate("/route")
    console.log(map)
  }



  return (
    <>
     
      <MyNavbar />
      {/* <Container> */}
      <Form className="login-container" onSubmit={handleSubmit}>
        <h4 className="mb-3">Create a new route</h4>

        <Form.Group>
          <Form.Control type="text" placeholder="Origin Country" value={originCountry} onChange={(e)=>setOriginCountry(e.target.value)} />
          <Form.Control type="text" placeholder="Origin City" value={originCity} onChange={(e)=>setOriginCity(e.target.value)} />
        </Form.Group>

        {wantStop && (
          <Form.Group>
            <Form.Control type="text" placeholder="Stop's Country" value={optCountry} onChange={(e)=>setOptCountry(e.target.value)}/>
            <Form.Control type="text" placeholder="Stop's City" value={optCity} onChange={(e)=>setOptCity(e.target.value)} />
          </Form.Group>
        )}

        <Form.Group>
          <Form.Control type="text" placeholder="Destination Country" value={destinationCountry} onChange={(e)=>setDestinationCountry(e.target.value)}/>
          <Form.Control type="text" placeholder="Destination City" value={destinationCity}  onChange={(e)=>setDestinationCity(e.target.value)} />
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

 