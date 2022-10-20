import { createSlice } from "@reduxjs/toolkit"

const sheetsSlice = createSlice({
  name: "sheets",
  initialState: {
    isOnHome: true,
    // isOnOutlet: false,
    // isOnCountactUs: false,
    // isOnSingleItem: false,
    // isOnCategory: false,
    // isOnBrands: false,
  },
  reducers: {
    toggleIsOnHome: (state, action) => {
      return {
        ...state,
        isOnHome: action.payload,
        // isOnOutlet: false,
        // isOnCountactUs: false,
        // isOnSingleItem: false,
        // isOnCategory: false,
        // isOnBrands: false,
      }
    },
    toggleIsOnOutlet: (state, action) => {
      return {
        ...state,
        isOnOutlet: action.payload,
        // isOnHome: false,
        // isOnCountactUs: false,
        // isOnSingleItem: false,
        // isOnCategory: false,
        // isOnBrands: false,
      }
    },
    toggleIsCountactUs: (state, action) => {
      return {
        ...state,
        isOnCountactUs: action.payload,
        // isOnHome: false,
        // isOnOutlet: false,
        // isOnSingleItem: false,
        // isOnCategory: false,
        // isOnBrands: false,
      }
    },
    toggleIsOnSingleItem: (state, action) => {
      return {
        ...state,
        isOnSingleItem: action.payload,
        // isOnHome: false,
        // isOnOutlet: false,
        // isOnCountactUs: false,
        // isOnCategory: false,
        // isOnBrands: false,
      }
    },
    toggleIsOnCategory: (state, action) => {
      return {
        ...state,
        isOnCategory: action.payload,
        // isOnHome: false,
        // isOnOutlet: false,
        // isOnCountactUs: false,
        // isOnSingleItem: false,
        // isOnBrands: false,
      }
    },
    toggleIsOnBrands: (state, action) => {
      return {
        ...state,
        isOnBrands: action.payload,
        // isOnHome: false,
        // isOnOutlet: false,
        // isOnCountactUs: false,
        // isOnSingleItem: false,
        // isOnCategory: false,
      }
    },
  },
})

export default sheetsSlice.reducer
export const { toggleIsOnHome, toggleIsOnOutlet, toggleIsCountactUs, toggleIsOnSingleItem, toggleIsOnCategory } = sheetsSlice.actions
