import { configureStore, combineReducers } from "@reduxjs/toolkit"
import itemsSlice from "../slices/items/itemsSlice"
import pagesSlice from "../slices/pages/pagesSlice"
import usersSlice from "../slices/users/usersSlice"
import cartSlice from "../slices/cart/cartSlice"
import brandsSlice from "../slices/brands/brandsSlice"
import categoriesSlice from "../slices/categories/categoriesSlice"
import mainCategoriesSlice from "../slices/mainCategories/mainCategoriesSlice"
import storage from "redux-persist/lib/storage"
import { encryptTransform } from "redux-persist-transform-encrypt"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"

const reducers = combineReducers({
  itemsSlice: itemsSlice,
  pagesSlice: pagesSlice,
  usersSlice: usersSlice,
  cartSlice: cartSlice,
  brandsSlice: brandsSlice,
  categoriesSlice: categoriesSlice,
  mainCategoriesSlice: mainCategoriesSlice,
})

const persistConfig = {
  key: "root",
  storage: storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_KEY,
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
