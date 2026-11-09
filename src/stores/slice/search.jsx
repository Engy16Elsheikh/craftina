import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchProducts: [],
  searchServices: [],
  searchUsers: [],
};

const productServicesSlice = createSlice({
  name: "productServices",
  initialState,
  reducers: {
    setSearchProducts(state, action) {
      state.searchProducts = action.payload;
    },
    setSearchServices(state, action) {
      state.searchServices = action.payload;
    },
    setSearchUsers(state, action) {
      state.searchUsers = action.payload;
    },
  },
});

export const { setSearchProducts, setSearchServices, setSearchUsers } =
  productServicesSlice.actions;
export default productServicesSlice.reducer;
