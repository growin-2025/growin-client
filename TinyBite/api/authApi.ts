import { publicAxios } from "@/api/axios";
import { ENDPOINT } from "@/api/urls";
import { LoginGoogle, SignupGoogle } from "@/types/auth";

export const postLoginGoogle = async (loginData: LoginGoogle) => {
  const res = await publicAxios.post(ENDPOINT.AUTH.LOGIN_GOOGLE, loginData);
  return res.data;
};

export const postSignupGoogle = async (signupData: SignupGoogle) => {
  const res = await publicAxios.post(ENDPOINT.AUTH.SIGNUP_GOOGLE, signupData);
  return res.data;
};

export const postSendSms = async ({ phone }: { phone: string }) => {
  const res = await publicAxios.post(ENDPOINT.AUTH.SIGNUP_GOOGLE, phone);
  return res.data;
};
