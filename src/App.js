import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import CreateUser from "./components/CreateUser"
import NotFound from "./components/NotFound"
import BackOfficeMenu from "./components/BackOfficeMenu"
import ResumingCart from "./components/ResumingCart"
import MyAccount from "./components/MyAccount"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Login />} />
          <Route path="/newUser" element={<CreateUser />} />
          <Route path="/myAccount" element={<MyAccount />} />
          <Route path="/home" element={<Home />} />
          <Route path="/backOfficeMenu" element={<BackOfficeMenu />} />
          <Route path="/resume" element={<ResumingCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
