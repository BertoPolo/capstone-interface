import { configureStore } from "@reduxjs/toolkit"
import itemsSlice from "../slices/items/itemsSlice"
import sheetsSlice from "../slices/sheets/sheetsSlice"

export default configureStore({
  reducer: {
    itemsSlice: itemsSlice,
    sheetsSlice: sheetsSlice,
  },
})
