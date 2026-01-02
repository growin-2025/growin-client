import { postLoginGoogle } from "@/api/authApi";
import { getCurrentUser, signIn } from "@/hooks/useGoogleAuth";
import { useAuthStore } from "@/stores/authStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { ApiError } from "@/types/api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";

export default function LoginScreen() {
  const router = useRouter();

  const { login } = useAuthStore(
    useShallow((state) => ({
      login: state.login,
    }))
  );

  const loginMutation = useMutation({
    mutationFn: postLoginGoogle,
    onSuccess: (data) => {
      if (data.signup) {
        login(data);
        router.push("/(tabs)");
      } else {
        router.push("/(auth)/signup/terms");
      }
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data.code === "INVALID_TOKEN") {
        SecureStore.deleteItemAsync("googleIdToken");
        return;
      }

      if (error.response?.data) {
        const message = getErrorMessage(error.response.data);
        console.error(message);
      } else {
        // 네트워크 에러 등
        console.error("네트워크 연결을 확인해주세요.");
      }
    },
  });

  const handleGoogleLogin = async () => {
    let idToken;

    const user = await getCurrentUser();
    if (user) {
      idToken = user.idToken;
    } else {
      idToken = await signIn();
    }

    if (idToken) {
      await SecureStore.setItemAsync("googleIdToken", idToken);
      await loginMutation.mutateAsync({
        idToken: idToken,
        platformType: Platform.OS.toUpperCase() as "ANDROID" | "IOS",
      });
    }
  };

  // const handleLoginPress = (provider: string) => {
  //   console.log("소셜 로그인:", provider);

  //   // TODO: 소셜 로그인 로직 추가
  //   // 임시 로직: 기존 회원 여부 판단
  //   const isExistingUser = false; // 백엔드 응답 기준으로 변경

  //   if (isExistingUser) {
  //     router.replace("/(tabs)");
  //   } else {
  //     router.push("/signup/terms");
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Image
        style={styles.logo}
        source={require("@/assets/images/splash.png")}
      />

      <View style={styles.buttons}>
        {/* <TouchableOpacity
          style={[styles.socialButton, styles.kakao]}
          onPress={() => handleLoginPress("kakao")}
        >
          <Image source={require("@/assets/images/login/icon-kakao.png")} />
          <Text style={[styles.socialText, textStyles.title18_SB135]}>
            카카오로 시작하기
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[styles.socialButton, styles.google]}
          onPress={handleGoogleLogin}
        >
          <Image source={require("@/assets/images/login/icon-google.png")} />
          <Text style={[styles.socialText, textStyles.title18_SB135]}>
            Google로 시작하기
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.socialButton, styles.apple]}
          onPress={() => handleLoginPress("apple")}
        >
          <Image source={require("@/assets/images/login/icon-apple.png")} />
          <Text style={[styles.socialText, textStyles.title18_SB135]}>
            Apple로 시작하기
          </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 120,
    paddingHorizontal: 20,
    backgroundColor: colors.main,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 362,
    aspectRatio: 362 / 252,
  },

  buttons: { gap: 16, alignSelf: "stretch" },
  socialButton: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  kakao: { backgroundColor: "#FEE500" },
  google: { backgroundColor: colors.white },
  apple: { backgroundColor: colors.white },
  socialText: {
    color: colors.black,
  },
});
