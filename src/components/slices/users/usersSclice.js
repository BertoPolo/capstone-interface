import { createSlice } from '@reduxjs/toolkit'

const citiesSlice = createSlice({

    name: 'citiesSlice',
    initialState:{
        type: user/garageUser 
        // token:"",
        if garage user : reviews
        if garage user  : description
        if garage user : address
        favRoutes:"", 
        bike:"",
        avatar:"",
        friendList:[]
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