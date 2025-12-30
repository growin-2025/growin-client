import { BASE_URL } from "@/api/urls";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

// 인증 필요 x
export const publicAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

publicAxios.interceptors.request.use(
  (config) => {
    console.log(
      "[API Request] >>",
      config.baseURL,
      config.method?.toUpperCase(),
      config.url,
      config.data
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 인증 필요 o
export const privateAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

privateAxios.interceptors.request.use(
  async (config) => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.log(
      "[API Request] >>",
      config.baseURL,
      config.method?.toUpperCase(),
      config.headers,
      config.url,
      config.data
    );
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
