import { colors } from "@/styles/colors";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

/**
 * 커스텀 토글 스위치 컴포넌트
 * @param value - 토글의 현재 상태 (true: on, false: off)
 * @param onValueChange - 토글 상태 변경 시 호출되는 콜백 함수
 */
const Toggle = ({ value, onValueChange }: ToggleProps) => {
  // thumb의 X축 이동 거리 (on일 때 26, off일 때 0)
  const translateX = useSharedValue(value ? 26 : 0);

  // value prop이 변경될 때 애니메이션 동기화
  useEffect(() => {
    translateX.value = withTiming(value ? 26 : 0, { duration: 200 });
  }, [value, translateX]);

  // thumb의 애니메이션 스타일
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // 토글 클릭 핸들러
  const handlePress = () => {
    onValueChange(!value);
  };

  return (
    <Pressable onPress={handlePress} style={styles.toggleContainer}>
      {/* 토글 트랙 (배경) */}
      <View
        style={[
          styles.toggleTrack,
          { backgroundColor: value ? colors.main : colors.gray[2] },
        ]}
      >
        {/* 토글 thumb (움직이는 원형 버튼) */}
        <Animated.View style={[styles.toggleThumb, animatedStyle]} />
      </View>
    </Pressable>
  );
};

export default Toggle;

const styles = StyleSheet.create({
  // 토글 컨테이너
  toggleContainer: {},
  // 토글 트랙 (배경)
  toggleTrack: {
    width: 56,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  // 토글 thumb (움직이는 원형 버튼)
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.white,
    padding: 1,
    // 그림자 효과
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
});
