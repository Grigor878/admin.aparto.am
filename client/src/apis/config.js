export const API_BASE_URL = "http://127.0.0.1:8000";
export const APP_BASE_URL = "http://localhost:3000";

export const getAxiosConfig = () => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

  return {
    headers: { Authorization: "Bearer " + token },
  };
};

// export const GetAxiosConfig = () => {
//   import { useSelector } from "react-redux";
//   const { token } = useSelector((state) => state.auth);
//   const token = localStorage.getItem("token")
//     ? localStorage.getItem("token")
//     : "";

//   return {
//     headers: { Authorization: "Bearer " + token },
//   };
// };
