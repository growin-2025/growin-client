import { useAuthStore } from "@/stores/authStore";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainHeaderCarousel, { CarouselItem } from "./MainHeaderCarousel";

const PRIMARY_COLOR = colors.main;

interface MainHeaderProps {}

/**
 * 메인 화면 상단 헤더 컴포넌트
 * - 로고와 현재 위치 정보를 표시
 * - 캐러셀을 통해 여러 인사말과 캐릭터 이미지를 순환 표시
 */
const MainHeader = ({}: MainHeaderProps = {}) => {
  const router = useRouter();

  // 유저 정보 조회
  const { user } = useAuthStore();

  // 유저 정보에서 닉네임과 위치 가져오기
  const nickname = user?.nickname || "한입만";
  const location = user?.location || "위치 없음";

  // 현재 캐러셀 페이지 인덱스 상태 관리
  const [currentPage, setCurrentPage] = useState(0);

  // 메인 헤더에 표시될 캐러셀 데이터 (닉네임을 동적으로 설정)
  const carouselData: CarouselItem[] = [
    {
      greeting1: nickname,
      greeting2: "님,\n오늘은 무엇을 나눌까요 ?",
      character: require("@/assets/images/main/character.png"),
      backgroundColor: PRIMARY_COLOR,
      greeting1Style: textStyles.title20_B135,
      greeting2Style: textStyles.title18_B135,
    },
    {
      greeting1: "저희 앱 어때요?\n의견이 필요해요",
      greeting2: "\n츄비 눌러서 의견 주기   >",
      character: require("@/assets/images/main/character-opinion.png"),
      backgroundColor: PRIMARY_COLOR,
      greeting1Style: textStyles.title24_SB135,
      greeting2Style: [textStyles.title18_SB135, { marginTop: -20 }],
    },
  ];

  // 현재 페이지에 해당하는 데이터 가져오기
  const currentData = carouselData[currentPage];

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: currentData.backgroundColor },
      ]}
      edges={["top"]}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: currentData.backgroundColor },
        ]}
      >
        {/* 로고와 현재 위치 정보 (고정 영역) */}
        <View style={styles.mainLogoWrapper}>
          <View style={styles.logoAndLocation}>
            <Image
              source={require("@/assets/images/main/mainlogo.png")}
              style={styles.mainLogo}
              resizeMode="contain"
            />
            <Text style={[styles.location, textStyles.title20_B135]}>
              {location}
            </Text>
          </View>
          <Pressable onPress={() => router.push("/search/search")}>
            <Image
              source={require("@/assets/images/search/search-32.png")}
              style={styles.searchIcon}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        {/* 인사말과 캐릭터 이미지 캐러셀 (스와이프 가능) */}
        <MainHeaderCarousel
          data={carouselData}
          onPageChange={setCurrentPage}
          height={178}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  // SafeAreaView 스타일: 상단 안전 영역을 고려한 컨테이너
  safeArea: {
    overflow: "hidden",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingTop: 12,
  },
  // 메인 컨테이너 스타일
  container: {
    width: "100%",
    height: 178,
    paddingHorizontal: 20,
  },
  // 로고와 위치 정보를 담는 래퍼
  mainLogoWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  // 로고와 위치를 묶는 컨테이너
  logoAndLocation: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  // 메인 로고 이미지 크기
  mainLogo: {
    width: 23.99945,
    height: 27.99909,
  },
  // 위치 텍스트 색상
  location: {
    color: colors.white,
  },
  // 검색 아이콘 스타일
  searchIcon: {
    width: 32,
    height: 32,
    paddingLeft: 1.23,
  },
});
