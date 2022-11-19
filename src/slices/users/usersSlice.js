import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getToken = createAsyncThunk("book/getToken", async (url, thunkAPI) => {
  try {
    console.log("Fetching from the usersSlice!")
    let response = await fetch(url)

    if (response.ok) {
      let data = await response.json()

      return data
    } else {
      return thunkAPI.rejectWithValue()
    }
  } catch (error) {
    return thunkAPI.rejectWithValue()
  }
})

const usersSlice = createSlice({
  name: "users",
  initialState: {
    name: "",
    username: "",
    adress: "",
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
export const { addName, addUserName, addAdress, addEmail, addIsAdmin, changeToken, changeIsLogged } = usersSlice.actions
