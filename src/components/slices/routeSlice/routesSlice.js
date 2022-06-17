import { createSlice } from '@reduxjs/toolkit'

const routesSlice = createSlice({

    name: 'routesSlice',
    initialState:{
        map:"",
        description:"",
        pictures:[],
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
    changeDescription:(state,action)=>{
        return{
            ...state,
            description:action.payload,
        }
},
    changePictures:(state,action)=>{
        return{
            ...state,
            pictures:action.payload,
        }
},
    changeReviews:(state,action)=>{
        return{
            ...state,
            reviews:action.payload,
        }
},
    addOptions:(state,action)=>{
        return{
            ...state,
            options:action.payload,
        }
},
    addGarages:(state,action)=>{
        return{
            ...state,
            garages:action.payload,
        }
},
}})

export default routesSlice.reducer
export const {changeMap,changeDescription,changePictures,changeReviews,addOptions,addGarages} = routesSlice.actions