import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
  name: "users",
  initialState: {
    name: "",
    username: "",
    adress: "",
    isAdmin: false,
    token: "",
  },
  reducers: {
    addName: (state, action) => {
      return {
        ...state,
        name: action.payload,
      }
    },

    addAdress: (state, action) => {
      return {
        ...state,
        adress: action.payload,
      }
    },

    changeToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      }
    },
  },
})

export default usersSlice.reducer
export const { addName, addAdress, changeToken } = usersSlice.actions
