import { Button, Form } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import { useNavigate, } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import { changeMap } from "./slices/routes/routesSlice"
import { changeOriginCity,changeOriginCountry,changeOptStopCity,changeOptStopCountry,changeDestinationCity,changeDestinationCountry,changeWantStop } from "./slices/cities/citiesSlice"


const AddNewRoute = () => {
  const wantStop = useSelector((state)=>state.citiesSlice.wantStop)
  const optStopCity = useSelector((state)=>state.citiesSlice.optStopCity)
  const optStopCountry = useSelector((state)=>state.citiesSlice.optStopCountry)
  const originCity = useSelector((state)=>state.citiesSlice.originCity)
  const originCountry = useSelector((state)=>state.citiesSlice.originCountry)
  const destinationCity = useSelector((state)=>state.citiesSlice.destinationCity)
  const destinationCountry = useSelector((state)=>state.citiesSlice.destinationCountry)

  const map=useSelector((state) => state.routesSlice.map)
  const dispatch=useDispatch()
 
  const navigate=useNavigate()

 let mapURL

  wantStop ? 
   mapURL = `https://www.google.com/maps/embed/v1/directions?key=${process.env.React_APP_GOOGLE_KEY}&origin=${originCity}+${originCountry}&waypoints=${optStopCity}+${optStopCountry}&destination=${destinationCity}+${destinationCountry}` 
  :
   mapURL = `https://www.google.com/maps/embed/v1/directions?key=${process.env.React_APP_GOOGLE_KEY}&origin=${originCity}+${originCountry}&destination=${destinationCity}+${destinationCountry}`
//search a way to combine option, SWITCH i think its not so good, cause are individual cases,cant be combined
//&avoid=tolls|highways|ferries


  //onSubmit create a POST to save it to DB
  const handleSubmit = (e)=> {
    e.preventDefault()
    dispatch(changeMap(mapURL))
    navigate("/route")
    console.log(map)
  }



  return (
    <>
     
      <MyNavbar />
      {/* <Container> */}
      <Form className="login-container" onSubmit={handleSubmit}>
        <h4 className="mb-3">Create a new route</h4>

        <Form.Group>
          <Form.Control type="text" placeholder="Origin Country" required value={originCountry} onChange={(e)=>dispatch(changeOriginCountry(e.target.value))} />
          <Form.Control type="text" placeholder="Origin City"required  value={originCity} onChange={(e)=>dispatch(changeOriginCity(e.target.value))} />
        </Form.Group>

        {wantStop && (
          <Form.Group>
            <Form.Control type="text" placeholder="Stop's Country"required  value={optStopCountry} onChange={(e)=>dispatch(changeOptStopCountry(e.target.value))}/>
            <Form.Control type="text" placeholder="Stop's City" required value={optStopCity} onChange={(e)=>dispatch(changeOptStopCity(e.target.value))} />
          </Form.Group>
        )}

        <Form.Group>
          <Form.Control type="text" placeholder="Destination Country"required  value={destinationCountry} onChange={(e)=>dispatch(changeDestinationCountry(e.target.value))}/>
          <Form.Control type="text" placeholder="Destination City" required value={destinationCity}  onChange={(e)=>dispatch(changeDestinationCity(e.target.value))} />
        </Form.Group>

        {wantStop ?
        <Button className="mb-2" disabled >Add stop</Button>
        :
        <Button className="mb-2" onClick={()=>dispatch(changeWantStop(true))}>Add stop</Button>
        }

        {wantStop ?
        <Button onClick={()=>dispatch(changeWantStop(false))} className="mb-2">Remove last stop</Button>
        :
        <Button disabled className="mb-2">Remove stop</Button>
        }

        <div>
          <Button variant="success" type="submit" >
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

 