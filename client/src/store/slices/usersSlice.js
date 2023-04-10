import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";

const initialState = {
  loading: false,
  users: [],
  // error: "",
};

export const getUsers = createAsyncThunk("user", async () => {
  try {
    const { data } = await baseApi.get("/api/getUsers");
    return data;
  } catch (err) {
    console.log(`Get Users Error: ${err.message}`);
  }
});

// export const addUser = createAsyncThunk("userAdd", async ({ formData }) => {
//   await baseApi.post("/api/addUser", formData);
// });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        // state.error = "";
      });
    // .addCase(getUsers.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default userSlice.reducer;
