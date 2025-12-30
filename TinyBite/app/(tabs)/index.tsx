import FloatingMenuButton from "@/components/main/FloatingMenuButton";
import FloatingMenuOverlay from "@/components/main/FloatingMenuOverlay";
import MainCategory from "@/components/main/MainCategory";
import MainHeader from "@/components/main/MainHeader";
import PartyList from "@/components/main/PartyList";
import { usePartyList } from "@/hooks/usePartyList";
import { useUserCoords } from "@/hooks/useUserCoords";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 위치 정보 가져오기
  const { coords, refresh: fetchCoords } = useUserCoords();

  // 파티 리스트 조회
  const { data, isLoading, partyType, setPartyType } = usePartyList({
    latitude: coords?.latitude?.toString() || "",
    longitude: coords?.longitude?.toString() || "",
  });

  // 컴포넌트 마운트 시 위치 정보 가져오기
  useEffect(() => {
    if (!coords) {
      fetchCoords();
    }
  }, []);

  return (
    <View style={styles.container}>
      <MainHeader />

      <View style={styles.categoryWrapper}>
        <MainCategory
          selectedCategory={partyType}
          onCategoryChange={setPartyType}
        />
      </View>

      <PartyList
        data={data}
        isLoading={isLoading}
        onCardPress={() => router.push("/main-card-detail")}
      />

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
