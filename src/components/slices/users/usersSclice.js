import { createSlice } from '@reduxjs/toolkit'

const citiesSlice = createSlice({

    name: 'citiesSlice',
    initialState:{
        type: "",//user/garageUser 
        // token:"",
        garageReviews:[],
        garageDescription:"",
        garageAddress:"",
        favRoutes:[], 
        bike:"",
        avatar:"",
        friendList:[]
    },
    reducers:{

    defineTypeUser:(state,action)=>{
        return{
            ...state,
            type:action.payload,
        }
},
    addGarageReviews:(state,action)=>{
        return{
            ...state,
            garageReviews:action.payload,
        }
},
    changeGarageDescription:(state,action)=>{
        return{
            ...state,
            garageDescription:action.payload,
        }
},
    changeGarageAdress:(state,action)=>{
        return{
            ...state,
            garageAddress:action.payload,
        }
},
    addFavRoutes:(state,action)=>{
        return{
            ...state,
            garageAddress:action.payload,
        }
},
//     deleteFavRoutes:(state,action)=>{
//         return{
//             ...state,
//             garageAddress:action.payload,
//         }
// },
    changeBike:(state,action)=>{
        return{
            ...state,
            bike:action.payload,
        }
},
    changeAvatar:(state,action)=>{
        return{
            ...state,
            avatar:action.payload,
        }
},
    addFriendList:(state,action)=>{
        return{
            ...state,
            friendList:action.payload,
        }
},
//     removeFromFriendList:(state,action)=>{
//         return{
//             ...state,
//             friendList:action.payload,
//         }
// },

}})

export default citiesSlice.reducer
export const {addGarageReviews,defineTypeUser,changeGarageDescription,changeGarageAdresss,addFavRoutes,changeBike,changeAvatar,addFriendList} = citiesSlice.actions