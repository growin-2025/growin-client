import { publicAxios } from "@/api/axios";
import { ENDPOINT } from "@/api/urls";
import { LoginGoogle, SignupGoogle } from "@/types/auth";

export const postLoginGoogle = async (loginData: LoginGoogle) => {
  const res = await publicAxios.post(ENDPOINT.USER.LOGIN_GOOGLE, loginData);
  return res.data;
};

export const postSignupGoogle = async (signupData: SignupGoogle) => {
  const res = await publicAxios.post(ENDPOINT.USER.SIGNUP_GOOGLE, signupData);
  return res.data;
};
