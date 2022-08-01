import { configureStore } from "@reduxjs/toolkit"
import itemsSlice from "../components/slices/items/itemsSlice"

export default configureStore({
  reducer: {
    itemsSlice: itemsSlice,
  },
})
