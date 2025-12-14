import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CompleteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.inner}>
        <View style={styles.content}>
          <Text
            style={styles.contentText}
          >{`한입만에 오신 걸\n환영합니다!`}</Text>
          <Image
            style={styles.contentImage}
            source={require("@/assets/images/signup-completion-congrats.png")}
          />
        </View>

        {/* 다음 버튼 */}
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={[styles.nextText, textStyles.title18_SB135]}>
            내 동네 파티 목록 확인하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  inner: { flex: 1 },

  content: {
    flex: 1,
    paddingTop: 120,
    alignItems: "center",
  },
  contentText: {
    color: colors.main,
    textAlign: "center",
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 48,
    marginBottom: 50,
  },
  contentImage: { width: 301, aspectRatio: 301 / 293 },

  nextBtn: {
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.main,
  },
  nextText: {
    color: colors.white,
    textAlign: "center",
  },
});
