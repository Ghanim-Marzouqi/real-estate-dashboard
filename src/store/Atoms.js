import { atom } from "recoil";

const userState = atom({
  key: "userState",
  default: {
    id: "",
    name: "",
    email: "",
    phone: "",
    username: "",
    userType: "",
    isAuthenticated: false
  }
});

const selectedUserState = atom({
  key: "selectedUserState",
  default: {
    _id: "",
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    userType: ""
  }
});

const dataState = atom({
  key: "dataState",
  default: []
});

const selectedDataState = atom({
  key: "selectedDataState",
  default: []
});

export { userState, selectedUserState, dataState, selectedDataState }