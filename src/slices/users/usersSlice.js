import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isAdmin: true,
    token: "",
  },
  reducers: {
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
export const { changeToken, changeIsAdmin } = usersSlice.actions
