import { createSlice } from "@reduxjs/toolkit"

const sheetsSlice = createSlice({
  name: "sheets",
  initialState: {
    isOnHome: true,
    isOnOutlet: false,
    isOnCountactUs: false,
    isOnSingleItem: false,
    isOnCategory: false,
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
        isOnCountactUs: action.payload,
      }
    },
    toggleIsOnSingleItem: (state, action) => {
      return {
        ...state,
        isOnSingleItem: action.payload,
      }
    },
    toggleIsOnCategory: (state, action) => {
      return {
        ...state,
        isOnCategory: action.payload,
      }
    },
  },
})

export default sheetsSlice.reducer
export const { toggleIsOnHome, toggleIsOnOutlet, toggleIsCountactUs, toggleIsOnSingleItem, toggleIsOnCategory } = sheetsSlice.actions
