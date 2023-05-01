import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userGlobalSlice from "./slices/userGlobalSlice";
import usersSlice from "./slices/usersSlice";
import structureSlice from "./slices/structureSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  // storageSession,
};

const rootReducer = combineReducers({
  auth: authSlice,
  userGlobal: userGlobalSlice,
  users: usersSlice,
  structure: structureSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;
