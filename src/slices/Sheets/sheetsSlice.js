import { createSlice } from "@reduxjs/toolkit"

const sheetsSlice = createSlice({
  name: "sheets",
  initialState: {
    isOnHome: true,
    isOnOutlet: false,
    isOnCountactUs: false,
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
    toOnggleIsCountactUs: (state, action) => {
      return {
        ...state,
        isOnCountactUs: action.payload,
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
export const { toggleIsOnHome, toggleIsOnOutlet, toOnggleIsCountactUs, toggleIsOnSingleItem } = sheetsSlice.actions
