import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const MEGAPHONE_ICON = require("@/assets/images/chat/notice.png");
const COIN_ICON = require("@/assets/images/chat/coin.png");
const BRAND_ICON = require("@/assets/images/chat/brand-logo-32.png");

type PartyStatus = "모집 중" | "진행 중" | "파티 종료";

interface ChatPartyProgressCardProps {
  status: PartyStatus;
  currentMembers: number;
  maxMembers: number;
}

const ChatPartyProgressCard = ({
  status,
  currentMembers,
  maxMembers,
}: ChatPartyProgressCardProps) => {
  const progress = useSharedValue(0);

  // 상태에 따른 진행도 설정
  const getProgressValue = (status: PartyStatus) => {
    switch (status) {
      case "모집 중":
        return 33.33;
      case "진행 중":
        return 66.66;
      case "파티 종료":
        return 100;
      default:
        return 0;
    }
  };

  // 상태에 따른 아이콘 및 텍스트 설정
  const getStatusConfig = (status: PartyStatus) => {
    switch (status) {
      case "모집 중":
        return {
          icon: MEGAPHONE_ICON,
          title: "파티 참여 완료!",
          description: "인원을 모집 중입니다.",
          activeStep: 2,
        };
      case "진행 중":
        return {
          icon: COIN_ICON,
          title: "인원 모집 완료!",
          description: "파티장이 정산을 준비하고 있어요.",
          activeStep: 3,
        };
      case "파티 종료":
        return {
          icon: BRAND_ICON,
          title: "수령 완료!",
          description: "맛있게 드세요.",
          activeStep: 4,
        };
      default:
        return {
          icon: MEGAPHONE_ICON,
          title: "",
          description: "",
          activeStep: 1,
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const isMaxReached = currentMembers === maxMembers;

  useEffect(() => {
    progress.value = withTiming(getProgressValue(status), {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [status]);

  // 첫 번째 바 애니메이션
  const firstBarAnimatedStyle = useAnimatedStyle(() => {
    const width = Math.min(progress.value / 33.33, 1) * 100;
    return {
      width: `${width}%`,
    };
  });

  // 두 번째 바 애니메이션
  const secondBarAnimatedStyle = useAnimatedStyle(() => {
    const width =
      Math.max(0, Math.min((progress.value - 33.33) / 33.33, 1)) * 100;
    return {
      width: `${width}%`,
    };
  });

  // 세 번째 바 애니메이션 (3->4)
  const thirdBarAnimatedStyle = useAnimatedStyle(() => {
    const width =
      Math.max(0, Math.min((progress.value - 66.66) / 33.33, 1)) * 100;
    return {
      width: `${width}%`,
    };
  });

  return (
    <View style={styles.container}>
      {/* 헤더 영역 */}
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Image source={statusConfig.icon} style={styles.icon} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={[styles.title, textStyles.body16_B150]}>
            {statusConfig.title}
          </Text>
          <Text style={[styles.description, textStyles.body13_SB150]}>
            {statusConfig.description}
          </Text>
        </View>
      </View>

      {/* 프로그레스 바 영역 */}
      <View style={styles.progressWrapper}>
        <View style={styles.progressContainer}>
          {/* Step 1 */}
          <View
            style={[
              styles.stepCircle,
              statusConfig.activeStep >= 1 && styles.stepCircleActive,
            ]}
          >
            <Text
              style={[
                textStyles.body12_M135,
                styles.stepNumber,
                statusConfig.activeStep >= 1 && styles.stepNumberActive,
              ]}
            >
              1
            </Text>
          </View>

          {/* Bar 1 (1->2) */}
          <View style={styles.barContainer}>
            <View style={styles.barBackground} />
            <Animated.View style={[styles.barFill, firstBarAnimatedStyle]} />
          </View>

          {/* Step 2 */}
          <View
            style={[
              styles.stepCircle,
              statusConfig.activeStep >= 2 && styles.stepCircleActive,
            ]}
          >
            <Text
              style={[
                textStyles.body12_M135,
                styles.stepNumber,
                statusConfig.activeStep >= 2 && styles.stepNumberActive,
              ]}
            >
              2
            </Text>
          </View>

          {/* Bar 2 (2->3) */}
          <View style={styles.barContainer}>
            <View style={styles.barBackground} />
            <Animated.View style={[styles.barFill, secondBarAnimatedStyle]} />
          </View>

          {/* Step 3 */}
          <View
            style={[
              styles.stepCircle,
              statusConfig.activeStep >= 3 && styles.stepCircleActive,
            ]}
          >
            <Text
              style={[
                textStyles.body12_M135,
                styles.stepNumber,
                statusConfig.activeStep >= 3 && styles.stepNumberActive,
              ]}
            >
              3
            </Text>
          </View>

          {/* Bar 3 (3->4) */}
          <View style={styles.barContainer}>
            <View style={styles.barBackground} />
            <Animated.View style={[styles.barFill, thirdBarAnimatedStyle]} />
          </View>

          {/* Step 4 */}
          <View
            style={[
              styles.stepCircle,
              statusConfig.activeStep >= 4 && styles.stepCircleActive,
            ]}
          >
            <Text
              style={[
                textStyles.body12_M135,
                styles.stepNumber,
                statusConfig.activeStep >= 4 && styles.stepNumberActive,
              ]}
            >
              4
            </Text>
          </View>
        </View>
      </View>

      {/* 하단 인원 정보 */}
      <View style={[styles.footer, isMaxReached && styles.footerActiveBg]}>
        <Text style={[styles.footerInactive, textStyles.body13_SB150]}>
          현재 인원
        </Text>
        <Text
          style={[
            styles.footerInactive,
            textStyles.body16_B150,
            isMaxReached && styles.footerActiveCount,
          ]}
        >
          {currentMembers}/{maxMembers}명 {isMaxReached && "(MAX)"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    padding: 12,
    borderRadius: 16,
    gap: 10,
    backgroundColor: colors.white,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: colors.sub,
  },
  icon: {
    width: 28,
    height: 28,
  },
  textWrapper: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: colors.black,
  },
  description: {
    color: colors.gray[1],
  },

  progressWrapper: {
    paddingVertical: 8,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  stepCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.gray[4],
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  stepCircleActive: {
    borderColor: colors.main,
  },
  stepNumber: {
    color: colors.gray[4],
    position: "absolute",
    margin: "auto",
  },
  stepNumberActive: {
    color: colors.main,
  },

  barContainer: {
    flex: 1,
    height: 4,
    position: "relative",
  },
  barBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: colors.gray[4],
  },
  barFill: {
    position: "absolute",
    height: "100%",
    backgroundColor: colors.main,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.gray[4],
  },
  footerInactive: {
    color: colors.gray[1],
  },
  footerActiveBg: {
    backgroundColor: colors.sub,
  },
  footerActiveCount: {
    color: colors.main,
  },
});

export default ChatPartyProgressCard;
