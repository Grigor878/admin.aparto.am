import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";

const initialState = {
  loading: false,
  data: [],
  streetData: null,
  resultData: null,
  keywords: "",
  searchedCommunities: [],
  searchedAddresses: [],
  siderData: null,
  siderLoading: false,
  page: "result",
  //
  paginatePage: "1",
  perPage: "15",
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
      const { data } = await baseApi.post(`api/getSearchData/${language}`, {
        searchData,
      });
      return data;
    } catch (err) {
      console.log(`Post Search Data Error: ${err.message}`);
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
    // clear siderData
    clearSidertData: (state) => {
      state.siderData = null;
    },
    // clear home search community-street response
    clearHomeSearchInfo: (state) => {
      state.searchedCommunities = [];
      state.searchedAddresses = [];
    },
    // set page vor search optimizing
    setPage: (state, action) => {
      state.page = action.payload;
    },
    // set pagiation paginate
    setPaginatePage: (state, action) => {
      state.paginatePage = action.payload;
    },
    // set pagiation perPage
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    // set pagiation perPage
    setKeywords: (state, action) => {
      state.keywords = action.payload;
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
      sessionStorage.removeItem("siderSqMin");
      sessionStorage.removeItem("siderSqMax");
      sessionStorage.removeItem("siderPriceMin");
      sessionStorage.removeItem("siderBuildType");
      sessionStorage.removeItem("siderNewBuild");
      sessionStorage.removeItem("siderPropCondition");
      sessionStorage.removeItem("siderFloorMin");
      sessionStorage.removeItem("siderFloorMax");
      // sessionStorage.removeItem("siderDesc");
      sessionStorage.removeItem("siderId");
      state.resultData = action.payload.data;
      state.searchedAddresses = action.payload.addresses;
      state.searchedCommunities = action.payload.community;
      state.keywords = action.payload.keywords;

      state.loading = false;
    });
    builder.addCase(getResultPageData.pending, (state) => {
      state.siderLoading = true;
    });
    builder.addCase(getResultPageData.fulfilled, (state, action) => {
      state.siderData = action.payload;
      state.siderLoading = false;
    });
  },
});

export const {
  clearResultData,
  clearSidertData,
  clearHomeSearchInfo,
  setPage,
  setPaginatePage,
  setPerPage,
  setKeywords,
} = viewSlice.actions;

export default viewSlice.reducer;
