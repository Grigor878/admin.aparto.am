// hin tarberak
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import baseApi from "../../apis/baseApi";
// import { getAxiosConfig } from "../../apis/config";

// const initialState = {
//   loading: false,
//   data: null,
//   postLoading: false,
//   // sendedImgs: false,
//   // sendedFiles: false,
//   uploadPhoto: {},
//   uploadFile: {},
//   yandex: [],
//   keyword: [],
// };

// // get global data
// export const getPropertyData = createAsyncThunk("property", async () => {
//   try {
//     const { data } = await baseApi.get("/api/getAllStructure");
//     return data;
//   } catch (err) {
//     console.log(`Get Property Data Error: ${err.message}`);
//   }
// });

// // post added data
// export const addPropertyData = createAsyncThunk(
//   "property/addPropertyData",
//   async ({ addProperty }) => {
//     try {
//       const response = await baseApi.post(
//         "/api/addHome",
//         addProperty,
//         getAxiosConfig()
//       );
//     } catch (err) {
//       console.log(`Add Property Data Sending Error: ${err.message}`);
//     }
//   }
// );

// // post imgs
// export const addPropertyImgs = createAsyncThunk(
//   "property/addPropertyImgs",
//   async ({ uploadPhoto }) => {
//     try {
//       await baseApi.post("/api/multyPhoto", uploadPhoto);
//     } catch (err) {
//       console.log(`Add Property Imgs Sending Error: ${err.message}`);
//     }
//   }
// );

// // post files
// export const addPropertyFiles = createAsyncThunk(
//   "property/addPropertyFiles",
//   async ({ uploadFile }) => {
//     try {
//       await baseApi.post("/api/documentUpload", uploadFile);
//     } catch (err) {
//       console.log(`Add Property Files Sending Error: ${err.message}`);
//     }
//   }
// );

// // post yandex
// export const addPropertyYandex = createAsyncThunk(
//   "property/addPropertyYandex",
//   async ({ yandexMapClick }) => {
//     try {
//       await baseApi.post("/api/addYandexLocation", yandexMapClick);
//     } catch (err) {
//       console.log(`Add Property Yandex Data Sending Error: ${err.message}`);
//     }
//   }
// );

// // post keyword
// export const addPropertyKeyword = createAsyncThunk(
//   "property/addPropertyKeyword",
//   async ({ keyword }) => {
//     try {
//       await baseApi.post("/api/addKeyword", keyword);
//     } catch (err) {
//       console.log(`Add Property Keyword Sending Error: ${err.message}`);
//     }
//   }
// );

// const structureSlice = createSlice({
//   name: "property",
//   initialState,
//   reducers: {
//     setUploadPhoto: (state, action) => {
//       state.uploadPhoto = action.payload;
//     },
//     setUploadFile: (state, action) => {
//       state.uploadFile = action.payload;
//     },
//     setYandex: (state, action) => {
//       state.yandex = action.payload;
//     },
//     setKeyword: (state, action) => {
//       state.keyword = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getPropertyData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getPropertyData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })

//       .addCase(addPropertyData.pending, (state) => {
//         state.postLoading = true;
//       })
//       .addCase(addPropertyData.fulfilled, (state) => {
//         state.postLoading = false;
//       });

//     // .addCase(addPropertyImgs.pending, (state) => {
//     //   state.sendedImgs = true;
//     // })
//     // .addCase(addPropertyImgs.fulfilled, (state) => {
//     //   state.sendedImgs = false;
//     // })

//     // .addCase(addPropertyFiles.pending, (state) => {
//     //   state.sendedFiles = true;
//     // })
//     // .addCase(addPropertyFiles.fulfilled, (state) => {
//     //   state.sendedFiles = false;
//     // });

//     // .addCase(addPropertyKeywords.pending, (state) => {
//     //   state.sendedFiles = true;
//     // })
//     // .addCase(addPropertyKeywords.fulfilled, (state) => {
//     //   state.sendedFiles = false;
//     // });
//   },
// });

// export const { setUploadPhoto, setUploadFile, setYandex, setKeyword } =
//   structureSlice.actions;
// // export const getYandexMapClick = (state) => state.property?.yandex;
// export default structureSlice.reducer;

// tarberak 1
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import baseApi from "../../apis/baseApi";
// import { getAxiosConfig } from "../../apis/config";

// const initialState = {
//   loading: false,
//   data: null,
//   postLoading: false,
//   uploadPhoto: {},
//   uploadFile: {},
//   yandex: [],
//   keyword: [],
// };

// // get global data
// export const getPropertyData = createAsyncThunk("property", async () => {
//   try {
//     const { data } = await baseApi.get("/api/getAllStructure");
//     return data;
//   } catch (err) {
//     console.log(`Get Property Data Error: ${err.message}`);
//   }
// });

// // post added data
// export const addPropertyData = createAsyncThunk(
//   "property/addPropertyData",
//   async ({ addProperty }, { dispatch, rejectedWithValue }) => {
//     try {
//       const response = await baseApi.post(
//         "/api/addHome",
//         addProperty,
//         getAxiosConfig()
//       );

//       const responseData = response.data;

//       dispatch(addPropertyImgs({ ...responseData }));
//       dispatch(addPropertyFiles({ ...responseData }));
//       dispatch(addPropertyYandex({ ...responseData }));
//       dispatch(addPropertyKeyword({ ...responseData }));

//       return responseData;
//     } catch (err) {
//       console.log(`Add Property Data Sending Error: ${err.message}`);
//       throw rejectedWithValue(err.message);
//     }
//   }
// );

// // post imgs
// export const addPropertyImgs = createAsyncThunk(
//   "property/addPropertyImgs",
//   async ({ uploadPhoto }) => {
//     try {
//       await baseApi.post("/api/multyPhoto", uploadPhoto);
//     } catch (err) {
//       console.log(`Add Property Imgs Sending Error: ${err.message}`);
//     }
//   }
// );

// // post files
// export const addPropertyFiles = createAsyncThunk(
//   "property/addPropertyFiles",
//   async ({ uploadFile }) => {
//     try {
//       await baseApi.post("/api/documentUpload", uploadFile);
//     } catch (err) {
//       console.log(`Add Property Files Sending Error: ${err.message}`);
//     }
//   }
// );

// // post yandex
// export const addPropertyYandex = createAsyncThunk(
//   "property/addPropertyYandex",
//   async ({ yandexMapClick }) => {
//     try {
//       await baseApi.post("/api/addYandexLocation", yandexMapClick);
//     } catch (err) {
//       console.log(`Add Property Yandex Data Sending Error: ${err.message}`);
//     }
//   }
// );

// // post keyword
// export const addPropertyKeyword = createAsyncThunk(
//   "property/addPropertyKeyword",
//   async ({ keyword }) => {
//     try {
//       await baseApi.post("/api/addKeyword", keyword);
//     } catch (err) {
//       console.log(`Add Property Keyword Sending Error: ${err.message}`);
//     }
//   }
// );

// const structureSlice = createSlice({
//   name: "property",
//   initialState,
//   reducers: {
//     setUploadPhoto: (state, action) => {
//       state.uploadPhoto = action.payload;
//     },
//     setUploadFile: (state, action) => {
//       state.uploadFile = action.payload;
//     },
//     setYandex: (state, action) => {
//       state.yandex = action.payload;
//     },
//     setKeyword: (state, action) => {
//       state.keyword = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getPropertyData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getPropertyData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(getPropertyData.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export const { setUploadPhoto, setUploadFile, setYandex, setKeyword } =
//   structureSlice.actions;

// export default structureSlice.reducer;

// tarberak 2
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
import { getAxiosConfig } from "../../apis/config";

const initialState = {
  loading: false,
  data: null,
  postLoading: false,
  uploadPhoto: {},
  uploadFile: {},
  yandex: [],
  keyword: [],
};

// get global data
export const getPropertyData = createAsyncThunk("property", async () => {
  try {
    const { data } = await baseApi.get("/api/getAllStructure");
    return data;
  } catch (err) {
    console.log(`Get Property Data Error: ${err.message}`);
  }
});

// post added data
export const addPropertyData = createAsyncThunk(
  "property/addPropertyData",
  async ({ addProperty }, { rejectWithValue }) => {
    try {
      const response = await baseApi.post(
        "/api/addHome",
        addProperty,
        getAxiosConfig()
      );
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
  async ({ uploadPhoto }) => {
    try {
      await baseApi.post("/api/multyPhoto", uploadPhoto);
    } catch (err) {
      console.log(`Add Property Imgs Sending Error: ${err.message}`);
    }
  }
);

// post files
export const addPropertyFiles = createAsyncThunk(
  "property/addPropertyFiles",
  async ({ uploadFile }) => {
    try {
      await baseApi.post("/api/documentUpload", uploadFile);
    } catch (err) {
      console.log(`Add Property Files Sending Error: ${err.message}`);
    }
  }
);

// post yandex
export const addPropertyYandex = createAsyncThunk(
  "property/addPropertyYandex",
  async ({ yandexMapClick }) => {
    try {
      await baseApi.post("/api/addYandexLocation", yandexMapClick);
    } catch (err) {
      console.log(`Add Property Yandex Data Sending Error: ${err.message}`);
    }
  }
);

// post keyword
export const addPropertyKeyword = createAsyncThunk(
  "property/addPropertyKeyword",
  async ({ keyword }) => {
    try {
      await baseApi.post("/api/addKeyword", keyword);
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
      .addCase(getPropertyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPropertyData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
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
          builder.dispatch(
            addPropertyYandex({ yandexMapClick: action.payload })
          );
          builder.dispatch(addPropertyKeyword({ keyword: action.payload }));
        }
      });
  },
});

export const { setUploadPhoto, setUploadFile, setYandex, setKeyword } =
  structureSlice.actions;
export default structureSlice.reducer;
