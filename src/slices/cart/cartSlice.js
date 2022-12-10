import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalAmount: 0,
  },
  reducers: {
    // localStorage.setItem(username, JSON.stringify(cart))

    addToCart: (state, action) => {
      state.cart.push({ ...action.payload, quantity: 1 })
    },

    setItemsQuantity: (state, action) => {
      const itemInCart = state.cart.find((item) => item._id === action.payload[0])
      // console.log(action.payload[1])
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

// addToCart: (state, action) => {
//   return {
//     ...state,
//     content: [...state.content, action.payload],
//   }
// },

//  addToCart: (state, action) => {
//       const itemInCart = state.cart.find((item) => item._id === action.payload.id)
//       if (itemInCart) {
//         itemInCart.quantity++
//       } else {
//         state.cart.push({ ...action.payload, quantity: 1 })
//         console.log(state)
//       }
//     },
