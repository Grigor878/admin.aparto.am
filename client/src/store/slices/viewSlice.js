import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";

const initialState = {
  loading: false,
  data: null,
};

// get single property data
export const getViewData = createAsyncThunk("view", async (id) => {
  try {
    const { data } = await baseApi.get(`/api/getInterfaceProperties/${id}`);
    return data;
  } catch (err) {
    console.log(`Get Single Property Data Error: ${err.message}`);
  }
});

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getViewData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getViewData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
  },
});

export default viewSlice.reducer;
