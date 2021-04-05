import { selector } from "recoil";
import { userState, selectedUserState, dataState, selectedDataState } from "./Atoms";

const getUserState = selector({
  key: "getUserState",
  get: ({ get }) => {
    const user = get(userState);
    return user;
  }
});

const getSelectedUserState = selector({
  key: "getSelectedUserState",
  get: ({ get }) => {
    const user = get(selectedUserState);
    return user;
  }
});

const getDataState = selector({
  key: "getDataState",
  get: ({ get }) => {
    const data = get(dataState);
    return data;
  }
});

const getSelectedDataState = selector({
  key: "getSelectedDataState",
  get: ({ get }) => {
    const data = get(selectedDataState);
    return data;
  }
});

export { getUserState, getSelectedUserState, getDataState, getSelectedDataState }