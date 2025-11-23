import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/slice";
import  userSlice  from "./user/slice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
  },
});
