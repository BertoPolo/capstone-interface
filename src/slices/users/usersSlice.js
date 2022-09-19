import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
  name: "users",
  initialState: {
    //no need delete action, just re-fetching from database it's enough
    name: "",
    adress: "",
    isAdmin: false,
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
  },
})

export default usersSlice.reducer
export const { changeName, changeAdress, changeToken } = usersSlice.actions
