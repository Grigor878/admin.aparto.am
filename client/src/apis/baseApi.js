// import axios from "axios";

// export default axios.create({
//   baseURL: "http://127.0.0.1:8000",
//   // baseURL: "https://aparto.am/api/public",
// });

import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BASE_API_DEV || process.env.REACT_APP_BASE_API_DEV2
    : process.env.REACT_APP_BASE_API_RELEASE;

const instance = axios.create({
  baseURL,
});

export default instance;
