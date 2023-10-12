import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
import { getAxiosConfig } from "../../apis/config";

const initialState = {
  loading: false,
  users: [],
};

export const getUsers = createAsyncThunk("users", async () => {
  try {
    const { data } = await baseApi.get("/api/getUsers", getAxiosConfig());
    return data;
  } catch (err) {
    console.log(`Get Users Error: ${err.message}`);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });
  },
});

export const { clearUsers } = userSlice.actions;
export default userSlice.reducer;
