/**
 * 닉네임 검증 로직
 * - 한글, 영문, 숫자만 허용 (특수문자, 공백, 이모지 제거)
 * - 최소 2자, 최대 12자 제한
 */
export const validateAndFilterNickname = (text: string): string => {
  const filtered = text.replace(/[^ㄱ-힣a-zA-Z0-9]/g, "");

  return filtered.substring(0, 12);
};
