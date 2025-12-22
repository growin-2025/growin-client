import { postLoginGoogle } from "@/api/authApi";
import { getCurrentUser, signIn, signOut } from "@/hooks/useGoogleAuth";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { ApiError } from "@/types/api";
import { getErrorMessage } from "@/utils/getErrorMessage ";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
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

export default function LoginScreen() {
  const router = useRouter();
  // const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: postLoginGoogle,
    onSuccess: (data) => {
      console.log("성공 처리");
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data) {
        const message = getErrorMessage(error.response.data);
        console.error(message);
      } else {
        // 네트워크 에러 등
        console.error("네트워크 연결을 확인해주세요.");
      }
    },
  });

  // const signupMutation = useMutation({
  //   mutationFn: postSignupGoogle,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["me"] });
  //     router.replace("/(tabs)");
  //   },
  // });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const idToken = response.params.id_token;

  //     const loginData: LoginGoogle = {
  //       idToken,
  //       platformType: Platform.OS.toUpperCase() as "ANDROID" | "IOS",
  //     };

  //     loginMutation.mutate(loginData);
  //   }
  // }, [loginMutation, response]);

  const handleGoogleLogin = async () => {
    try {
      const idToken = await signIn();

      if (idToken) {
        await loginMutation.mutateAsync({
          idToken: idToken,
          platformType: Platform.OS.toUpperCase() as "ANDROID" | "IOS",
        });
      }

      // queryClient.invalidateQueries({ queryKey: ["me"] });
      // router.replace("/(tabs)");
    } catch (error) {
      console.error(error);
      // if (error?.response?.status === 404) {
      //   await signupMutation.mutateAsync({
      //     provider: "google",
      //     token: error.token ?? "",
      //   });
      // }
    }
  };

  const handleLoginPress = (provider: string) => {
    console.log("소셜 로그인:", provider);

    // TODO: 소셜 로그인 로직 추가
    // 임시 로직: 기존 회원 여부 판단
    const isExistingUser = false; // 백엔드 응답 기준으로 변경

    if (isExistingUser) {
      router.replace("/(tabs)");
    } else {
      router.push("/signup/terms");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Image
        style={styles.logo}
        source={require("@/assets/images/splash.png")}
      />

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.socialButton, styles.google]}
          onPress={signOut}
        >
          <Text style={[styles.socialText, textStyles.title18_SB135]}>
            임시 google 로그아웃 버튼
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.google]}
          onPress={getCurrentUser}
        >
          <Text style={[styles.socialText, textStyles.title18_SB135]}>
            임시 google getCurrentUser 버튼
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.kakao]}
          onPress={() => handleLoginPress("kakao")}
        >
          <Image source={require("@/assets/images/login/icon-kakao.png")} />
          <Text style={[styles.socialText, textStyles.title18_SB135]}>
            카카오로 시작하기
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.google]}
          onPress={handleGoogleLogin}
        >
          <Image source={require("@/assets/images/login/icon-google.png")} />
          <Text style={[styles.socialText, textStyles.title18_SB135]}>
            Google로 시작하기
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.apple]}
          onPress={() => handleLoginPress("apple")}
        >
          <Image source={require("@/assets/images/login/icon-apple.png")} />
          <Text style={[styles.socialText, textStyles.title18_SB135]}>
            Apple로 시작하기
          </Text>
        </TouchableOpacity>
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
