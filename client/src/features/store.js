import { configureStore } from "@reduxjs/toolkit";
import { spestaApi } from "./SpestaSlice";

const store = configureStore({
  reducer: {
    [spestaApi.reducerPath]: spestaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(spestaApi.middleware),
});

export default store;
