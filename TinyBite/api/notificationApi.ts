import { privateAxios } from "@/api/axios";
import { ENDPOINT } from "@/api/urls";
/**
 * FCM 토큰 등록 API
 * @param token FCM 네이티브 푸시 토큰
 * @param userId 유저 ID
 */
export const registerFcmToken = async (
  token: string,
  userId: number
): Promise<void> => {
  await privateAxios.post(
    ENDPOINT.FCM.TOKEN,
    { token },
    {
      headers: {
        "User-ID": userId.toString(),
      },
    }
  );
};

/**
 * FCM 테스트 알림 전송 API
 * @param userId 유저 ID
 */
export const sendFcmTest = async (userId: number): Promise<void> => {
  await privateAxios.post(ENDPOINT.FCM.TEST, null, {
    params: {
      userId: userId,
    },
  });
};
