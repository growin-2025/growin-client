import { BASE_URL, ENDPOINT } from "@/api/urls";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

// 인증 필요 x
export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

publicAxios.interceptors.request.use(
  (config) => {
    console.log(
      "[API Request] >>",
      config.baseURL,
      config.method?.toUpperCase(),
      config.url,
      config.data,
      config.params
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
      config.data,
      config.params
    );
    return config;
  },
  (error) => Promise.reject(error)
);

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;

// 토큰 갱신 중 대기하는 요청들을 저장하는 큐
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

/**
 * 대기 중인 모든 요청을 처리
 * @param error 에러가 있으면 모든 요청을 reject
 * @param token 성공하면 새 토큰으로 모든 요청을 resolve
 */
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * 토큰 만료 처리
 */
privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 | 403 에러이고 재시도하지 않은 요청인지 확인
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            if (originalRequest.url?.includes(ENDPOINT.AUTH.REFRESH)) {
              useAuthStore.getState().logout();
              return Promise.reject(error);
            }
            return privateAxios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // 토큰 갱신 시도
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");

        if (!refreshToken) {
          useAuthStore.getState().logout();
          return Promise.reject(new Error("No refresh token"));
        }

        const res = await publicAxios.post(ENDPOINT.AUTH.REFRESH, {
          refreshToken: refreshToken,
        });
        const data = res.data.data;

        await SecureStore.setItemAsync("accessToken", data.accessToken);
        await SecureStore.setItemAsync("refreshToken", data.refreshToken);
        useAuthStore.setState({
          user: data.user,
          isAuthenticated: true,
        });

        const newAccessToken = await SecureStore.getItemAsync("accessToken");
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        if (originalRequest.url?.includes(ENDPOINT.AUTH.REFRESH)) {
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }
        return privateAxios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
