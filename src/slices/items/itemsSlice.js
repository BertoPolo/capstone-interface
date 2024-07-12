import { createSlice } from "@reduxjs/toolkit"

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    selectedItem: null,
  },
  reducers: {
    addItems: (state, action) => {
      state.items = action.payload
    },
    changeSelectedItem: (state, action) => {
      state.selectedItem = action.payload
    },
  },
})

export default itemsSlice.reducer
export const { addItems, changeSelectedItem } = itemsSlice.actions
