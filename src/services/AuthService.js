import http from '.';
import {
  LOGIN_URL,
  REGISTERATION_URL,
  UPDATE_PROFILE_URL,
  CHANGE_PASSWORD_URL
} from "../config/ApiEndpoints";

const login = async (payload) => {
  try {
    const response = await http.post(LOGIN_URL, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const register = async (payload) => {
  try {
    const response = await http.post(REGISTERATION_URL, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const updateProfile = async (payload) => {
  try {
    const response = await http.put(`${UPDATE_PROFILE_URL}/${payload._id}`, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const changePassword = async (payload) => {
  try {
    const response = await http.put(`${CHANGE_PASSWORD_URL}/${payload._id}`, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { login, register, updateProfile, changePassword }