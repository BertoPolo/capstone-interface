import { createSlice } from "@reduxjs/toolkit"

const sheetsSlice = createSlice({
  name: "sheets",
  initialState: {
    isOnHome: true,
    isOnOutlet: false,
    isOnCountactUs: false,
    isOnSingleItem: false,
    isOnCategory: false,
    isOnBrands: false,
    isOnUserSearch: false,
    isOnItemSearch: false,
    isOnCreateNewItem: false,
  },

  reducers: {
    toggleIsOnHome: (state, action) => {
      return {
        ...state,
        isOnHome: action.payload,
        isOnOutlet: false,
        isOnCountactUs: false,
        isOnSingleItem: false,
        isOnCategory: false,
        isOnBrands: false,
        isOnUsers: false,
        isOnItems: false,
        isOnNewItems: false,
      }
    },
    toggleIsOnOutlet: (state, action) => {
      return {
        ...state,
        isOnOutlet: action.payload,
        isOnHome: false,
        isOnCountactUs: false,
        isOnSingleItem: false,
        isOnCategory: false,
        isOnBrands: false,
        isOnUsers: false,
        isOnItems: false,
        isOnNewItems: false,
      }
    },
    toggleIsCountactUs: (state, action) => {
      return {
        ...state,
        isOnCountactUs: action.payload,
        isOnHome: false,
        isOnOutlet: false,
        isOnSingleItem: false,
        isOnCategory: false,
        isOnBrands: false,
        isOnUsers: false,
        isOnItems: false,
        isOnNewItems: false,
      }
    },
    toggleIsOnSingleItem: (state, action) => {
      return {
        ...state,
        isOnSingleItem: action.payload,
        isOnHome: false,
        isOnOutlet: false,
        isOnCountactUs: false,
        isOnCategory: false,
        isOnBrands: false,
        isOnUsers: false,
        isOnItems: false,
        isOnNewItems: false,
      }
    },
    toggleIsOnCategory: (state, action) => {
      return {
        ...state,
        isOnCategory: action.payload,
        isOnHome: false,
        isOnOutlet: false,
        isOnCountactUs: false,
        isOnSingleItem: false,
        isOnBrands: false,
        isOnUsers: false,
        isOnItems: false,
        isOnNewItems: false,
      }
    },
    toggleIsOnBrands: (state, action) => {
      return {
        ...state,
        isOnBrands: action.payload,
        isOnHome: false,
        isOnOutlet: false,
        isOnCountactUs: false,
        isOnSingleItem: false,
        isOnCategory: false,
        isOnUserSearch: false,
        isOnItemSearch: false,
        isOnCreateNewItem: false,
      }
    },
    toggleIsOnUserSearch: (state, action) => {
      return {
        ...state,
        isOnUserSearch: action.payload,
        isOnItemSearch: false,
        isOnCreateNewItem: false,
      }
    },

    toggleIsOnItemSearch: (state, action) => {
      return {
        ...state,
        isOnItemSearch: action.payload,
        isOnUserSearch: false,
        isOnCreateNewItem: false,
      }
    },

    toggleIsOnCreateNewItem: (state, action) => {
      return {
        ...state,
        isOnCreateNewItem: action.payload,
        isOnItemSearch: false,
        isOnUserSearch: false,
      }
    },
  },
})

export default sheetsSlice.reducer
export const {
  toggleIsOnHome,
  toggleIsOnOutlet,
  toggleIsCountactUs,
  toggleIsOnSingleItem,
  toggleIsOnCategory,
  toggleIsOnUserSearch,
  toggleIsOnItemSearch,
  toggleIsOnCreateNewItem,
} = sheetsSlice.actions
