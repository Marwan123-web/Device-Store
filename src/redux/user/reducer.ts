import { PayloadAction } from "@reduxjs/toolkit";
import { localStorageMethods } from "../../localStorage/LocalStorage";
import { UserState } from "../../models/user.interface";

export const userReducers = {
  setUser: (state: any, action: any) => {
    const { access_token, ...user } = action.payload;
    localStorageMethods.updateItem("user", user);
    localStorageMethods.updateItem("token", access_token);
    Object.assign(state, action.payload);
  },
  updateUser: (state: any, action: PayloadAction<Partial<UserState>>) => {
    Object.assign(state, action.payload); // Merge updates into state
    const { access_token, ...user } = state;
    localStorageMethods.updateItem("user", user);
  },
  resetUser: (state: any) => {
    // Clear all properties in state to reset it
    Object.keys(state).forEach((key) => {
      delete state[key];
    });

    localStorageMethods.updateItem("user", null);
    localStorageMethods.updateItem("token", null);
  },
};
