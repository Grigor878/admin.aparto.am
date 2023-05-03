import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";

const initialState = {
  loading: false,
  info: null,
};

export const getStructureInfo = createAsyncThunk("structure", async () => {
  try {
    const { data } = await baseApi.get("/api/getFormStructure");
    return data;
  } catch (err) {
    console.log(`Get Structure Info Error: ${err.message}`);
  }
});

// export const removeStructureField = createAsyncThunk(
//   "structure",
//   async ({ removedField }) => {
//     return baseApi.post("/api/removeGlobalFormField", removedField);
//   }
// );

const structureSlice = createSlice({
  name: "structure",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStructureInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStructureInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      });
  },
});

export default structureSlice.reducer;
