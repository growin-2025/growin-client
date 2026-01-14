import { sendFcmTest } from "@/api/notificationApi";
import FloatingMenuButton from "@/components/main/FloatingMenuButton";
import FloatingMenuOverlay from "@/components/main/FloatingMenuOverlay";
import MainCategory from "@/components/main/MainCategory";
import MainHeader from "@/components/main/MainHeader";
import PartyList from "@/components/main/PartyList";
import { useAuthStore } from "@/stores/authStore";
import { colors } from "@/styles/colors";
import { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.userId) {
      console.log("FCM 테스트 알림 전송 시도:", user.userId);
      sendFcmTest(user.userId)
        .then(() => {
          console.log("FCM 테스트 알림 전송 성공");
        })
        .catch((error: any) => {
          console.error("FCM 테스트 알림 전송 실패:", {
            status: error?.response?.status,
            statusText: error?.response?.statusText,
            url: error?.config?.url,
            params: error?.config?.params,
            errorData: error?.response?.data,
            message: error?.message,
          });
        });
    } else {
      console.log("사용자 정보 없음 - FCM 테스트 알림 전송 안 함");
    }
  }, [user?.userId]);

  return (
    <View style={styles.container}>
      <MainHeader />

      <View style={styles.categoryWrapper}>
        <MainCategory />
      </View>

      <PartyList />

      {/* 플로팅 버튼 - 항상 표시 */}
      <View style={styles.floatingButtonContainer}>
        <FloatingMenuButton onPress={() => setIsMenuOpen(true)} />
      </View>

      {/* 플로팅 메뉴 오버레이 */}
      <FloatingMenuOverlay
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  categoryWrapper: {
    marginTop: 15, //카테고리 마진 5 뺀 15
    marginBottom: 10, //UI 가림 떄문에 리스트에 마진 5+ 카테고리 마진 5 합친 값 뺀 10
  },
  floatingButtonContainer: {
    position: "absolute",
    right: 20,
    bottom: 8,
  },
});
