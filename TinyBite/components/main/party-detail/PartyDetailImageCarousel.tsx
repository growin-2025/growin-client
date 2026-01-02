import { textStyles } from "@/styles/typography/textStyles";
import { PartyCategory } from "@/types/party";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageViewing from "react-native-image-viewing";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// 캐러셀 높이 상수 (디자인 변경 시 한 곳만 수정하면 됨)
const CAROUSEL_HEIGHT = 300;
// 이미지 확대 기준점 Y 좌표 (상단에서부터의 거리)
const ZOOM_CENTER_Y = 150;

interface PartyDetailImageCarouselProps {
  images?: string[]; // 이미지 URL 배열
  category?: PartyCategory; // 카테고리
  scrollY: SharedValue<number>; // 스크롤 위치 (react-native-reanimated용)
  screenWidth: number; // 화면 너비
}

// 카테고리별 기본 이미지 가져오기
const getDefaultImageByCategory = (category?: PartyCategory) => {
  switch (category) {
    case "DELIVERY":
      return require("@/assets/images/mainlist/detail/default-delivery.png");
    case "GROCERY":
      return require("@/assets/images/mainlist/detail/default-grocery.png");
    case "HOUSEHOLD":
      return require("@/assets/images/mainlist/detail/default-essential.png");
    default:
      return require("@/assets/images/mainlist/detail/default-delivery.png");
  }
};

/**
 * 파티 상세 화면의 이미지 캐러셀 컴포넌트
 * - 이미지 캐러셀과 확대 애니메이션 기능 제공
 * - 스크롤을 위로 당길 때(bounce) 이미지가 확대되는 효과
 * - 페이지네이션 표시
 */
const PartyDetailImageCarousel = ({
  images,
  category,
  scrollY,
  screenWidth,
}: PartyDetailImageCarouselProps) => {
  const insets = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 인덱스
  const [imageViewerVisible, setImageViewerVisible] = useState(false); // 이미지 뷰어 표시 여부
  const [imageViewerIndex, setImageViewerIndex] = useState(0); // 이미지 뷰어에서 보여줄 이미지 인덱스

  // 이미지 배열 (기본 이미지 포함)
  const imageSources = useMemo(() => {
    if (images && images.length > 0) {
      return images;
    }
    // 기본 이미지를 URI로 변환
    const defaultImage = getDefaultImageByCategory(category);
    const resolved = Image.resolveAssetSource(defaultImage);
    return resolved.uri ? [resolved.uri] : [];
  }, [images, category]);

  /**
   * 이미지 확대 애니메이션 스타일
   * 스크롤을 위로 당길 때(bounce) 이미지가 확대되는 효과
   * 상단에서 ZOOM_CENTER_Y 위치를 기준으로 확대
   */
  const animatedImageStyle = useAnimatedStyle(() => {
    // 스크롤을 위로 당길 때(bounce) 이미지 확대
    // scrollY.value < 0일 때만 확대 (음수 = 위로 당김)
    const scale = scrollY.value < 0 ? 1 - scrollY.value / CAROUSEL_HEIGHT : 1;
    const finalScale = Math.max(scale, 1); // 최소값 1 (축소 방지)

    // 이미지 상단에서 ZOOM_CENTER_Y 위치를 기준으로 확대
    // 확대 시 기준점이 고정되도록 translateY 계산
    const translateY = ZOOM_CENTER_Y * (1 - finalScale); // 확대 시 기준점 고정을 위한 이동량

    return {
      transform: [{ translateY }, { scale: finalScale }],
    };
  });

  // ImageViewing용 이미지 데이터 변환
  const viewerImages = useMemo(
    () => imageSources.map((uri) => ({ uri })),
    [imageSources]
  );

  return (
    <View style={styles.imageWrapper}>
      {/* 확대 애니메이션이 적용되는 이미지 컨테이너 */}
      <Animated.View style={[styles.swiperContainer, animatedImageStyle]}>
        {/* 이미지 캐러셀 */}
        <Carousel
          width={screenWidth}
          height={CAROUSEL_HEIGHT}
          data={imageSources}
          scrollAnimationDuration={600}
          enabled={imageSources.length > 1} // 이미지가 2개 이상일 때만 슬라이드 활성화
          onSnapToItem={(index) => setCurrentPage(index)} // 페이지 변경 시 인덱스 업데이트
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={styles.slide}
              activeOpacity={0.9}
              onPress={() => {
                setImageViewerIndex(index);
                setImageViewerVisible(true);
              }}
            >
              <Image
                style={styles.heroImage}
                source={{ uri: item }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
        {/* 하단 그라데이션 딤드 효과 */}
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0)"]}
          locations={[0, 0.36]} // 0%에서 36%까지 그라데이션
          style={styles.dimmedOverlay}
        />
      </Animated.View>
      {/* 페이지네이션 텍스트 (오른쪽 아래) - 이미지가 2개 이상일 때만 표시 */}
      {/* Animated.View 밖에 배치하여 확대되지 않도록 */}
      {imageSources.length > 1 && (
        <View style={styles.paginationContainer}>
          <Text style={[styles.paginationText, textStyles.body13_SB135]}>
            {currentPage + 1} / {imageSources.length}
          </Text>
        </View>
      )}
      {/* 이미지 뷰어 (전체 화면) */}
      <ImageViewing
        images={viewerImages}
        imageIndex={imageViewerIndex}
        visible={imageViewerVisible}
        onRequestClose={() => setImageViewerVisible(false)}
        swipeToCloseEnabled={true}
        doubleTapToZoomEnabled={true}
        HeaderComponent={() => (
          <View
            style={{
              paddingTop: insets.top + 2,
              paddingRight: 20,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => setImageViewerVisible(false)}
              style={styles.closeButton}
            >
              <Text style={{ color: "white", fontSize: 24 }}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default PartyDetailImageCarousel;

const styles = StyleSheet.create({
  // 이미지 영역 스타일
  imageWrapper: {
    width: "100%",
    height: CAROUSEL_HEIGHT,
  },
  // 확대 애니메이션이 적용되는 컨테이너
  swiperContainer: {
    width: "100%",
    height: CAROUSEL_HEIGHT,
  },
  // 캐러셀 슬라이드 스타일
  slide: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  // 이미지 스타일
  heroImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  // 하단 그라데이션 딤드 오버레이
  dimmedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: CAROUSEL_HEIGHT,
    pointerEvents: "none", // 터치 이벤트 차단 (이미지 터치 가능하도록)
  },
  // 페이지네이션 컨테이너 (오른쪽 아래)
  paginationContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "rgba(34, 34, 34, 0.5)",
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationText: {
    color: "#FFFFFF",
  },
  closeButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});
