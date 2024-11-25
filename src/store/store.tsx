import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import PageSlice from "./PageSlice"
import CartSlice from "./CartSlice"
import  FilterProductSlice  from "./FilterProductSlide"

export const store = configureStore({
  reducer: {
    user: userReducer,
    page: PageSlice,
    cart: CartSlice,
    FilterProduct: FilterProductSlice,
  },
})
