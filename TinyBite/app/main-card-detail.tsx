import MainCardDetailHost from "@/components/main/main-card-detail/MainCardDetailHost";
import MainCardDetailHostNote from "@/components/main/main-card-detail/MainCardDetailHostNote";
import MainCardDetailImageCarousel from "@/components/main/main-card-detail/MainCardDetailImageCarousel";
import MainCardDetailInfo from "@/components/main/main-card-detail/MainCardDetailInfo";
import MainCardDetailMoreButton from "@/components/main/main-card-detail/MainCardDetailMoreButton";
import MainCardDetailPill from "@/components/main/main-card-detail/MainCardDetailPill";
import MainCardDetailProductLink from "@/components/main/main-card-detail/MainCardDetailProductLink";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

/**
 * 메인 카드 상세 화면
 * - 이미지 캐러셀과 스크롤 가능한 콘텐츠를 동시에 지원
 * - 스크롤 시 헤더 배경이 나타나고 이미지가 확대되는 효과
 */
export default function MainCardDetailScreen() {
  const router = useRouter();
  const { width: SCREEN_WIDTH } = useWindowDimensions(); // 창 크기 변경 시 자동 업데이트
  const insets = useSafeAreaInsets(); // SafeArea insets - 이미지를 스크롤뷰에 넣게 되어 부득이하게 추가 후 백버튼 높이 조절
  const [headerBackgroundOpacity, setHeaderBackgroundOpacity] = useState(0); // 헤더 배경 투명도 (0: 투명, 1: 불투명)
  const scrollY = useSharedValue(0); // 스크롤 위치 (react-native-reanimated용)

  // 이미지 슬라이더용 이미지 배열
  const images = [
    require("@/assets/images/mainlist/food1.jpg"),
    require("@/assets/images/mainlist/detail/default-delivery.png"),
    require("@/assets/images/mainlist/detail/default-essential.png"),
    require("@/assets/images/mainlist/detail/default-grocery.png"),
    require("@/assets/images/mainlist/detail/link-photo.png"),
  ];

  return (
    <>
      {/* 상태바 스타일: 헤더가 나타나면 dark, 아니면 light */}
      <StatusBar style={headerBackgroundOpacity > 0 ? "dark" : "light"} />
      <View style={styles.container}>
        {/* 스크롤에 따라 변하는 헤더 배경 - SafeArea까지 포함 */}
        <View
          style={[
            styles.headerBackground,
            {
              opacity: headerBackgroundOpacity,
              height: 45 + insets.top, // 헤더 높이 + SafeArea 높이
            },
          ]}
        />
        {/* 뒤로가기 버튼 - 헤더 위에 고정 */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backButton, { marginTop: insets.top + 2 }]}
        >
          <Image
            source={require("@/assets/images/chevron/chevron-left-36.png")}
            style={styles.backButtonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* 더보기 버튼 (오른쪽) - 헤더 위에 고정 */}
        <MainCardDetailMoreButton
          marginTop={insets.top + 2}
          onEdit={() => {
            // 수정 기능 구현
          }}
          onDelete={() => {
            // 삭제 기능 구현
          }}
        />
        {/* 스크롤 가능한 콘텐츠 영역 */}
        <Animated.ScrollView
          style={styles.contentContainer}
          bounces={true} // iOS bounce 효과 활성화 (이미지 확대를 위해 필요)
          onScroll={useAnimatedScrollHandler({
            onScroll: (event) => {
              // 스크롤 위치를 shared value에 저장 (애니메이션용)
              scrollY.value = event.contentOffset.y;
              // 헤더 배경 투명도 계산 (threshold 175px 이상 스크롤 시 헤더가 갑자기 나타남)
              const threshold = 175;
              const opacity = event.contentOffset.y >= threshold ? 1 : 0;
              // JS 스레드에서 상태 업데이트 (runOnJS 필요)
              runOnJS(setHeaderBackgroundOpacity)(opacity);
            },
          })}
          scrollEventThrottle={16} // 60fps를 위한 스크롤 이벤트 제한
        >
          {/* 이미지 캐러셀 */}
          <MainCardDetailImageCarousel
            images={images}
            scrollY={scrollY}
            screenWidth={SCREEN_WIDTH}
          />
          {/* 카드 콘텐츠 영역 */}
          <View style={styles.content}>
            <Text style={[styles.title, textStyles.title20_B135]}>
              후문 엽떡 나누실 분 ㅃㄹ
            </Text>
            {/* 배달/시간 정보 Pill */}
            <View style={styles.pillsRow}>
              <MainCardDetailPill type="delivery" />
              <MainCardDetailPill type="time" label="10분전" />
            </View>
            {/* 호스트 정보 */}
            <MainCardDetailHost
              avatar={require("@/assets/images/mainlist/detail/default-host-profile.png")}
              name="엽떡조아"
              location="서울시 강남구 역삼동"
            />
            {/* 구분선 */}
            <View style={styles.divider} />
            {/* 상세 정보 (위치, 인원, 금액) */}
            <MainCardDetailInfo
              items={[
                {
                  type: "location",
                  title: "역삼 래미안 앞",
                  meta: "내 위치에서 150M",
                },
                {
                  type: "group",
                  title: "2/4명 모집 중",
                  meta: "2명 남았어요!",
                },
                {
                  type: "money",
                  title: "1인당 5,000원",
                  meta: "총 20,000원",
                },
              ]}
            />
            {/* 상품 링크 */}
            <MainCardDetailProductLink
              productTitle="코스트코 베이글 & 크림치즈"
              productUrl="https://www.costco.co.kr/"
            />
            {/* 호스트 메모 */}
            <MainCardDetailHostNote body="배달 팁 나누실 분 구해요! 엽떡 매운맛 시킬 예정입니다. 쿨피스는 제가 쏠게요." />
          </View>
        </Animated.ScrollView>
        {/* 하단 고정 CTA 버튼 (SafeArea 포함) */}
        <SafeAreaView style={styles.ctaContainer} edges={["bottom"]}>
          <TouchableOpacity style={styles.cta}>
            <Text style={[styles.ctaText, textStyles.title18_SB135]}>
              5,000원으로 참여하기
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // 메인 컨테이너
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.white,
  },
  // 스크롤 시 나타나는 헤더 배경
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    zIndex: 10, // 콘텐츠 위에 표시
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Android 그림자
  },
  // 뒤로가기 버튼
  backButton: {
    position: "absolute",
    padding: 2,
    marginLeft: 20,
    width: 36,
    height: 36,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)", // 반투명 배경
    zIndex: 11, // 헤더 배경 위에 표시
  },
  backButtonImage: {
    width: 36,
    height: 36,
  },
  // 스크롤 가능한 콘텐츠 컨테이너
  contentContainer: {
    flex: 1,
    zIndex: 2,
    backgroundColor: "transparent",
  },
  // 카드 콘텐츠 영역
  content: {
    marginTop: -20, // 이미지 위로 올라가도록 음수 마진
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 16, // 상단 둥근 모서리
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  // 카드 콘텐츠 스타일
  title: {
    color: "#000000",
    marginBottom: 8,
  },
  pillsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  divider: {
    alignSelf: "stretch",
    width: "100%",
    height: 4,
    backgroundColor: colors.gray[4],
    marginBottom: 16,
  },
  // 하단 고정 CTA 버튼 영역
  ctaContainer: {
    paddingTop: 12,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4, // Android 그림자
    zIndex: 10,
  },
  cta: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.main,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    color: colors.white,
  },
});
