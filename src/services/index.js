import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_WEP_API
});

http.defaults.headers.post["Content-Type"] = "application/json";

export { login, register } from "./AuthService";
export default http;