import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import CreateUser from "./components/CreateUser"
import NotFound from "./components/NotFound"
// import Outlet from "./components/Outlet"
// import SingleItem from "./components/SingleItem"
import ContactUs from "./components/ContactUs"

//using Redux just for demo purposes
import { Provider } from "react-redux"
import configureStore from "./app/store"

import MyAccount from "./components/MyAccount"

function App() {
  return (
    <div>
      <Provider store={configureStore}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Login />} />
            <Route path="/newUser" element={<CreateUser />} />
            <Route path="/myAccount" element={<MyAccount />} />
            <Route path="/home" element={<Home />} />
            <Route path="/outlet" element={<Home />} />
            <Route path="/item" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
