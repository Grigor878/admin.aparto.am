import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";

const initialState = {
  sale: null,
  rent: null,
};

export const getSale = createAsyncThunk("home", async () => {
  try {
    const { data } = await baseApi.get("/api/getSaleHomes");
    return data;
  } catch (err) {
    console.log(`Get Top Sale Homes Error: ${err.message}`);
  }
});

export const getRent = createAsyncThunk("home/getRent", async () => {
  try {
    const { data } = await baseApi.get("/api/getRentHomes");
    return data;
  } catch (err) {
    console.log(`Get Top Rent Homes Error: ${err.message}`);
  }
});

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //   .addCase(getSale.pending, (state) => {})
    //   .addCase(getSale.rejected, (state, action) => {})
      .addCase(getSale.fulfilled, (state, action) => {
        state.sale = action.payload;
      })
      .addCase(getRent.fulfilled, (state, action) => {
        state.rent = action.payload;
      });
  },
});

export default homeSlice.reducer;
