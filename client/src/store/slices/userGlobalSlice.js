import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
import { getAxiosConfig } from "../../apis/config";
import axios from "axios";

const initialState = {
  loading: false,
  userGlobal: [],
  error: "",
};

// export const getUserGlobal = createAsyncThunk("userGlobal", async () => {
//   console.log(88444);
//   const response = await baseApi.get("/api/getGlobalUser", GetAxiosConfig());
//   console.log(response.data, 88);
//   return response.data;
// });

export const getUserGlobal = createAsyncThunk("userGlobal", async () => {
  try {
    const { data } = await baseApi.post(
      "/api/getGlobalUser",
      null,
      getAxiosConfig()
    );
    console.log(77788);
    return data;
  } catch (err) {
    console.log(`Get Global User Error: ${err.message}`);
  }

    // await axios
    //   .post("http://127.0.0.1:8000/api/getGlobalUser", null, GetAxiosConfig())
    //   .then((response) => {
    //     console.log(response.data, 88);
    //   });
});

const userGlobalSlice = createSlice({
  name: "userGlobal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserGlobal.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserGlobal.fulfilled, (state, action) => {
        state.loading = false;
        state.userGlobal = action.payload;
        // state.error = "";
      })
      .addCase(getUserGlobal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userGlobalSlice.reducer;
