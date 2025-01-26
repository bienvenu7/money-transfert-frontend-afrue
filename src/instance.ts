import axios from "axios";

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://money-transfert-api.onrender.com/v1/"
      : "http://localhost:9090/v1/",
  // withCredentials: true,
});
