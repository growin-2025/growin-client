import { signOut } from "@/hooks/useGoogleAuth";
import { LoginResponse, UserProfile } from "@/types/auth.types";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  login: (res: LoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: UserProfile) => {
    set({ user });
  },
  login: async (res: LoginResponse) => {
    await SecureStore.setItemAsync("accessToken", res.authResponse.accessToken);
    await SecureStore.setItemAsync(
      "refreshToken",
      res.authResponse.refreshToken
    );

    set({ user: res.authResponse.user, isAuthenticated: true });
  },
  logout: async () => {
    await signOut();
    await SecureStore.deleteItemAsync("googleIdToken");
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");

    set({ user: null, isAuthenticated: false });

    router.replace("/login/login");
  },
}));
