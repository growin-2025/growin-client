/**
 * 프로필 이미지 소스 반환 유틸리티
 * @param uri 프로필 이미지 URL
 * @returns Image source 객체 (uri가 유효하면 { uri }, 아니면 기본 이미지)
 */
export const getProfileSource = (uri?: string | null) => {
  if (uri && uri.startsWith("http")) {
    return { uri };
  }
  return require("@/assets/images/mainlist/detail/default-host-profile.png");
};
