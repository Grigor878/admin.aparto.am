import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../admin/apis/config";

const initialState = {
  //   role: "",
  isLoggedIn: false,
  loading: false,
  token: null,
};

export const login = createAsyncThunk("auth", async ({ email, password }) => {
  try {
    const res = await axios.post(API_BASE_URL + "/api/signin", {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.token = action.payload.access_token;
        localStorage.setItem("auth", true);
        localStorage.setItem(
          "token",
          JSON.stringify(action.payload.access_token)
        );
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
