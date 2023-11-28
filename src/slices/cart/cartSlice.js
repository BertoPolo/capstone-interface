import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push({ ...action.payload, quantity: 1 })
    },

    setItemsQuantity: (state, action) => {
      const itemInCart = state.cart.find((item) => item._id === action.payload[0])
      if (itemInCart) {
        itemInCart.quantity = action.payload[1]
      }
    },

    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item._id !== action.payload)
      state.cart = removeItem
    },

    resetCart: (state, action) => {
      state.cart = []
    },

    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload
    },
  },
})

export default cartSlice.reducer
export const { addToCart, removeItem, setItemsQuantity, resetCart, setTotalAmount } = cartSlice.actions
