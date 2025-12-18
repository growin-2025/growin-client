import { BASE_URL } from "@/api/urls";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

// 인증 필요 x
export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

// 인증 필요 o
export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const accessToken = SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
