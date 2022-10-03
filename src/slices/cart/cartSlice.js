import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      }
    },
    sumOneToCart: (state, action) => {
      return {
        ...state,
        cart: [...state, action.payload.cart.amount++],
      }
    },
    removeFromCart: (state, action) => {
      return {
        ...state,
        cart: [state.cart.filter((item, i) => i !== action.payload)],
      }
    },
  },
})

export default cartSlice.reducer
export const { addToCart, removeFromCart, sumOneToCart } = cartSlice.actions
