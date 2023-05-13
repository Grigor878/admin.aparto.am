import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";

const initialState = {
  loading: false,
  data: null,
};

export const getPropertyData = createAsyncThunk("property", async () => {
  try {
    const { data } = await baseApi.get("/api/getAllStructure");
    return data;
  } catch (err) {
    console.log(`Get Property Data Error: ${err.message}`);
  }
});

// nkarneri uxarkelu hamar
export const addPropertiesImgs = createAsyncThunk(
  "property/addPropertiesImgs",
  async ({ formData }) => {
    try {
      await baseApi.post("/api/multyPhoto", formData);
    } catch (err) {
      console.log(`Add Properties Imgs Sending Error: ${err.message}`);
    }
  }
);
// fileri uxarkelu hamar
export const addPropertiesFiles = createAsyncThunk(
  "property/addPropertiesFiles",
  async ({ formData }) => {
    try {
      await baseApi.post("/api/multyPhoto", formData);
    } catch (err) {
      console.log(`Add Properties Files Sending Error: ${err.message}`);
    }
  }
);

const structureSlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPropertyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPropertyData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export default structureSlice.reducer;
