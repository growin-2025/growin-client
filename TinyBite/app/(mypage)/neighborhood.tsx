import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NeighborhoodSettingScreen() {
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
        <Text style={[styles.headerTitle, textStyles.title20_B135]}>
          내 동네 설정
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.contentWrapper}>
        {/* 주소 입력/표시 필드 */}
        <View style={styles.addressField}>
          <Image
            source={require("@/assets/images/location.png")}
            style={styles.locationIcon}
            resizeMode="contain"
          />
          <Text style={[styles.addressText, textStyles.title18_SB135]}>
            서울특별시 강남구 역삼동
          </Text>
        </View>

        {/* 현재 위치로 주소 찾기 버튼 */}
        <Pressable style={styles.findLocationButton}>
          <Image
            source={require("@/assets/images/location-tracking.png")}
            style={styles.targetIcon}
            resizeMode="contain"
          />
          <Text style={[styles.findLocationText, textStyles.body16_SB135]}>
            현재 위치로 주소 찾기
          </Text>
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
  addressField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    gap: 4,
    // 그림자 효과 (elevation = 4.dp, spotColor/ambientColor = Color(0x40000000))
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  locationIcon: {
    width: 24,
    height: 24,
    padding: 1,
  },
  addressText: {
    flex: 1,
    color: colors.black,
  },
  findLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.main,
    borderRadius: 16,
    padding: 10,
    gap: 4,
  },
  targetIcon: {
    width: 24,
    height: 24,
    padding: 1,
    tintColor: colors.white,
  },
  findLocationText: {
    color: colors.white,
  },
});
