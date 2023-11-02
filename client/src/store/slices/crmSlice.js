import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
// import { success } from "../../components/swal/swal";
import { getAxiosConfig } from "../../apis/config";
import { success } from "../../components/swal/swal";

const initialState = {
  loading: false,
  crmHomes: [],
  userLoading: false,
  crmUsers: [],
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

export const getCrmUsers = createAsyncThunk("crm/users", async () => {
  try {
    const { data } = await baseApi.get("/api/getCrmUsers", getAxiosConfig());
    return data;
  } catch (err) {
    console.log(`Get crm users Error: ${err.message}`);
  }
});

export const addCrmUser = createAsyncThunk("crm/addUser", async (addedUser) => {
  try {
    const { data } = await baseApi.post(
      "/api/addCrmUser",
      addedUser,
      getAxiosConfig()
    );
    console.log(data);

    if (data?.status === "success") {
      success(data?.message);
    }
    // return data;
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
      .addCase(getCrmUsers.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getCrmUsers.fulfilled, (state, action) => {
        state.userLoading = false;
        state.crmUsers = action.payload;
      })
      //
      .addCase(addCrmUser.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addCrmUser.fulfilled, (state, action) => {
        state.addLoading = false;
      });
  },
});

export default crmSlice.reducer;
