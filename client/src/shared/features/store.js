import { configureStore } from "@reduxjs/toolkit";
import { spestaApi } from "./SpestaSlice";
import cartSlice from "./cartSlice";
const store = configureStore({
  reducer: {
    [spestaApi.reducerPath]: spestaApi.reducer,
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spestaApi.middleware),
});

export default store;
