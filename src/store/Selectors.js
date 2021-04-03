import { selector } from "recoil";
import { userState, selectedUserState } from "./Atoms";

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

export { getUserState, getSelectedUserState }