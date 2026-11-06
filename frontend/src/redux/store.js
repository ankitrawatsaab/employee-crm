import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import employeeDashboardReducer from "./employeeDashboardSlice.js";
import attendanceReducer from "./attendanceSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employeeDashboard: employeeDashboardReducer,
    attendance: attendanceReducer,
  },
});

export default store;