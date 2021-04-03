import http from '.';
import {
  GET_ALL_USERS,
  ADD_NEW_USER,
  UPDATE_EXISTING_USER,
  DELETE_EXISTING_USER
} from "../config/ApiEndpoints";

const getAllUsers = async () => {
  try {
    const response = await http.get(GET_ALL_USERS);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const addNewUser = async (payload) => {
  try {
    const response = await http.post(ADD_NEW_USER, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const updateExistingUser = async (payload) => {
  try {
    const response = await http.put(`${UPDATE_EXISTING_USER}/${payload._id}`, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const deleteExistingUser = async (payload) => {
  try {
    const response = await http.delete(`${DELETE_EXISTING_USER}/${payload._id}`, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}


export { getAllUsers, addNewUser, updateExistingUser, deleteExistingUser }