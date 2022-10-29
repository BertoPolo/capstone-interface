import { createSlice } from "@reduxjs/toolkit"

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    addCategories: (state, action) => {
      return {
        ...state,
        categories: action.payload,
      }
    },
  },
})

export default categoriesSlice.reducer
export const { addCategories } = categoriesSlice.actions
