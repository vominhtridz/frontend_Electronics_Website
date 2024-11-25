import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
}

export const userSlice = createSlice({
  name: "Page",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoading } = userSlice.actions

export default userSlice.reducer
