import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cookies from "js-cookie";
import baseApi from "../../apis/baseApi";

const initialState = {
  language: cookies.get("i18next") || "am",
  exchange: null,
  sale: null,
  rent: null,
  admin: null,
  propertyType: null,
  searchData: null,
};

// get top homes
export const getTopHomes = createAsyncThunk("home", async (language) => {
  try {
    const [saleData, rentData] = await Promise.all([
      baseApi.get(`/api/getSaleHomes/${language}`),
      baseApi.get(`/api/getRentHomes/${language}`),
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
      const { data } = await baseApi.get(
        `/api/getSearchAttributes/${language}`
      );
      return data;
    } catch (err) {
      console.log(`Get Search Data Error: ${err.message}`);
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
  },
});

export const { setLanguage, addPropertyType } = homeSlice.actions;
export default homeSlice.reducer;
