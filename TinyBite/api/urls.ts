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
    DETAIL: (partyId: number) => `/api/parties/${partyId}`,
    CREATE_PARTIES: "/api/parties",
    EDIT_PARTIES: (partyId: number) => `/api/parties/${partyId}`,
  },
  FILE: {
    UPLOAD_FILE: "api/v1/file/upload",
  },
  USER: {
    ME: "/api/v1/user/me",
    NICKNAME_CHECK: "/api/v1/user/nickname/check",
    LOCATION: "/api/v1/user/me/location",
    ACTIVE_PARTIES: "/api/v1/user/parties/participating",
    HOSTING_PARTIES: "/api/v1/user/parties/hosting",
  },
};
