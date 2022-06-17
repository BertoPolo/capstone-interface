import { createSlice } from '@reduxjs/toolkit'

const routesSlice = createSlice({

    name: 'routesSlice',
    initialState:{
        map:"",
        description:"",
        pictures:"",
        reviews:"",
        options:[], 
        garages:[], 
        gasStations:[
            {
            name:"",
            price:"",
            }
        ],
    },
reducers:{
    changeMap:(state,action)=>{
        return{
            ...state,
            map:action.payload,
        }
},
}})

export default routesSlice.reducer
export const {changeMap} = routesSlice.actions