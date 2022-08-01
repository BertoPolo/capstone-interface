import { configureStore } from "@reduxjs/toolkit"
import itemsSlice from "../slices/items/itemsSlice"

export default configureStore({
  reducer: {
    itemsSlice: itemsSlice,
  },
})
