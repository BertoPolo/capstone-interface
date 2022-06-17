import { createSlice } from '@reduxjs/toolkit'

const citiesSlice = createSlice({

    name: 'citiesSlice',
    initialState:{
        originCity:"",
        originCountry:"",
        optStopCity:"",
        optStopCountry:"",
        destinationCity:"",
        destinationCountry:"",
        wantStop :false,
        originCityWeather:"",
        optStopCityWeather:"",
        destinationCityWeather:"",
    },
reducers:{
    changeOriginCity:(state,action)=>{
        return{
            ...state,
            originCity:action.payload,
        }
},
}})

export default citiesSlice.reducer
export const {changeOriginCity} = citiesSlice.actions