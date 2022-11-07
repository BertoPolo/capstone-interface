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
  },
})

export default itemsSlice.reducer
export const { addItems, changeSelectedItem } = itemsSlice.actions
