import { createSlice } from "@reduxjs/toolkit"

const mainCategoriesSlice = createSlice({
  name: "mainCategories",
  initialState: {
    mainCategories: [],
  },
  reducers: {
    addMainCategories: (state, action) => {
      return {
        ...state,
        mainCategories: action.payload,
      }
    },
  },
})

export default mainCategoriesSlice.reducer
export const { addMainCategories } = mainCategoriesSlice.actions
