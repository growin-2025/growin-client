import Toggle from "@/components/Toggle";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationSettingScreen() {
  const router = useRouter();
  const [receiveChatMessages, setChatMessages] = useState(false);
  const [receiveApprovalResult, setApprovalResult] = useState(false);
  const [receivePartyStatusChange, setPartyStatusChange] = useState(true);
  const [receiveAutoClose, setAutoClose] = useState(true);

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
          알림 설정
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.contentWrapper}>
        {/* 채팅 메시지 */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, textStyles.body16_M135]}>
            채팅 메시지
          </Text>
          <Toggle value={receiveChatMessages} onValueChange={setChatMessages} />
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 승인/거절 결과 */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, textStyles.body16_M135]}>
            승인/ 거절 결과
          </Text>
          <Toggle
            value={receiveApprovalResult}
            onValueChange={setApprovalResult}
          />
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 파티 상태 변경 */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, textStyles.body16_M135]}>
            파티 상태 변경
          </Text>
          <Toggle
            value={receivePartyStatusChange}
            onValueChange={setPartyStatusChange}
          />
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 자동 마감/종료 */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, textStyles.body16_M135]}>
            자동 마감/ 종료
          </Text>
          <Toggle value={receiveAutoClose} onValueChange={setAutoClose} />
        </View>
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
    alignItems: "center",
  },
  settingText: {
    color: colors.black,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[3],
    marginVertical: 8,
  },
});
