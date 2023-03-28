import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

// vor refreshic chjnjvi state-y
// https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/

// const rootReducer = combineReducers({
//   auth: authSlice,
//   // myus: myusSlice
// })
//  reducer: rootReducer grel store um

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
