import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";

const initialState = {
  loading: false,
  data: null,
  added: false,
  removed: false,
};

export const getConfigsAddresses = createAsyncThunk("configs", async () => {
  try {
    const { data } = await baseApi.get("/api/getAddress");
    return data;
  } catch (err) {
    console.log(`Get Configs Adresses Error: ${err.message}`);
  }
});

export const addConfigsAddress = createAsyncThunk(
  "configs/addAddress",
  async ({ addedAddress }) => {
    try {
      await baseApi.post("/api/createAddress", addedAddress);
    } catch (err) {
      console.log(`Add Address Error: ${err.message}`);
    }
  }
);

export const removeConfigsAddress = createAsyncThunk(
  "configs/removeAddress",
  async ({ removedAddress }) => {
    try {
      await baseApi.post("/api/deleteAddress", removedAddress);
    } catch (err) {
      console.log(`Remove Address Error: ${err.message}`);
    }
  }
);

const structureSlice = createSlice({
  name: "configAddresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfigsAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getConfigsAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(addConfigsAddress.pending, (state) => {
        state.added = false;
      })
      .addCase(addConfigsAddress.fulfilled, (state) => {
        state.added = true;
      })

      .addCase(removeConfigsAddress.pending, (state) => {
        state.removed = false;
      })
      .addCase(removeConfigsAddress.fulfilled, (state) => {
        state.removed = true;
      });
  },
});

export default structureSlice.reducer;
