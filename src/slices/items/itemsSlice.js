import { createSlice } from "@reduxjs/toolkit"

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    selectedItem: {},
    currentFilters: {
      priceRange: [1, 1000],
      brand: "",
      title: "",
      category: "",
      mainCategory: "",
    },
  },
  reducers: {
    addItems: (state, action) => {
      return {
        ...state,
        items: action.payload,
      }
    },
    changeSelectedItem: (state, action) => {
      return {
        ...state,
        selectedItem: action.payload,
      }
    },

    changeCurrentFilters: (state, action) => {
      return {
        ...state,
        currentFilters: action.payload,
      }
    },
  },
})

export default itemsSlice.reducer
export const { addItems, changeSelectedItem, changeCurrentFilters } = itemsSlice.actions
