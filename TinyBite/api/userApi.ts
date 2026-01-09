import { privateAxios } from "@/api/axios";
import { ENDPOINT } from "@/api/urls";
import { UserMeResponse } from "@/types/user";
import { parseProfileImage } from "@/utils/parseProfileImage";

/**
 * 현재 로그인한 사용자 정보 조회 API
 * @returns 사용자 프로필 정보
 */
export const getUserMe = async (): Promise<UserMeResponse> => {
  const res = await privateAxios.get(ENDPOINT.USER.ME);
  console.log("getUserMe API 응답:", res.data.data);
  const rawData = res.data.data;

  // 원본을 복사하면서 특정 필드만 가공해서 반환
  return {
    ...rawData,
    userProfileImage: parseProfileImage(rawData.userProfileImage),
  };
};

/**
 * 사용자 위치 업데이트 API
 * @param coords 좌표 정보
 */
export const updateLocation = async (coords: {
  latitude: string;
  longitude: string;
}): Promise<void> => {
  const res = await privateAxios.patch(ENDPOINT.USER.LOCATION, null, {
    params: {
      latitude: coords.latitude,
      longitude: coords.longitude,
    },
  });
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
  await privateAxios.delete(ENDPOINT.USER.ME);
};

/**
 * 프로필 이미지 업데이트 API
 * @param profileImage 프로필 이미지 URL (string)
 */
export const updateProfileImage = async (
  profileImage: string
): Promise<void> => {
  await privateAxios.patch(ENDPOINT.USER.PROFILE_IMAGE, {
    profileImage: profileImage,
  });
};

/**
 * 프로필 이미지 삭제 API
 */
export const deleteProfileImage = async (): Promise<void> => {
  await privateAxios.delete(ENDPOINT.USER.PROFILE_IMAGE);
};
