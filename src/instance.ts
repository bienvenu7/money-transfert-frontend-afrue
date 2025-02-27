import axios from "axios";

export const baseURL = "http://localhost:9090/v1/";

export const instance = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
});
