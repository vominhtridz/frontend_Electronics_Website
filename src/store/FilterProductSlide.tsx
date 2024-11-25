import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  FilterProduct: null,
}

export const FilterProductSlice = createSlice({
  name: "FilterProduct",
  initialState,
  reducers: {
    setFilterProduct: (state, action) => {
      state.FilterProduct = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFilterProduct } = FilterProductSlice.actions

export default FilterProductSlice.reducer
