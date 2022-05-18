import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
// import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"

function App() {
  return (
    <div className="">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/login" component={Login} />
        </Routes>
      </BrowserRouter> */}
      <Login />
    </div>
  )
}
// on route =>  need path and element .... for 404  put path "*"

export default App
