import { createSlice } from '@reduxjs/toolkit'

const generalPropertiesSlice = createSlice({

    name: 'generalProperties',
    initialState:{
        map:"",
    },
reducers:{
    changeMap:(state,action)=>{
        return{
            ...state,
            map:action.payload,
        }
},
}})

export default generalPropertiesSlice.reducer
export const {changeMap} = generalPropertiesSlice.actions