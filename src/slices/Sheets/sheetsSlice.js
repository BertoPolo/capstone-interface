import { createSlice } from "@reduxjs/toolkit"

const sheetsSlice = createSlice({
  name: "sheetsSlice",
  initialState: {
    isOnHome: true,
    isOnOutlet: false,
    isCountactUs: false,
    isOnSingleItem: false,
  },
  reducers: {
    toggleIsOnHome: (state, action) => {
      return {
        ...state,
        isOnHome: action.payload,
      }
    },
    toggleIsOnOutlet: (state, action) => {
      return {
        ...state,
        isOnOutlet: action.payload,
      }
    },
    toggleIsCountactUs: (state, action) => {
      return {
        ...state,
        isCountactUs: action.payload,
      }
    },
    toggleIsOnSingleItem: (state, action) => {
      return {
        ...state,
        isOnSingleItem: action.payload,
      }
    },
  },
})

export default sheetsSlice.reducer
export const { toggleIsOnHome, toggleIsOnOutlet, toggleIsCountactUs, toggleIsOnSingleItem } = sheetsSlice.actions
