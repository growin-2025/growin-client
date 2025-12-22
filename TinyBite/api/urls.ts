import { API_URL } from "./configs";

export const BASE_URL = API_URL;

export const ENDPOINT = {
  SMS_AUTH: {
    SMS_SEND: "/api/v1/auth/sms/send",
  },
  AUTH: {
    SIGNUP_GOOGLE: "/api/v1/auth/google/signup",
    LOGIN_GOOGLE: "/api/v1/auth/google/login",
  },
};
