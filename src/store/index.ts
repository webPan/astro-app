import { create } from "zustand";
import cookies from "js-cookie";

interface UserType {
  userInfo: Record<string, any>;

  setUserInfo(userInfo: Record<string, string>): void;
}

export const useUserStore = create<UserType>((set) => ({
  userInfo: JSON.parse(cookies.get("userInfo") || "{}"),
  setUserInfo: (userInfo) => {
    set({ userInfo });
    cookies.set("userInfo", JSON.stringify(userInfo));
  },
}));
