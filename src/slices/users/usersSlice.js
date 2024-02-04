import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
  name: "users",
  initialState: {
    name: "",
    username: "",
    address: "",
    email: "",
    isAdmin: false,
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

    addAddress: (state, action) => {
      return {
        ...state,
        address: action.payload,
      }
    },

    addEmail: (state, action) => {
      return {
        ...state,
        email: action.payload,
      }
    },

    addIsAdmin: (state, action) => {
      return {
        ...state,
        isAdmin: action.payload,
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
export const { addName, addUserName, addAddress, addEmail, addIsAdmin, changeToken, changeIsLogged } = usersSlice.actions
