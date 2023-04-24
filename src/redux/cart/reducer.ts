import { localStorageMethods } from "../../localStorage/LocalStorage";

export const cartReducers = {
  addItem: (state: any, action: any) => {
    action.payload.quantity = 1;
    state.items.push(action.payload);
    localStorageMethods.updateItem("cart", state.items);
  },
  editItem: (state: any, action: any) => {
    let index = state.items.findIndex(
      (cart: any) => cart?.id === action?.payload?.id
    );

    if (index !== -1) {
      if (
        state.items[index]?.quantity === 1 &&
        action?.payload?.method === "remove"
      ) {
        cartReducers.deleteItem(state, action);
      } else {
        state.items[index].quantity =
          action?.payload?.method === "add"
            ? state.items[index].quantity + 1
            : state.items[index].quantity - 1;
        localStorageMethods.updateItem("cart", state.items);
      }
    }
  },
  deleteItem: (state: any, action: any) => {
    state.items = state.items.filter(
      (cart: any) => cart.id !== action.payload.id
    );
    localStorageMethods.updateItem("cart", state.items);
  },
  calcTotal: (state: any) => {
    let total = 0;
    state.items.forEach((item: any) => {
      total = total + parseInt(item.price) * item.quantity;
    });
    state.total = total;
  },
};
