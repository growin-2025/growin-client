import { API_URL } from "./configs";

export const BASE_URL = API_URL;

export const ENDPOINT = {
  SMS_AUTH: {
    SMS_SEND: "/api/v1/auth/sms/send",
    SMS_CHECK: "/api/v1/auth/sms/check",
  },
  AUTH: {
    REFRESH: "/api/v1/auth/refresh",
    LOGOUT: "/api/v1/auth/logout",
    SIGNUP_GOOGLE: "/api/v1/auth/google/signup",
    LOGIN_GOOGLE: "/api/v1/auth/google/login",
    NICKNAME_CHECK: "/api/v1/auth/nickname/check",
  },
  LOCATION: {
    FIND_LOCATION: "/api/v1/auth/location",
  },
  PARTY: {
    GET_PARTIES: "/api/parties",
    GET_PARTY_DETAIL: (partyId: number) => `/api/parties/${partyId}`,
  },
};
