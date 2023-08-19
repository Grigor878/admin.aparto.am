import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";

const initialState = {
  loading: false,
  data: [],
  streetData: null,
  resultData: null,
  siderData: null,
  siderLoading: false,
  page: "home",
  // resultFilteredData: null,
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
  async ({ language, community }) => {
    try {
      const { data } = await baseApi.post(
        `api/getCommunitySearch/${language}`,
        {
          ids: community,
        }
      );
      return data;
    } catch (err) {
      console.log(`Get Community Data Error: ${err.message}`);
    }
  }
);

// home page search
export const postSearchData = createAsyncThunk(
  "home/postSearchData",
  async ({ searchData, language }) => {
    try {
      const { data } = await baseApi.post(`api/getSearchData`, {
        searchData,
        language,
      });
      return data;
    } catch (err) {
      console.log(`Post Search Data Error: ${err.message}`);
    }
  }
);

// see all properties by type
export const getAllPropertiesByType = createAsyncThunk(
  "home/getAllPropertiesByType",
  async (type) => {
    try {
      const { data } = await baseApi.post(`api/getSeeMoreHomes`, type);
      return data;
    } catch (err) {
      console.log(`Get All Properties Data Error: ${err.message}`);
    }
  }
);

// get search result data
export const getResultPageData = createAsyncThunk(
  "view/search",
  async ({ language, searchData }) => {
    try {
      const { data } = await baseApi.post(`api/getResultPageData/${language}`, {
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
  reducers: {
    // clear resultData
    clearResultData: (state) => {
      state.resultData = null;
    },
    // change to result
    changeToResult: (state) => {
      state.page = "result";
    },
    // change to home
    changeToHome: (state) => {
      state.page = "home";
    },
  },
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
    ////// get all datas with one resultData and load
    builder.addCase(postSearchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postSearchData.fulfilled, (state, action) => {
      state.resultData = action.payload;
      // state.page = "home";
      state.loading = false;
    });
    //
    builder.addCase(getAllPropertiesByType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPropertiesByType.fulfilled, (state, action) => {
      state.resultData = action.payload;
      // state.page = "home";
      state.loading = false;
    });
    //
    builder.addCase(getResultPageData.pending, (state) => {
      state.siderLoading = true;
    });
    builder.addCase(getResultPageData.fulfilled, (state, action) => {
      // state.siderData = action.payload;
      console.log(action.payload);
      state.siderLoading = false;
    });
  },
});

export const { clearResultData, changeToResult, changeToHome } =
  viewSlice.actions;

export default viewSlice.reducer;
