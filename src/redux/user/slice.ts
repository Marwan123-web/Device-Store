import { createSlice } from "@reduxjs/toolkit";
import { localStorageMethods } from "../../localStorage/LocalStorage";
import { userReducers } from "./reducer";

const userInitialState =
  localStorageMethods.getItem("user") !== null &&
  localStorageMethods.getItem("user") !== undefined
    ? localStorageMethods.getItem("user")
    : localStorageMethods.addIetm("user", null);
const userTokenInitialState =
  localStorageMethods.getItem("token") !== null &&
  localStorageMethods.getItem("token") !== undefined
    ? localStorageMethods.getItem("token")
    : localStorageMethods.addIetm("token", null);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    ...(userInitialState || null),
    ...(userTokenInitialState && {
      access_token: userTokenInitialState,
    }),
  },
  reducers: userReducers,
});

export const { setUser, updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
