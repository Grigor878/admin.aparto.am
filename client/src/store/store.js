import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userGlobalSlice from "./slices/userGlobalSlice";
import usersSlice from "./slices/usersSlice";
import propertySlice from "./slices/propertySlice";
import structureSlice from "./slices/structureSlice";
import configsSlice from "./slices/configsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "userGlobal"],
  // storageSession,
};

const rootReducer = combineReducers({
  auth: authSlice,
  userGlobal: userGlobalSlice,
  users: usersSlice,
  property: propertySlice,
  structure: structureSlice,
  configs: configsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;
