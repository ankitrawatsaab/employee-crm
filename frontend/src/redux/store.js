import { persistStore, persistReducer } from "redux-persist";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./authSlice.js";
import employeeDashboardSlice from "./employeeDashboardSlice.js";
import attendanceSlice from "./attendanceSlice.js";

const rootReducer = combineReducers({
  auth: authSlice,
  employeeDashboard: employeeDashboardSlice,
  attendance: attendanceSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['auth', 'employeeDashboard', 'attendance']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }),
});

export default store;
