import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Login from "./components/Login"
import Home from "./components/Home"
import CreateUser from "./components/CreateUser"
import NotFound from "./components/NotFound"
import BackOfficeMenu from "./components/BackOfficeMenu"
import ResumingCart from "./components/ResumingCart"
import MyAccount from "./components/MyAccount"
import Payment from "./components/Payment"
import ForgotPassword from "./components/ForgotPassword"

const App = () => (
  <div>
    <BrowserRouter>
      {/* Toast */}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/newUser" element={<CreateUser />} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/home" element={<Home />} />
        <Route path="/backOfficeMenu" element={<BackOfficeMenu />} />
        <Route path="/resume" element={<ResumingCart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  </div>
)

export default App
