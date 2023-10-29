import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
// import { success } from "../../components/swal/swal";
import { getAxiosConfig } from "../../apis/config";
import { success } from "../../components/swal/swal";

const initialState = {
  loading: false,
  crmHomes: [],
  addLoading: false,
};

export const getHomes = createAsyncThunk("crm", async () => {
  try {
    const { data } = await baseApi.get("/api/getHomesForCrm", getAxiosConfig());
    return data;
  } catch (err) {
    console.log(`Get crm homes Error: ${err.message}`);
  }
});

export const addCrmUser = createAsyncThunk("crm/addUser", async (addedUser) => {
  try {
    const { data } = await baseApi.post(
      "/api/addCrmUser",
      addedUser,
      getAxiosConfig()
    );
    return data;
  } catch (err) {
    console.log(`Crm add client Error: ${err.message}`);
  }
});

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHomes.fulfilled, (state, action) => {
        state.loading = false;
        state.crmHomes = action.payload;
      })
      //
      .addCase(addCrmUser.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addCrmUser.fulfilled, (state, action) => {
        state.addLoading = false;
        success("User added successfully!")
      });
  },
});

export default crmSlice.reducer;
