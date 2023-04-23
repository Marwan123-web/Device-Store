import { createSlice } from "@reduxjs/toolkit";
import { localStorageMethods } from "../../localStorage/LocalStorage";
import { cartReducers } from "./reducer";

const cartinitialState =
  localStorageMethods.getItem("cart") !== null &&
  localStorageMethods.getItem("cart") !== undefined
    ? localStorageMethods.getItem("cart")
    : localStorageMethods.addIetm("cart", []);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: cartinitialState || [],
  },
  reducers: cartReducers,
});

export const { addItem, editItem, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
