import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import TheRoute from "./components/TheRoute"
import Home from "./components/Home"
import CreateUser from "./components/CreateUser"
import NotFound from "./components/NotFound"
// import ForgotPassword from "./components/ForgotPassword"

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Login />} />
          <Route path="/newUser" element={<CreateUser />} />
          {/* <Route path="/forgotPassword" element={<ForgotPassword />} /> */}
          <Route path="/Home" element={<Home />} />
          <Route path="/route" element={<TheRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
// on route =>  need path and element .... for 404  put path "*"

export default App
