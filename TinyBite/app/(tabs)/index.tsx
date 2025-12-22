import FloatingMenuButton from "@/components/main/FloatingMenuButton";
import FloatingMenuOverlay from "@/components/main/FloatingMenuOverlay";
import MainCard from "@/components/main/MainCard";
import MainCategory from "@/components/main/MainCategory";
import MainHeader from "@/components/main/MainHeader";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useState } from "react";

import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <MainHeader />

      <View style={styles.categoryWrapper}>
        <MainCategory />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.listWrapper}
      >
        <View style={styles.cardWrapper}>
          <MainCard onPress={() => router.push("/main-card-detail")} />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
        </View>
      </ScrollView>

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
  scroll: {
    backgroundColor: colors.background,
  },
  listWrapper: {
    alignItems: "center",
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  cardWrapper: {
    gap: 16,
    marginBottom: 16,
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
