import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [
      // { productId: "", number: "" }
    ],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.productId === item.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          productId: item.id,
          totalPrice: item.price - item.price * item.sale,
          originalPrice: item.price - item.price * item.sale,
          image: item.image,
          sale: item.sale,
          number: 1,
          title: item.name,
        });
      } else {
        existingItem.number++;
        existingItem.totalPrice =
          existingItem.totalPrice + existingItem.originalPrice;
      }
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.productId === id);
      state.totalQuantity--;
      if (existingItem.number === 1) {
        state.items = state.items.filter((item) => item.productId !== id);
      } else {
        existingItem.number--;
        existingItem.totalPrice =
          existingItem.totalPrice - existingItem.originalPrice;
      }
    },
    setCart: (state, action) => {
      const items = action.payload.items;
      items.map((item) => {
        return state.items.push({
          productId: item.product,
          totalPrice: item.price * item.number,
          originalPrice: item.price,
          image: item.image,
          sale: item.sale,
          number: item.number,
          title: item.name,
        });
      });
      state.totalQuantity = action.payload.totalQuantity;
      //  state.items
      //   .map((item) => item.number)
      //   .reduce((partialSum, a) => partialSum + a, 0);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
