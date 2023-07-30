import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: false,
  userId: null,
  data: null,
  address: null,
  tokenExpirationDate: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    
    },
    login(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.data = action.payload.data;
      state.tokenExpirationDate =
        action.payload.expirationDate ||
        new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: state.userId,
          token: state.token,
          data: state.data,
          expiration: state.tokenExpirationDate.toString(),
        })
      );
    },
    logout(state) {
      state.token = null;
      state.tokenExpirationDate = null;
      state.userId = null;
      state.data = null;
      localStorage.removeItem("userData");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;