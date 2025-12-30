import { postLogout } from "@/api/authApi";
import ConfirmModal from "@/components/ConfirmModal";
import { useAuthStore } from "@/stores/authStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { ApiError } from "@/types/api";
import { getErrorMessage } from "@/utils/getErrorMessage ";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";

export default function SettingScreen() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { logout } = useAuthStore(
    useShallow((state) => ({
      logout: state.logout,
    }))
  );

  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      logout();
      router.replace("/login/login");
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
        <Pressable
          style={styles.settingItem}
          onPress={() => setShowLogoutModal(true)}
        >
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

      {/* 로그아웃 확인 모달 */}
      <ConfirmModal
        visible={showLogoutModal}
        title="로그아웃"
        message="로그아웃 하시겠습니까?"
        cancelText="아니요"
        confirmText="예"
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          // TODO: 로그아웃 로직 구현
          logoutMutation.mutateAsync();
        }}
      />
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
    backgroundColor: colors.gray[3],
    marginVertical: 8,
  },
});
