import { colors } from "@/styles/colors";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

// 화면 너비를 가져와서 캐러셀 너비로 사용
const { width: SCREEN_WIDTH } = Dimensions.get("window");

/**
 * 캐러셀 아이템 인터페이스
 * 각 캐러셀 페이지에 표시될 데이터 구조를 정의합니다.
 */
export interface CarouselItem {
  greeting1: string; // 첫 번째 인사말 (예: "가짜대학생")
  greeting2: string; // 두 번째 인사말 (예: "님,\n오늘은 무엇을 나눌까요 ?")
  character: ImageSourcePropType; // 캐릭터 이미지
  backgroundColor?: string; // 배경색
  greeting1Style?: any; // 첫 번째 인사말 스타일
  greeting2Style?: any; // 두 번째 인사말 스타일
}

/**
 * MainHeaderCarousel 컴포넌트의 Props 인터페이스
 */
interface MainHeaderCarouselProps {
  data: CarouselItem[]; // 캐러셀에 표시할 데이터 배열
  onPageChange?: (index: number) => void; // 페이지 변경 시 호출되는 콜백 함수
  height?: number; // 캐러셀 높이 (기본값: 178)
}

/**
 * 메인 헤더 캐러셀 컴포넌트
 * 스와이프 가능한 캐러셀을 통해 인사말과 캐릭터 이미지를 표시합니다.
 */
const MainHeaderCarousel = ({
  data,
  onPageChange,
  height = 178,
}: MainHeaderCarouselProps) => {
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        width={SCREEN_WIDTH}
        height={height}
        data={data}
        scrollAnimationDuration={600}
        autoPlay={true}
        autoPlayInterval={5000}
        loop={true}
        onSnapToItem={(index: number) => onPageChange?.(index)}
        renderItem={({
          item,
          index,
        }: {
          item: CarouselItem;
          index: number;
        }) => (
          <View
            key={index}
            style={[
              styles.carouselPage,
              // 캐러셀 페이지 자체에 배경색 적용
              { backgroundColor: item.backgroundColor || colors.white },
            ]}
          >
            {/* 인사말 텍스트 영역 */}
            <View style={styles.textBlock}>
              {/* 두 번째 캐러셀(index 1)은 marginTop을 위해 분리, 
              첫 번째는 중첩 유지 -닉네임과 님부터의 텍스트스타일이 다르기 때문에 분리함 */}
              {index === 1 ? (
                <>
                  <Text style={[styles.greetingLine1, item.greeting1Style]}>
                    {item.greeting1}
                  </Text>
                  <Text style={[styles.greetingLine2, item.greeting2Style]}>
                    {item.greeting2}
                  </Text>
                </>
              ) : (
                <Text style={[styles.greetingLine1, item.greeting1Style]}>
                  {item.greeting1}
                  <Text style={[styles.greetingLine2, item.greeting2Style]}>
                    {item.greeting2}
                  </Text>
                </Text>
              )}
            </View>
            {/* 캐릭터 이미지 영역 (오른쪽 상단에 절대 위치) */}
            <View style={styles.characterWrapper}>
              <Image
                source={item.character}
                style={styles.character}
                resizeMode="contain"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default MainHeaderCarousel;

const styles = StyleSheet.create({
  // 캐러셀 컨테이너: 부모의 패딩을 상쇄하기 위해 음수 마진 사용
  carouselContainer: {
    flex: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: "hidden",
    marginHorizontal: -20,
  },
  // 각 캐러셀 페이지: 텍스트와 이미지를 가로로 배치
  carouselPage: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    position: "relative",
  },
  // 텍스트 블록: 인사말이 표시되는 영역
  textBlock: {
    flex: 1,
    marginTop: 10,
  },
  // 첫 번째 인사말 기본 스타일 (흰색)
  greetingLine1: {
    color: colors.white,
  },
  // 두 번째 인사말 기본 스타일 (흰색)
  greetingLine2: {
    color: colors.white,
  },
  // 캐릭터 이미지 래퍼: 오른쪽 상단에 절대 위치로 배치
  characterWrapper: {
    position: "absolute",
    right: 25,
    top: 3,
  },
  // 캐릭터 이미지 크기
  character: {
    width: 156,
    height: 150,
  },
});
