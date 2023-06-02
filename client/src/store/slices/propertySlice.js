import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
import { getAxiosConfig } from "../../apis/config";

const initialState = {
  structureLoading: false,
  structure: null,
  propertyLoading: false,
  propertyData: null,
  postLoading: false,
  uploadPhoto: {},
  uploadFile: {},
  yandex: [],
  keyword: [],
};

// get property structure
export const getPropertyStructure = createAsyncThunk("property", async () => {
  try {
    const { data } = await baseApi.get("/api/getAllStructure");
    return data;
  } catch (err) {
    console.log(`Get Property Structure Error: ${err.message}`);
  }
});

// get property data
export const getPropertyData = createAsyncThunk(
  "property/getPropertyData",
  async () => {
    try {
      const { data } = await baseApi.get("/api/getHome");
      return data;
    } catch (err) {
      console.log(`Get Property Data Error: ${err.message}`);
    }
  }
);

// post added data
export const addPropertyData = createAsyncThunk(
  "property/addPropertyData",
  async ({ addProperty }, { rejectWithValue, dispatch }) => {
    try {
      const response = await baseApi.post(
        "/api/addHome",
        addProperty,
        getAxiosConfig()
      );
      dispatch(addPropertyImgs(response.data));
      return response.data;
    } catch (err) {
      console.log(`Add Property Data Sending Error: ${err.message}`);
      throw rejectWithValue(err.message);
    }
  }
);

// post imgs
export const addPropertyImgs = createAsyncThunk(
  "property/addPropertyImgs",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let uploadPhoto = state.property.uploadPhoto;
      await baseApi.post(`/api/multyPhoto/${id}`, uploadPhoto);
      thunkAPI.dispatch(addPropertyFiles(id));
    } catch (err) {
      console.log(`Add Property Imgs Sending Error: ${err.message}`);
    }
  }
);

// post files
export const addPropertyFiles = createAsyncThunk(
  "property/addPropertyFiles",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let uploadFile = state.property.uploadFile;
      await baseApi.post(`/api/documentUpload/${id}`, uploadFile);
      thunkAPI.dispatch(addPropertyYandex(id));
    } catch (err) {
      console.log(`Add Property Files Sending Error: ${err.message}`);
    }
  }
);

// post yandex
export const addPropertyYandex = createAsyncThunk(
  "property/addPropertyYandex",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let yandex = state.property.yandex;
      await baseApi.post(`/api/addYandexLocation/${id}`, yandex);
      thunkAPI.dispatch(addPropertyKeyword(id));
    } catch (err) {
      console.log(`Add Property Yandex Data Sending Error: ${err.message}`);
    }
  }
);

// post keyword
export const addPropertyKeyword = createAsyncThunk(
  "property/addPropertyKeyword",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let keyword = state.property.keyword;
      await baseApi.post(`/api/addKeyword/${id}`, keyword);
    } catch (err) {
      console.log(`Add Property Keyword Sending Error: ${err.message}`);
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
    setYandex: (state, action) => {
      state.yandex = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropertyStructure.pending, (state) => {
        state.structureLoading = true;
      })
      .addCase(getPropertyStructure.fulfilled, (state, action) => {
        state.structureLoading = false;
        state.structure = action.payload;
      })
      .addCase(getPropertyData.pending, (state) => {
        state.propertyLoading = true;
      })
      .addCase(getPropertyData.fulfilled, (state, action) => {
        state.propertyLoading = false;
        state.propertyData = action.payload;
      })
      .addCase(addPropertyData.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(addPropertyData.fulfilled, (state, action) => {
        state.postLoading = false;

        if (action.payload) {
          state.uploadPhoto = action.payload;
          state.uploadFile = action.payload;
          state.yandex = action.payload;
          state.keyword = action.payload;

          builder.dispatch(addPropertyImgs({ uploadPhoto: action.payload }));
          builder.dispatch(addPropertyFiles({ uploadFile: action.payload }));
          builder.dispatch(addPropertyYandex({ yandex: action.payload }));
          builder.dispatch(addPropertyKeyword({ keyword: action.payload }));
        }
      });
  },
});

export const { setUploadPhoto, setUploadFile, setYandex, setKeyword } =
  structureSlice.actions;
export default structureSlice.reducer;
