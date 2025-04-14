import axios from "axios";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://https://money-transfert-api.onrender.com/v1/"
    : "http://localhost:9090/v1/";

export const instance = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
});
