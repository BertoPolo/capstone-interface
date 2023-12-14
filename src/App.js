import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/dist/ReactToastify.css"
import React, { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Login from "./components/Login"
const BackOfficeMenu = lazy(() => import("./components/BackOfficeMenu"))
const Home = lazy(() => import("./components/Home"))
const CreateUser = lazy(() => import("./components/CreateUser"))
const NotFound = lazy(() => import("./components/NotFound"))
const MyAccount = lazy(() => import("./components/MyAccount"))
const Payment = lazy(() => import("./components/Payment"))
const ResumingCart = lazy(() => import("./components/ResumingCart"))
const ForgotPassword = lazy(() => import("./components/ForgotPassword"))
// const WhatIUsed = lazy(() => import("./components/WhatIUsed"))

const App = () => (
  <div>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        {/* Toaster */}
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
          <Route path="/" element={<Login />} />
          <Route path="/newUser" element={<CreateUser />} />
          <Route path="/myAccount" element={<MyAccount />} />
          <Route path="/home" element={<Home />}>
            <Route path=":itemTitle" element={<Home />} />
            <Route path="contactUs" element={<Home />} />
            <Route path="outlet" element={<Home />} />
          </Route>
          <Route path="/backOfficeMenu" element={<BackOfficeMenu />}>
            <Route path="backOfficeUsers" element={<BackOfficeMenu />} />
            <Route path="backOfficeItems" element={<BackOfficeMenu />} />
            <Route path="backOfficeNewItem" element={<BackOfficeMenu />} />
          </Route>
          <Route path="/resume" element={<ResumingCart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          {/* <Route path="/whatiused" element={<WhatIUsed />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </div>
)

export default App
