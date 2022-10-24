import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
// import { persistor, store } from "./app/store"
// import { PersistGate } from "redux-persist/integration/react"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={<Loader />} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );

reportWebVitals()
