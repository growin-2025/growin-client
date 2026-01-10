/**
 * getUserMe API 응답 타입
 */
export type UserMeResponse = {
  userId: number;
  name: string;
  location: string;
  userProfileImage?: string;
};
