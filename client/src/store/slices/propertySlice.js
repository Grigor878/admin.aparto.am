import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";

const initialState = {
  loading: false,
  data: null,
  sendedImgs: false,
  sendedFiles: false,
  uploadPhoto: {},
  uploadFile: {},
  yandexMapClick: []
};

// global data get
export const getPropertyData = createAsyncThunk("property", async () => {
  try {
    const { data } = await baseApi.get("/api/getAllStructure");
    return data;
  } catch (err) {
    console.log(`Get Property Data Error: ${err.message}`);
  }
});

// imgs post
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

// files post
export const addPropertiesFiles = createAsyncThunk(
  "property/addPropertiesFiles",
  async ({ uploadFile }) => {
    try {
      await baseApi.post("/api/documentUpload", uploadFile);
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
    setUploadFile: (state, action) => {
      state.uploadFile = action.payload;
    },
    setYandexMapClick: (state, action) => {
      state.yandexMapClick = action.payload;
    }
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

      .addCase(addPropertiesImgs.pending, (state) => {
        state.sendedImgs = true;
      })
      .addCase(addPropertiesImgs.fulfilled, (state) => {
        state.sendedImgs = false;
      })

      .addCase(addPropertiesFiles.pending, (state) => {
        state.sendedFiles = true;
      })
      .addCase(addPropertiesFiles.fulfilled, (state) => {
        state.sendedFiles = false;
      });
  },
});

export const { setUploadPhoto, setUploadFile, setYandexMapClick } = structureSlice.actions;
// export const getUploadPhoto = (state) => state.property?.uploadPhoto;
export const getYandexMapClick = (state) => state.property?.yandexMapClick;
export default structureSlice.reducer;
