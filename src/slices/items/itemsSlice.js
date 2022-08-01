import { createSlice } from "@reduxjs/toolkit"

const itemsSlice = createSlice({
  name: "itemsSlice",
  initialState: {
    items: [],
  },
  reducers: {
    changeItems: (state, action) => {
      return {
        ...state,
        items: action.payload,
      }
    },
  },
})

export default itemsSlice.reducer
export const { changeItems } = itemsSlice.actions
