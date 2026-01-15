import { registerFcmToken } from "@/api/notificationApi";
import * as Notifications from "expo-notifications";

/**
 * FCM 푸시 토큰 등록 훅
 * @param userId 유저 ID
 */
export const registerPushToken = async (userId: number): Promise<void> => {
  try {
    //개발 환경에서 테스트 할 때 주석 처리
    // 실제 기기에서만 작동
    //if (!Device.isDevice) {
    //  console.log("실제 기기에서만 작동합니다.");
    //  return;
    //}

    // 1. 권한 확인 및 요청
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("알림 권한 획득 실패");
      return;
    }

    // 2. FCM 네이티브 토큰 가져오기
    const tokenData = await Notifications.getDevicePushTokenAsync();
    const fcmToken = tokenData.data;

    // 3. 서버 API 호출
    await registerFcmToken(fcmToken, userId);
    console.log("FCM 토큰 등록 성공");
  } catch (error) {
    console.error("토큰 등록 중 에러 발생:", error);
  }
};
