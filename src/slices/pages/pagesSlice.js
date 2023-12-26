import { createSlice } from "@reduxjs/toolkit"

const pagesSlice = createSlice({
  name: "pages",
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
    filtersPath: [{}],
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
        isOnUserSearch: false,
        isOnItemSearch: false,
        isOnCreateNewItem: false,
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
        isOnUserSearch: false,
        isOnItemSearch: false,
        isOnCreateNewItem: false,
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
        isOnUserSearch: false,
        isOnItemSearch: false,
        isOnCreateNewItem: false,
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
        isOnUserSearch: false,
        isOnItemSearch: false,
        isOnCreateNewItem: false,
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
        isOnUserSearch: false,
        isOnItemSearch: false,
        isOnCreateNewItem: false,
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

    addFiltersPath: (state, action) => {
      return {
        ...state,
        filtersPath: action.payload,
      }
    },

    removeFiltersPath: (state, action) => {
      return {
        ...state,
        filtersPath: action.payload, //use filter() to take out the action.payload
      }
    },

    cleanFiltersPath: (state, action) => {
      return {
        // ...state,
        filtersPath: action.payload,
      }
    },
  },
})

export default pagesSlice.reducer
export const {
  toggleIsOnHome,
  toggleIsOnOutlet,
  toggleIsCountactUs,
  toggleIsOnSingleItem,
  toggleIsOnCategory,
  toggleIsOnUserSearch,
  toggleIsOnBrands,
  toggleIsOnItemSearch,
  toggleIsOnCreateNewItem,
  addFiltersPath,
  removeFiltersPath,
  cleanFiltersPath,
} = pagesSlice.actions
