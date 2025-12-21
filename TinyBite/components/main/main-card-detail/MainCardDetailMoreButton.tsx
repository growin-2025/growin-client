import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MainCardDetailMoreButtonProps {
  marginTop: number; // SafeArea insets에 따른 marginTop
  onEdit?: () => void; // 수정 버튼 클릭 시 호출
  onDelete?: () => void; // 삭제 버튼 클릭 시 호출
}

/**
 * 메인 카드 상세 화면의 더보기 버튼 컴포넌트
 * - 더보기 버튼과 바텀 시트 메뉴를 포함
 * - 수정/삭제 옵션 제공
 */
const MainCardDetailMoreButton = ({
  marginTop,
  onEdit,
  onDelete,
}: MainCardDetailMoreButtonProps) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false); // 바텀 시트 표시 여부

  return (
    <>
      {/* 더보기 버튼 (오른쪽) - 헤더 위에 고정 */}
      <TouchableOpacity
        onPress={() => setBottomSheetVisible(true)}
        style={[styles.moreButtonContainer, { marginTop, padding: 1 }]}
      >
        <Image
          source={require("@/assets/images/mainlist/detail/more-6.png")}
          style={styles.moreIcon}
          resizeMode="contain"
        />
        <Image
          source={require("@/assets/images/mainlist/detail/more-6.png")}
          style={styles.moreIcon}
          resizeMode="contain"
        />
        <Image
          source={require("@/assets/images/mainlist/detail/more-6.png")}
          style={styles.moreIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* 바텀 시트 메뉴 */}
      {bottomSheetVisible && (
        <>
          {/* 배경 오버레이 */}
          <TouchableOpacity
            style={styles.bottomSheetOverlay}
            activeOpacity={1}
            onPress={() => setBottomSheetVisible(false)}
          />
          {/* 바텀 시트 */}
          <SafeAreaView style={styles.bottomSheet} edges={["bottom"]}>
            {/* 드래그 핸들 */}
            <View style={styles.bottomSheetHandle} />
            {/* 메뉴 옵션 */}
            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                onEdit?.();
                setBottomSheetVisible(false);
              }}
            >
              <Text
                style={[styles.bottomSheetOptionText, textStyles.title20_SB135]}
              >
                수정
              </Text>
              {/* 구분선 (80% 너비) */}
              <View style={styles.bottomSheetDivider} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                onDelete?.();
                setBottomSheetVisible(false);
              }}
            >
              <Text
                style={[
                  styles.bottomSheetOptionText,
                  styles.bottomSheetOptionTextDanger,
                  textStyles.title20_SB135,
                ]}
              >
                삭제
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </>
      )}
    </>
  );
};

export default MainCardDetailMoreButton;

const styles = StyleSheet.create({
  // 더보기 버튼 컨테이너 (오른쪽)
  moreButtonContainer: {
    position: "absolute",
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)", // 반투명 배경
    zIndex: 11, // 헤더 배경 위에 표시
  },
  moreIcon: {
    width: 6,
    height: 6,
    marginHorizontal: 2.44, // gap 4.88 / 2 = 2.44 (양쪽 마진)
  },
  // 바텀 시트 오버레이
  bottomSheetOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 100, // 최상위 레이어
  },
  // 바텀 시트
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingBottom: 30,
    zIndex: 101, // 오버레이 위에 표시
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  // 드래그 핸들
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#CCCCCC",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 24,
  },
  // 바텀 시트 옵션
  bottomSheetOption: {
    alignItems: "center",
  },
  // 구분선
  bottomSheetDivider: {
    width: "80%",
    height: 1,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: colors.gray[4],
  },
  bottomSheetOptionText: {
    color: colors.black,
  },
  bottomSheetOptionTextDanger: {
    color: colors.red[1],
  },
});
