import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";

GoogleSignin.configure({
  webClientId: Constants.expoConfig?.extra?.googleWebClientId,
  iosClientId: Constants.expoConfig?.extra?.googleIosClientId,
});

export const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();

    if (isSuccessResponse(response)) {
      // response.data에서 직접 idToken 추출
      return response.data.idToken ?? null;
    } else {
      // 사용자가 로그인을 취소한 경우
      return null;
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.log("Sign in already in progress");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.error("Play services not available");
          break;
        default:
          console.error("Sign in error:", error);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentUser = async () => {
  const currentUser = GoogleSignin.getCurrentUser();
  return currentUser;
};
