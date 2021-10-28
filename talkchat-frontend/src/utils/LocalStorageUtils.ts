import { LOCAL_STORAGE_KEY } from "../constants/LocalStorageKey"

export const getUserInfo = () => {
  const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO_KEY);
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return null;
  }
}