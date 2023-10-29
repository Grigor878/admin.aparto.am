import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
// import { success } from "../../components/swal/swal";
import { getAxiosConfig } from "../../apis/config";

const initialState = {};

export const addCrmUser = createAsyncThunk("crm", async ( addedUser ) => {
  try {
    const { data } = await baseApi.post(
      "/api/addCrmUser",
      addedUser,
      getAxiosConfig()
    );
    return data;
  } catch (err) {
    console.log(`: ${err.message}`);
  }
});

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCrmUser.pending, (state) => {
        state.loadingAddress = true;
      })
      .addCase(addCrmUser.fulfilled, (state, action) => {
        state.loadingAddress = false;
        state.address = action.payload;
      });
  },
});

export default crmSlice.reducer;
