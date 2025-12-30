import { privateAxios, publicAxios } from "@/api/axios";
import { ENDPOINT } from "@/api/urls";
import { CheckSms, LoginGoogle, SignupGoogle, UserCoords } from "@/types/auth";

export const postLoginGoogle = async (loginData: LoginGoogle) => {
  const res = await publicAxios.post(ENDPOINT.AUTH.LOGIN_GOOGLE, loginData);
  return res.data.data;
};

export const postSignupGoogle = async (signupData: SignupGoogle) => {
  const res = await publicAxios.post(ENDPOINT.AUTH.SIGNUP_GOOGLE, signupData);
  return res.data.data;
};

export const postSendSms = async ({ phone }: { phone: string }) => {
  await publicAxios.post(ENDPOINT.SMS_AUTH.SMS_SEND, { phone });
};

export const postCheckSms = async (checkSmsData: CheckSms) => {
  await publicAxios.post(ENDPOINT.SMS_AUTH.SMS_CHECK, checkSmsData);
};

export const getCheckNickname = async (nickname: string) => {
  await publicAxios.get(ENDPOINT.AUTH.NICKNAME_CHECK, {
    params: {
      nickname: nickname,
    },
  });
};

export const getLocationName = async (coordsData: UserCoords) => {
  const res = await publicAxios.get(ENDPOINT.LOCATION.FIND_LOCATION, {
    params: {
      latitude: coordsData.latitude,
      longitude: coordsData.longitude,
    },
  });
  return res.data.data;
};

export const postLogout = async () => {
  await privateAxios.post(ENDPOINT.AUTH.LOGOUT);
};
