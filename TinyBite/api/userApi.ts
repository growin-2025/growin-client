import { privateAxios } from "@/api/axios";
import { ENDPOINT } from "@/api/urls";
import { UserMeResponse } from "@/types/user";

/**
 * 현재 로그인한 사용자 정보 조회 API
 * @returns 사용자 프로필 정보
 */
export const getUserMe = async (): Promise<UserMeResponse> => {
  const res = await privateAxios.get(ENDPOINT.USER.ME);
  console.log("getUserMe API 응답:", res.data.data);
  return res.data.data;
};

/**
 * 사용자 위치 업데이트 API
 * @param coords 좌표 정보
 */
export const updateLocation = async (coords: {
  latitude: string;
  longitude: string;
}): Promise<void> => {
  console.log("updateLocation API 호출:", {
    url: ENDPOINT.USER.LOCATION,
    params: {
      latitude: coords.latitude,
      longitude: coords.longitude,
    },
  });
  const res = await privateAxios.patch(ENDPOINT.USER.LOCATION, null, {
    params: {
      latitude: coords.latitude,
      longitude: coords.longitude,
    },
  });
  console.log("updateLocation API 응답:", res.data);
};

/**
 * 닉네임 수정 API
 * @param nickname 새로운 닉네임
 */
export const updateNickname = async (nickname: string): Promise<any> => {
  const requestData = { nickname: nickname };
  const res = await privateAxios.patch(ENDPOINT.USER.ME, requestData);
  return res.data;
};

/**
 * 닉네임 중복 체크 API
 * @param nickname 체크할 닉네임
 */
export const checkNickname = async (nickname: string): Promise<void> => {
  await privateAxios.get(ENDPOINT.USER.NICKNAME_CHECK, {
    params: {
      nickname: nickname,
    },
  });
};

/**
 * 회원 탈퇴 API
 */
export const deleteUserMe = async (): Promise<void> => {
  console.log("deleteUserMe API 호출:", {
    url: ENDPOINT.USER.ME,
    method: "DELETE",
  });
  const res = await privateAxios.delete(ENDPOINT.USER.ME);
  console.log("deleteUserMe API 응답:", res.data);
};
