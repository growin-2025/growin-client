import { LoginRespone, UserProfile } from "@/types/auth";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (res: LoginRespone) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  login: async (res: LoginRespone) => {
    await SecureStore.setItemAsync("accessToken", res.authResponse.accessToken);
    await SecureStore.setItemAsync(
      "refreshToken",
      res.authResponse.refreshToken
    );

    set({ user: res.authResponse.user, isAuthenticated: true });
  },
  logout: async () => {
    await SecureStore.deleteItemAsync("googleIdToken");
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");

    set({ user: null, isAuthenticated: false });

    router.replace("/login/login");
  },
}));
