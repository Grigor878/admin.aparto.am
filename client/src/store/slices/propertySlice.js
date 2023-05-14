import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";

const initialState = {
  loading: false,
  data: null,
  // sendedImgs: false,
  // sendedFiles: false,
  uploadPhoto: {},
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
  async ({ uploadPhoto }) => {
    try {
      await baseApi.post("/api/multyPhoto", uploadPhoto);
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
  reducers: {
    setUploadPhoto: (state, action) => {
      state.uploadPhoto = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropertyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPropertyData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      // .addCase(addPropertiesImgs.pending, (state) => {
      //   state.sendedImgs = false;
      // })
      // .addCase(addPropertiesImgs.fulfilled, (state, action) => {
      //   state.sendedImgs = true;
      // })

      // .addCase(addPropertiesFiles.pending, (state) => {
      //   state.sendedFiles = false;
      // })
      // .addCase(addPropertiesFiles.fulfilled, (state, action) => {
      //   state.sendedFiles = true;
      // });
  },
});

export const { setUploadPhoto } = structureSlice.actions;
// export const getUploadPhoto = (state) => state.property?.uploadPhoto;
export default structureSlice.reducer;
