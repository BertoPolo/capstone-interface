import { createSlice } from "@reduxjs/toolkit"

const itemsSlice = createSlice({
  name: "itemsSlice",
  initialState: {
    originCity: "",
    originCountry: "",
    wantStop: false,
  },
  reducers: {
    changeOriginCity: (state, action) => {
      return {
        ...state,
        originCity: action.payload,
      }
    },
  },
})

export default itemsSlice.reducer
export const { changeOriginCity, changeOriginCountry } = itemsSlice.actions
