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
    removeFromCart: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((item, i) => i !== action.payload),
      }
    },
  },
})

export default cartSlice.reducer
export const { addToCart, removeFromCart } = cartSlice.actions
