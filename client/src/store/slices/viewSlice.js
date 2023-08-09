import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";

const initialState = {
  loading: false,
  data: null,
  streetData: null,
  resultData: null,
};

// get single property data
export const getViewData = createAsyncThunk("view", async (id) => {
  try {
    const { data } = await baseApi.get(`/api/getInterfaceProperties/${id}`);
    return data;
  } catch (err) {
    console.log(`Get Single Property Data Error: ${err.message}`);
  }
});

// get streets by community
export const getCommunityData = createAsyncThunk(
  "view/communities",
  async ({ lang, community }) => {
    try {
      const { data } = await baseApi.post(`api/getCommunitySearch/${lang}`, {
        ids: community,
      });
      return data;
    } catch (err) {
      console.log(`Get Community Data Error: ${err.message}`);
    }
  }
);

// get search result data
export const getResultPageData = createAsyncThunk(
  "view/search",
  async ({ lang, searchData }) => {
    try {
      const { data } = await baseApi.post(`api/getResultPageData/${lang}`, {
        searchData: searchData,
      });
      return data;
    } catch (err) {
      console.log(`Get Result Page Data Error: ${err.message}`);
    }
  }
);

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getViewData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getViewData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    //
    builder.addCase(getCommunityData.fulfilled, (state, action) => {
      state.streetData = action.payload;
    });
    //
    builder.addCase(getResultPageData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getResultPageData.fulfilled, (state, action) => {
      state.resultData = action.payload;
      state.loading = false;
    });
  },
});

export default viewSlice.reducer;
