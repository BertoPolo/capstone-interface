import { createSlice } from "@reduxjs/toolkit"

const citiesSlice = createSlice({
  name: "citiesSlice",
  initialState: {
    originCity: "",
    originCountry: "",
    optStopCity: "",
    optStopCountry: "",
    destinationCity: "",
    destinationCountry: "",
    wantStop: false,
    originCityWeather: "",
    optStopCityWeather: "",
    destinationCityWeather: "",
  },
  reducers: {
    changeOriginCity: (state, action) => {
      return {
        ...state,
        originCity: action.payload,
      }
    },
    changeOriginCountry: (state, action) => {
      return {
        ...state,
        originCountry: action.payload,
      }
    },
    changeOptStopCity: (state, action) => {
      return {
        ...state,
        optStopCity: action.payload,
      }
    },
    changeOptStopCountry: (state, action) => {
      return {
        ...state,
        optStopCountry: action.payload,
      }
    },
    changeDestinationCity: (state, action) => {
      return {
        ...state,
        destinationCity: action.payload,
      }
    },
    changeDestinationCountry: (state, action) => {
      return {
        ...state,
        destinationCountry: action.payload,
      }
    },
    changeWantStop: (state, action) => {
      return {
        ...state,
        wantStop: action.payload,
      }
    },
    changeOriginCityWeather: (state, action) => {
      return {
        ...state,
        originCityWeather: action.payload,
      }
    },
    changeOptCityWeather: (state, action) => {
      return {
        ...state,
        optCityWeather: action.payload,
      }
    },
    changeDestinationCityWeather: (state, action) => {
      return {
        ...state,
        destinationCityWeather: action.payload,
      }
    },
  },
})

export default citiesSlice.reducer
export const {
  changeOriginCity,
  changeOriginCountry,
  changeOptStopCity,
  changeOptStopCountry,
  changeDestinationCity,
  changeDestinationCountry,
  changeWantStop,
  changeOriginCityWeather,
  changeOptCityWeather,
  changeDestinationCityWeather,
} = citiesSlice.actions
