import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item._id === action.payload.id)
      if (itemInCart) {
        itemInCart.quantity++
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },

    setItemsQuantity: (state, action) => {
      const itemInCart = state.cart.find((item) => item._id === action.payload.id)
      if (itemInCart) {
        itemInCart.quantity = action.payload
      }
    },

    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item._id !== action.payload)
      state.cart = removeItem
    },
  },

  // incrementQuantity: (state, action) => {
  //   const item = state.cart.find((item) => item._id === action.payload)
  //   item.quantity++
  // },
  // decrementQuantity: (state, action) => {
  //   const item = state.cart.find((item) => item._id === action.payload)
  //   if (item.quantity === 1) {
  //     item.quantity = 1
  //   } else {
  //     item.quantity--
  //   }
  // },
  // addToCart: (state, action) => {
  //   return {
  //     ...state,
  //     content: [...state.content, action.payload],
  //   }
  // },
  // removeFromCart: (state, action) => {
  //   return {
  //     ...state,
  //     content: state.content.filter((book, i) => i !== action.payload),
  //   }
  // },
  // },)
})

export default cartSlice.reducer
export const { addToCart, removeItem, setItemsQuantity } = cartSlice.actions
