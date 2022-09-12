import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
  name: "users",
  initialState: {
    // is UsersSlice right? it's not an object then maybe will only display 1 user ( the last I asked for )
    name: "",
    adress: "",
    isAdmin: true,
    token: "",
  },
  reducers: {
    changeName: (state, action) => {
      return {
        ...state,
        name: action.payload,
      }
    },

    changeAdress: (state, action) => {
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

    changeIsAdmin: (state, action) => {
      return {
        ...state,
        isAdmin: action.payload,
      }
    },
  },
})

export default usersSlice.reducer
export const { changeName, changeAdress, changeToken, changeIsAdmin } = usersSlice.actions
