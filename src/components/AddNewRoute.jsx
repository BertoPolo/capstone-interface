import { Button, Form } from "react-bootstrap"
import MyNavbar from "./MyNavbar"
import MapComponent from "./MapComponent"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { changeMap } from "./slices/routes/routesSlice"
import {
  changeOriginCity,
  changeOriginCountry,
  changeOptStopCity,
  changeOptStopCountry,
  changeDestinationCity,
  changeDestinationCountry,
  changeWantStop,
} from "./slices/cities/citiesSlice"

const AddNewRoute = () => {
  const wantStop = useSelector((state) => state.citiesSlice.wantStop)

  const optStopCity = useSelector((state) => state.citiesSlice.optStopCity)
  const optStopCountry = useSelector((state) => state.citiesSlice.optStopCountry)
  const originCity = useSelector((state) => state.citiesSlice.originCity)
  const originCountry = useSelector((state) => state.citiesSlice.originCountry)
  const destinationCity = useSelector((state) => state.citiesSlice.destinationCity)
  const destinationCountry = useSelector((state) => state.citiesSlice.destinationCountry)

  const map = useSelector((state) => state.routesSlice.map)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  let mapURL

  //onSubmit create a POST to save it to DB
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(changeMap(mapURL))
    navigate("/route")
    console.log(map)
  }

  return (
    <>
      <MyNavbar />

      <MapComponent />
    </>
  )
}

export default AddNewRoute
