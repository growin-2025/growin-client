import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure();

export const signIn = async () => {
  console.log("2");
  try {
    console.log("3");
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    console.log("4");
    const response = await GoogleSignin.signIn();
    const idToken = await GoogleSignin.getTokens();
    console.log("5");
    if (isSuccessResponse(response)) {
      // use signInResponse.data
      console.log("6");
      console.log("userInfo: ", response);
      console.log("idToken: ", idToken);
      console.log("7");
      return response.data.idToken;
    } else {
      // sign in was cancelled by user
    }
  } catch (error) {
    console.log("error 1");
    if (isErrorWithCode(error)) {
      console.log("error 2");
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          console.log("error 3");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android only, play services not available or outdated
          console.log("error 4");
          break;
        default:
          // some other error happened
          console.log("error 5");
      }
      console.error(error);
      console.log("error code: ", error.code);
    } else {
      // an error that's not related to google sign in occurred
      console.log("error 6");
    }
  }
};

export const signOut = async () => {
  console.log("signOut 시도");
  try {
    await GoogleSignin.signOut();
    console.log("signOut 완료");
    // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
    console.log("signOut 에러");
  }
};

export const getCurrentUser = async () => {
  const currentUser = GoogleSignin.getCurrentUser();
  console.log(currentUser);
};
