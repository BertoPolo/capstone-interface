import { createSlice } from "@reduxjs/toolkit"

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      return {
        ...state,
        items: action.payload,
      }
    },
  },
})

export default itemsSlice.reducer
export const { addItems } = itemsSlice.actions
