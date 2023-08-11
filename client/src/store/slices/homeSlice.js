import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";

const initialState = {
  language: "am",
  exchange: null,
  sale: null,
  rent: null,
  admin: null,
  propertyType: null,
  searchData: null,

  searchResult: null,
  allPropertiesByType: null,
  loading: false,
};

// get top homes
export const getTopHomes = createAsyncThunk("home", async () => {
  try {
    const [saleData, rentData] = await Promise.all([
      baseApi.get("/api/getSaleHomes"),
      baseApi.get("/api/getRentHomes"),
    ]);

    return {
      sale: saleData.data,
      rent: rentData.data,
    };
  } catch (err) {
    console.log(`Get Top Sale/Rent Homes Error: ${err.message}`);
    throw err;
  }
});

// get exchange data
export const getExchange = createAsyncThunk("home/exchange", async () => {
  try {
    const { data } = await baseApi.get("/api/getExchange");
    return data;
  } catch (err) {
    console.log(`Get Exchange Data Error: ${err.message}`);
  }
});

// get admin data
export const getAdminData = createAsyncThunk("home/adminData", async () => {
  try {
    const { data } = await baseApi.get("/api/getGeneralAdmin");
    return data;
  } catch (err) {
    console.log(`Get Admin Data Error: ${err.message}`);
  }
});

// get search data
export const getSearchData = createAsyncThunk(
  "home/getSearchData",
  async (language) => {
    try {
      const { data } = await baseApi.get(`/api/getSearchAttributes/${language}`);
      return data;
    } catch (err) {
      console.log(`Get Search Data Error: ${err.message}`);
    }
  }
);

// post search data
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

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    // set global language
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    // clear search result data
    clearSearchResult: (state) => {
      state.searchResult = null;
    },
    // clear properties by title data
    clearPropertiesByType: (state) => {
      state.allPropertiesByType = null;
    },
    // add global type for property
    addPropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    //
  },
  extraReducers: (builder) => {
    builder.addCase(getExchange.fulfilled, (state, action) => {
      state.exchange = action.payload;
    });
    builder.addCase(getTopHomes.fulfilled, (state, action) => {
      state.sale = action.payload.sale;
      state.rent = action.payload.rent;
    });
    builder.addCase(getAdminData.fulfilled, (state, action) => {
      state.admin = action.payload;
    });
    builder.addCase(getSearchData.fulfilled, (state, action) => {
      state.searchData = action.payload;
    });
    //
    builder.addCase(postSearchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postSearchData.fulfilled, (state, action) => {
      state.searchResult = action.payload;
      state.loading = false;
    });
    //
    builder.addCase(getAllPropertiesByType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPropertiesByType.fulfilled, (state, action) => {
      state.allPropertiesByType = action.payload;
      state.loading = false;
    });
  },
});

export const {
  setLanguage,
  clearSearchResult,
  addPropertyType,
  clearPropertiesByType,
} = homeSlice.actions;
export default homeSlice.reducer;
