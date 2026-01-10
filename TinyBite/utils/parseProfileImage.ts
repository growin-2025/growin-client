/**
 * 프로필 이미지 URL 파싱 유틸리티
 * JSON 문자열인 경우 파싱하여 실제 URL만 추출
 * @param profileImage 프로필 이미지 문자열 (JSON 문자열 또는 URL)
 * @returns 파싱된 프로필 이미지 URL 또는 undefined
 */
export const parseProfileImage = (
  profileImage?: string | null
): string | undefined => {
  if (!profileImage || typeof profileImage !== "string") {
    return undefined;
  }

  const trimmed = profileImage.trim();
  if (!trimmed) {
    return undefined;
  }

  // JSON 문자열인 경우 파싱 시도
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed?.profileImage && typeof parsed.profileImage === "string") {
      return parsed.profileImage.trim() || undefined;
    }
  } catch (e) {
    // JSON 파싱 실패 시 원본이 URL인 것으로 간주하여 그대로 반환
  }

  // 이미 URL인 경우 그대로 반환
  return trimmed;
};
