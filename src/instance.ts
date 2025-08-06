import axios from "axios";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://82.146.49.197/v1/"
    : "http://localhost:7001/v1/";

export const instance = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
});
