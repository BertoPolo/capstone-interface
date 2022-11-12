import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
  name: "users",
  initialState: {
    name: "",
    username: "",
    adress: "",
    email: "",
    isAdmin: true,
    token: "",
    isLogged: false,
  },
  reducers: {
    addName: (state, action) => {
      return {
        ...state,
        name: action.payload,
      }
    },
    addUserName: (state, action) => {
      return {
        ...state,
        username: action.payload,
      }
    },

    addAdress: (state, action) => {
      return {
        ...state,
        adress: action.payload,
      }
    },
    addEmail: (state, action) => {
      return {
        ...state,
        email: action.payload,
      }
    },

    changeToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      }
    },
    changeIsLogged: (state, action) => {
      return {
        ...state,
        isLogged: action.payload,
      }
    },
  },
})

export default usersSlice.reducer
export const { updateUser, addName, addUserName, addAdress, addEmail, changeToken, changeIsLogged } = usersSlice.actions
