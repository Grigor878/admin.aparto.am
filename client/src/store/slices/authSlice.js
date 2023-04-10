import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
import { error, success } from "../../components/swal/swal";

const initialState = {
  isLoggedIn: false,
  loading: false,
  token: null,
  error: "",
};

export const login = createAsyncThunk("auth", async ({ email, password }) => {
  const res = await baseApi.post("/api/signin", {
    email,
    password,
  });
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
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
        localStorage.setItem("token", action.payload.access_token);
        success("You are logged in");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        error(`Auth Error: ${action.error.message}`);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
