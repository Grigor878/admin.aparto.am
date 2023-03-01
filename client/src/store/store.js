import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./slices/testSlices";

const store = configureStore({
  reducer: testSlice.reducer,
});

export default store;
