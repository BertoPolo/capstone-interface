import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    //   addToCart: (state, action) => {
    //     const itemInCart = state.cart.find((item) => item._id === action.payload.id)
    //     if (itemInCart) {
    //       itemInCart.quantity++
    //     } else {
    //       state.cart.push({ ...action.payload, quantity: 1 })
    //     }
    //   },
    //   incrementQuantity: (state, action) => {
    //     const item = state.cart.find((item) => item._id === action.payload)
    //     item.quantity++
    //   },
    //   decrementQuantity: (state, action) => {
    //     const item = state.cart.find((item) => item._id === action.payload)
    //     if (item.quantity === 1) {
    //       item.quantity = 1
    //     } else {
    //       item.quantity--
    //     }
    //   },
    //   removeItem: (state, action) => {
    //     const removeItem = state.cart.filter((item) => item._id !== action.payload)
    //     state.cart = removeItem
    //   },
    // },
    addToCart: (state, action) => {
      return {
        ...state,
        content: [...state.content, action.payload],
      }
    },
    removeFromCart: (state, action) => {
      // from here I'm supposed to return the new value of this slice
      return {
        // 'state' is the current state I'm in! let's spread its content, so my new state will start exactly like the old one
        ...state,
        content: state.content.filter((book, i) => i !== action.payload),
      }
    },
  },
})

export default cartSlice.reducer
export const { addToCart, removeFromCart } = cartSlice.actions
