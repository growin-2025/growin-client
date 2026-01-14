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
