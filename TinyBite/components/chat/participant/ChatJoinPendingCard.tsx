import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const SPINNER = require("@/assets/images/chat/spinner.png");

export const ChatJoinPendingCard = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      {/* 스피너 */}
      <View style={styles.spinnerWrapper}>
        <Animated.Image
          style={[styles.spinner, animatedStyle]}
          source={SPINNER}
        />
      </View>

      {/* 텍스트 영역 */}
      <View style={{ gap: 4, alignItems: "center" }}>
        <Text style={[styles.title, textStyles.body16_B150]}>
          파티장의 수락을 기다리고 있어요!
        </Text>
        <Text style={[styles.description, textStyles.body13_SB150]}>
          수락이 완료되면 파티에 참여할 수 있습니다.{"\n"}
          잠시만 기다려주세요.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    borderRadius: 16,
    padding: 12,
    gap: 8,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },

  spinnerWrapper: {
    borderRadius: 22,
    padding: 8,
    backgroundColor: colors.sub,
  },
  spinner: {
    width: 28,
    height: 28,
  },

  title: {
    color: colors.black,
  },
  description: {
    color: colors.gray[1],
    textAlign: "center",
  },
});
