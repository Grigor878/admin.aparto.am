import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  test: 0,
};

const testSlice = createSlice({
  name: "test",
  initialState: initialState,
  reducers: {
    testIncr: (state) => {
      state.test += 1;
    },
    testDecr: (state) => {
      state.test -= 1;
    },
  },
});

export const testSelector = {
  getTest: (state) => state.test,
};

export const { testIncr, testDecr } = testSlice.actions;
export default testSlice;
