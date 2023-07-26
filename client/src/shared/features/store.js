import { configureStore } from "@reduxjs/toolkit";
import { spestaApi } from "./SpestaSlice";
import cartSlice from "./cartSlice";
import authReducer from "./authSlice";
const store = configureStore({
  reducer: {
    [spestaApi.reducerPath]: spestaApi.reducer,
    cart: cartSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spestaApi.middleware),
});

export default store;
