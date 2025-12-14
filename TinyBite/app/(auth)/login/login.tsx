import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();

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
          onPress={() => handleLoginPress("google")}
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
