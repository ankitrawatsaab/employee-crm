import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import employeeDashboardReducer from "./employeeDashboardSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employeeDashboard: employeeDashboardReducer,
  },
});

export default store;