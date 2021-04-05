import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_WEP_API
});

http.defaults.headers.post["Content-Type"] = "application/json";

export { login, register, updateProfile, changePassword } from "./AuthService";
export { syncData, cancelSyncData, loadData } from "./DataService";
export { addNewUser, deleteExistingUser, updateExistingUser, getAllUsers } from "./UserService";
export default http;