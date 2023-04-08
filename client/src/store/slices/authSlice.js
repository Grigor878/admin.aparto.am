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
  // try {
  //   const res = await baseApi.post("/api/signin", {
  //     email,
  //     password,
  //   });
  //   success("You are logged in");
  //   return res.data;
  // } catch (err) {
  //   console.log(`Log-In Error: ${err.message}`);
  //   error(`Auth Error: ${err.message}`);
  // }
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
