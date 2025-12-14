import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("@/assets/images/chevron/chevron-left-44.png")}
            style={styles.backIcon}
          />
        </Pressable>
        <Text style={[styles.headerTitle, textStyles.title20_B135]}>설정</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.contentWrapper}>
        {/* 알림 설정 */}
        <Pressable
          style={styles.settingItem}
          onPress={() => router.push("../(mypage)/notification")}
        >
          <View style={styles.settingItemLeft}>
            <Image
              source={require("@/assets/images/mypage/notification.png")}
              style={styles.settingIcon}
            />
            <Text style={[styles.settingText, textStyles.body16_SB135]}>
              알림 설정
            </Text>
          </View>
          <Image
            source={require("@/assets/images/chevron/chevron-right-24.png")}
            style={styles.chevronIcon}
          />
        </Pressable>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 내 동네 설정 */}
        <Pressable
          style={styles.settingItem}
          onPress={() => router.push("../(mypage)/neighborhood")}
        >
          <View style={styles.settingItemLeft}>
            <Image
              source={require("@/assets/images/location-tracking-maincolor.png")}
              style={styles.settingIcon}
            />
            <Text style={[styles.settingText, textStyles.body16_SB135]}>
              내 동네 설정
            </Text>
          </View>
          <View style={styles.settingItemRight}>
            <Text style={[styles.neighborhoodText, textStyles.body16_SB135]}>
              역삼동
            </Text>
            <Image
              source={require("@/assets/images/chevron/chevron-right-24.png")}
              style={styles.chevronIcon}
            />
          </View>
        </Pressable>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 로그아웃 */}
        <Pressable style={styles.settingItem}>
          <View style={styles.settingItemLeft}>
            <Image
              source={require("@/assets/images/mypage/logout.png")}
              style={styles.settingIcon}
            />
            <Text style={[styles.settingText, textStyles.body16_SB135]}>
              로그아웃
            </Text>
          </View>
          <Image
            source={require("@/assets/images/chevron/chevron-right-24.png")}
            style={styles.chevronIcon}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    height: 36,
  },
  backIcon: {
    width: 36,
    height: 36,
    padding: 1,
  },
  headerTitle: {
    color: colors.black,
  },
  placeholder: {
    width: 36,
    height: 36,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingIcon: {
    width: 28,
    height: 28,
    padding: 1.16667,
  },
  settingText: {
    color: colors.black,
  },
  settingItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  neighborhoodText: {
    color: colors.main,
  },
  chevronIcon: {
    width: 24,
    height: 24,
    padding: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[4],
    marginVertical: 8,
  },
});
