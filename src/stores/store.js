import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user";
import favirotSlice from "./slice/favirot";
import productServicesSlice from "./slice/search";

export default configureStore({
  reducer: {
    user: userSlice,
    favirot: favirotSlice,
    productServices: productServicesSlice,
  },
});
