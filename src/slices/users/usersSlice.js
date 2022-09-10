import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
  name: "users",
  initialState: {
    name: "",
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
export const { changeName, changeToken, changeIsAdmin } = usersSlice.actions
