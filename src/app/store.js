import { configureStore } from "@reduxjs/toolkit"
import itemsSlice from "../slices/items/itemsSlice"
import sheetsSlice from "../slices/sheets/sheetsSlice"
import usersSlice from "../slices/users/usersSlice"
import cartSlice from "../slices/cart/cartSlice"

export default configureStore({
  reducer: {
    itemsSlice: itemsSlice,
    sheetsSlice: sheetsSlice,
    usersSlice: usersSlice,
    cartSlice: cartSlice,
  },
})
