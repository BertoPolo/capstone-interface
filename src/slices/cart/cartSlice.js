import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [{}],
  },
  reducers: {
    addToCart: (state, action) => {
      return {
        ...state,
        cart: action.payload,
      }
    },
  },
})

export default cartSlice.reducer
export const { addToCart } = cartSlice.actions
