import { localStorageMethods } from "../../localStorage/LocalStorage";

export const userReducers = {
  setUser: (state: any, action: any) => {
    const { access_token, ...user } = action.payload;
    localStorageMethods.updateItem("user", user);
    localStorageMethods.updateItem("token", access_token);    
    Object.assign(state, action.payload);
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
