import { configureStore } from "@reduxjs/toolkit"
import citiesSlice from "../components/slices/cities/citiesSlice"

export default configureStore({
  reducer: {
    citiesSlice: citiesSlice,
  },
})
