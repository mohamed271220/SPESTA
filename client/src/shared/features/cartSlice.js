import { createSlice } from "@reduxjs/toolkit";

createSlice({
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
      const existingItem = state.items.find(
        (i) => i.productId === item.productId
      );
      if (!existingItem) {
        state.items.push({
          productId: item,
          price: item.price,
          number: 1,
          totalQuantity: item.price,
          title: item.title,
        });
      } else {
        existingItem.number++;
        existingItem.totalQuantity = existingItem.totalQuantity + item.price;
      }
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.productId === id);
      if (existingItem.number === 1) {
        state.items = state.items.filter((item) => item.productId !== id);
      } else {
        existingItem.number--;
      }
    },
  },
});
