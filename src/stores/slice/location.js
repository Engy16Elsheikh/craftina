import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  prevLoction: "/",
};

const locationSlice = createSlice({
  name: "location",
  initialState: INITIAL_STATE,

  reducers: {
    changeLocation(state, action) {
      state.prevLoction = action.payload;
    },
  },
});

export const { changeLocation } = locationSlice.actions;

export default locationSlice.reducer;
