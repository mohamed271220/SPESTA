import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: '63701cc1f03239b777777'
};
export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
