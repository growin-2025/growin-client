import FloatingMenuButton from "@/components/main/FloatingMenuButton";
import FloatingMenuOverlay from "@/components/main/FloatingMenuOverlay";
import MainCard from "@/components/main/MainCard";
import MainCategory from "@/components/main/MainCategory";
import MainHeader from "@/components/main/MainHeader";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useState } from "react";

import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.container}>
          <MainHeader />
          <MainCategory />
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

          {/* 플로팅 버튼 - Modal이 닫혔을 때만 표시 */}
          {!isMenuOpen && (
            <View style={styles.floatingBtn}>
              <FloatingMenuButton onPress={() => setIsMenuOpen(true)} />
            </View>
          )}
        </View>
      </SafeAreaView>

      {/* 오버레이 Modal */}
      <FloatingMenuOverlay
        visible={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.main,
  },
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.background,
  },
  scroll: {
    marginTop: 18,
    backgroundColor: colors.background,
  },
  listWrapper: {
    marginTop: 4,
    alignItems: "center",
  },
  cardWrapper: {
    gap: 16,
    marginBottom: 16,
  },

  floatingBtn: {
    position: "absolute",
    right: 20,
    bottom: 8,
  },
});
