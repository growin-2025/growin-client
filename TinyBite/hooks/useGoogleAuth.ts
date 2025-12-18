import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { ResponseType } from "expo-auth-session/build/AuthRequest.types";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!,
      redirectUri: makeRedirectUri({
        scheme: "tinybite",
      }),
      responseType: ResponseType.IdToken,
    },
    discovery
  );

  const getIdToken = async (): Promise<string> => {
    const result = await promptAsync();

    if (result.type !== "success") {
      throw new Error("Google login cancelled");
    }

    return result.authentication?.idToken!;
  };

  return { getIdToken, request, response };
}
