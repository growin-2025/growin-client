import { privateAxios } from "@/api/axios";
import { ENDPOINT } from "@/api/urls";
import { UserMeResponse } from "@/types/user";

/**
 * 현재 로그인한 사용자 정보 조회 API
 * @returns 사용자 프로필 정보
 */
export const getUserMe = async (): Promise<UserMeResponse> => {
  const res = await privateAxios.get(ENDPOINT.USER.ME);
  return res.data.data;
};
