import { configureStore } from "@reduxjs/toolkit"
import itemsSlice from "../slices/items/itemsSlice"
import sheetsSlice from "../slices/sheets/sheetsSlice"
import usersSlice from "../slices/users/usersSlice"
import cartSlice from "../slices/cart/cartSlice"
import brandsSlice from "../slices/brands/brandsSlice"

// import storage from "redux-persist/lib/storage"
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"

// const persistConfig = {
//   key: "root",
//   storage,
// }
// const persistedReducer = persistReducer(persistConfig, cartSlice)

export default configureStore({
  reducer: {
    itemsSlice: itemsSlice,
    sheetsSlice: sheetsSlice,
    usersSlice: usersSlice,
    cartSlice: cartSlice,
    brandsSlice: brandsSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
})
