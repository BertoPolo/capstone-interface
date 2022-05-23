import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
// on route =>  need path and element .... for 404  put path "*"

export default App
