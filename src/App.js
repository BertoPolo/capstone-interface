import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import TheRoute from "./components/TheRoute"
import Home from "./components/Home"
import CreateUser from "./components/CreateUser"
import NotFound from "./components/NotFound"
import AddNewRoute from "./components/AddNewRoute"
import CountryList from "./components/CountryList"

// import Profile from "./components/Profile"
// import ForgotPassword from "./components/ForgotPassword"
// import { Provider } from "react-redux"

function App() {
  return (
    <div className="">
      {/* <Provider store={configureStore}> */}
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Login />} />
          <Route path="/newUser" element={<CreateUser />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/forgotPassword" element={<ForgotPassword />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/countryList" element={<CountryList />} />
          <Route path="/route" element={<TheRoute />} />
          <Route path="/addRoute" element={<AddNewRoute />} />
        </Routes>
      </BrowserRouter>
      {/* </Provider> */}
    </div>
  )
}
// on route =>  need path and element .... for 404  put path "*"

export default App
