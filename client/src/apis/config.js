// import { useSelector } from "react-redux";
export const API_BASE_URL = "http://127.0.0.1:8000";
export const APP_BASE_URL = "http://localhost:3000";

export const GetAxiosConfig = () => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  // const { token } = useSelector((state) => state.auth)

  return {
    headers: { Authorization: "Bearer " + token },
  };
};

export const getAxiosConfig = () => {

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

  return {
    headers: { Authorization: "Bearer " + token },
  };
};
