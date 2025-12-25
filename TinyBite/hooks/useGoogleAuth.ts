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
      // use signInResponse.data
      const { idToken } = await GoogleSignin.getTokens();
      return idToken;
    } else {
      // sign in was cancelled by user
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android only, play services not available or outdated
          break;
        default:
        // some other error happened
      }
      console.error(error);
    } else {
      // an error that's not related to google sign in occurred
    }
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
