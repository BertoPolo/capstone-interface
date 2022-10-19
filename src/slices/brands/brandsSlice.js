import { createSlice } from "@reduxjs/toolkit"

const brandsSlice = createSlice({
  name: "brandsSlice",
  initialState: {
    brands: [],
  },
  reducers: {
    addBrands: (state, action) => {
      return {
        ...state,
        brands: [...state.brands, action.payload],
      }
    },
  },
})

export default brandsSlice.reducer
export const { addBrands } = brandsSlice.actions
