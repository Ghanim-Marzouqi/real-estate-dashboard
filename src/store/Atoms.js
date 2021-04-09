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
  default: {
    docs: [],
    totalDocs: 0,
    totalPages: 0,
    page: 1,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: 0,
    nextPage: 0
  }
});

const filtersState = atom({
  key: "filtersState",
  default: {
    year: "",
    region: "",
    willayat: "",
    village: "",
    zone: "",
    price: "",
    moh: false,
    external: false,
    sale: false,
    mortgage: false,
    swap: false,
    residential: false,
    industrial: false,
    commercial: false,
    residential_commercial: false,
    governmental: false,
    tourist: false,
    agricultral: false,
    others: false
  }
});

export { userState, selectedUserState, dataState, filtersState }