import { publicAxios } from "@/api/axios";
import { ENDPOINT } from "@/api/urls";
import { LoginGoogle, SignupGoogle } from "@/types/auth";

export const postLoginGoogle = async (loginData: LoginGoogle) => {
  try {
    const res = await publicAxios.post(ENDPOINT.USER.LOGIN_GOOGLE, loginData);
    console.log("res: ", res);
    return res;
  } catch (e) {
    console.log("e: ", e);
  }
};

export const postSignupGoogle = async (signupData: SignupGoogle) => {
  try {
    const res = await publicAxios.post(ENDPOINT.USER.SIGNUP_GOOGLE, signupData);
    console.log("res: ", res);
    return res;
  } catch (e) {
    console.log("e: ", e);
  }
};
