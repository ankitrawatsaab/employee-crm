import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice.js";
import employeeDashboardReducer from "./employeeDashboardSlice.js";
import attendanceReducer from "./attendanceSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  employeeDashboard: employeeDashboardReducer,
  attendance: attendanceReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
