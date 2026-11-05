import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import dashboardReducer from "./dashboardSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard : dashboardReducer,
  },
});

export default store;