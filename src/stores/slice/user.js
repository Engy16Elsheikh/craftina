import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userData: {},
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    saveUserData: (state, action) => {
      state.userData = action.payload;
    },

    saveUserToken: (state, action) => {
      state.token = action.payload;
    },
    clearUserData: (state) => {
      state.userData = {};
    },

    clearUserToken: (state) => {
      state.token = "";
    },

    clearUser: (state) => {
      state.userData = {};
      state.token = "";
    },
  },
});

export const {
  saveUserData,
  saveUserToken,
  clearUserData,
  clearUserToken,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
