import { createSlice } from "@reduxjs/toolkit"

const citiesSlice = createSlice({
  name: "citiesSlice",
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

export default citiesSlice.reducer
export const { changeOriginCity, changeOriginCountry, changeOptStopCity } = citiesSlice.actions
