export const localStorageMethods = {
  addIetm: (itemName: string, value: any) => {
    localStorage.setItem(itemName, JSON.stringify(value));
  },
  updateItem: (itemName: string, value: any) => {
    localStorage.setItem(itemName, JSON.stringify(value));
  },
  deleteItem: (itemName: string) => {
    localStorage.removeItem(itemName);
  },
  getItem: (itemName: string) => {
    return JSON.parse(localStorage.getItem(itemName) as string);
  },
};
