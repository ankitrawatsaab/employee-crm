
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authSlice from "./authSlice.js";
import employeeDashboardSlice from "./employeeDashboardSlice.js";
import attendanceSlice from "./attendanceSlice.js";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Custom localStorage adapter
const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) =>
    Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) =>
    Promise.resolve(localStorage.removeItem(key)),
};

const rootReducer = combineReducers({
  auth: authSlice,
  employeeDashboard: employeeDashboardSlice,
  attendance: attendanceSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "employeeDashboard", "attendance"],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
