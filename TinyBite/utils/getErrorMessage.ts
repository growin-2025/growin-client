import { ApiError } from "@/types/api.types";

export const getErrorMessage = (error: ApiError): string => {
  // 특정 에러 코드에 대한 커스텀 메시지
  const errorMessages: Record<string, string> = {
    // AuthErrorCode
    INVALID_PHONE_NUMBER: "유효하지 않은 번호입니다.",
    INVALID_AUTHCODE: "인증코드가 일치하지 않습니다.",
    EXPIRED_AUTH_CODE: "인증시간이 만료되었습니다.",
    DUPLICATED_NICKNAME: "중복된 닉네임입니다.",
    INVALID_TOKEN: "유효하지 않은 토큰입니다.",
    GOOGLE_LOGIN_ERROR: "구글 로그인 중 에러가 발생했습니다.",
    APPLE_LOGIN_ERROR: "애플 로그인 중 에러가 발생했습니다.",
    INVALID_PLATFORM: "올바른 플랫폼이 아닙니다. (Android, iOS).",
    NOT_EXISTS_EMAIL: "애플 이메일이 존재하지 않습니다.",

    // BusinessErrorCode
    TEST_ERROR_CODE: "테스트 에러코드입니다.",
    MEMBER_NOT_FOUND: "멤버를 찾을 수 없습니다.",

    // FcmErrorCode
    CANNOT_SEND_NOTIFICATION: "알림 메시지 전송에 실패했습니다.",
    FCM_TOKEN_LIMIT_EXCEEDED:
      "FCM 멀티캐스트 요청의 토큰 개수 제한을 초과했습니다.",

    // TaskErrorCode
    TASK_NOT_FOUND: "할일을 찾을 수 없습니다.",
    TASK_NOT_OWNER: "본인의 할일이 아닙니다.",
    INVALID_FIELD: "유효하지 않은 필드입니다.",

    // UserErrorCode
    USER_NOT_EXISTS: "존재하지 않는 유저입니다.",
  };

  if (errorMessages[error.code]) {
    return errorMessages[error.code];
  }

  // HTTP 상태 코드 기반 기본 메시지
  const statusMessages: Record<number, string> = {
    400: "잘못된 입력값입니다.",
    401: "인증이 필요합니다.",
    403: "접근 권한이 없습니다.",
    404: "존재하지 않는 리소스입니다.",
    500: "서버 에러가 발생했습니다.",
  };

  if (statusMessages[error.status]) {
    return statusMessages[error.status];
  }

  return error.message || "알 수 없는 오류가 발생했습니다.";
};
